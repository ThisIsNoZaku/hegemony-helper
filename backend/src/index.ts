// src/signaling-lambda/index.ts
import type { APIGatewayProxyWebsocketEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME!;
const CONNECTIONS_TABLE = process.env.CONNECTIONS_TABLE!;
const TTL_SECONDS = 3 * 60 * 60; // 3 hours

function generateCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function getApiGatewayClient(event: APIGatewayProxyWebsocketEventV2): ApiGatewayManagementApiClient {
    const domain = event.requestContext.domainName;
    const stage = event.requestContext.stage;
    return new ApiGatewayManagementApiClient({
        endpoint: `https://${domain}/${stage}`,
    });
}

async function sendToConnection(apiClient: ApiGatewayManagementApiClient, connectionId: string, data: object): Promise<void> {
    await apiClient.send(new PostToConnectionCommand({
        ConnectionId: connectionId,
        Data: JSON.stringify(data),
    }));
}

export async function handler(event: APIGatewayProxyWebsocketEventV2): Promise<APIGatewayProxyResultV2> {
    const connectionId = event.requestContext.connectionId;
    const routeKey = event.requestContext.routeKey;

    try {
        switch (routeKey) {
            case '$connect': {
                const ttl = Math.floor(Date.now() / 1000) + TTL_SECONDS;
                await docClient.send(new PutCommand({
                    TableName: CONNECTIONS_TABLE,
                    Item: { connectionId, ttl },
                }));
                return { statusCode: 200, body: JSON.stringify({ status: 'connected' }) };
            }

            case '$disconnect': {
                // Get connection to find which room they were in
                const connectionData = await docClient.send(new GetCommand({
                    TableName: CONNECTIONS_TABLE,
                    Key: { connectionId },
                }));

                // Remove from room if they were in one
                if (connectionData.Item?.roomCode) {
                    const roomResult = await docClient.send(new GetCommand({
                        TableName: TABLE_NAME,
                        Key: { code: connectionData.Item.roomCode },
                    }));

                    if (roomResult.Item) {
                        const members = (roomResult.Item.members || []).filter((id: string) => id !== connectionId);
                        await docClient.send(new UpdateCommand({
                            TableName: TABLE_NAME,
                            Key: { code: connectionData.Item.roomCode },
                            UpdateExpression: 'SET members = :members',
                            ExpressionAttributeValues: { ':members': members },
                        }));
                    }
                }

                await docClient.send(new DeleteCommand({
                    TableName: CONNECTIONS_TABLE,
                    Key: { connectionId },
                }));
                return { statusCode: 200, body: JSON.stringify({ status: 'disconnected' }) };
            }

            case 'create': {
                const body = event.body ? JSON.parse(event.body) : {};
                const { mode, players } = body;

                // Create a new room with mode and players
                const code = generateCode();
                const ttl = Math.floor(Date.now() / 1000) + TTL_SECONDS;

                await docClient.send(new PutCommand({
                    TableName: TABLE_NAME,
                    Item: { code, members: [], ttl, mode, players },
                }));

                const apiClient = getApiGatewayClient(event);
                await sendToConnection(apiClient, connectionId, { action: 'created', code, mode, players });
                return { statusCode: 200, body: JSON.stringify({ status: 'ok', code, mode, players }) };
            }

            case 'join': {
                const body = event.body ? JSON.parse(event.body) : {};
                const code = body.code?.toUpperCase();

                if (!code || code.length !== 6) {
                    const apiClient = getApiGatewayClient(event);
                    await sendToConnection(apiClient, connectionId, { action: 'error', message: 'Valid 6-letter code required' });
                    return { statusCode: 400, body: JSON.stringify({ status: 'error', message: 'Invalid code' }) };
                }

                const result = await docClient.send(new GetCommand({
                    TableName: TABLE_NAME,
                    Key: { code },
                }));

                if (!result.Item) {
                    const apiClient = getApiGatewayClient(event);
                    await sendToConnection(apiClient, connectionId, { action: 'error', message: 'Room not found or expired' });
                    return { statusCode: 404, body: JSON.stringify({ status: 'error', message: 'Not found' }) };
                }

                const { mode, players } = result.Item;

                // Only return room info, don't add to members
                const apiClient = getApiGatewayClient(event);
                await sendToConnection(apiClient, connectionId, { action: 'joined', code, mode, players });

                return { statusCode: 200, body: JSON.stringify({ status: 'ok', code, mode, players }) };
            }

            case 'enter': {
                const body = event.body ? JSON.parse(event.body) : {};
                const code = body.code?.toUpperCase();

                if (!code || code.length !== 6) {
                    const apiClient = getApiGatewayClient(event);
                    await sendToConnection(apiClient, connectionId, { action: 'error', message: 'Valid 6-letter code required' });
                    return { statusCode: 400, body: JSON.stringify({ status: 'error', message: 'Invalid code' }) };
                }

                const result = await docClient.send(new GetCommand({
                    TableName: TABLE_NAME,
                    Key: { code },
                }));

                if (!result.Item) {
                    const apiClient = getApiGatewayClient(event);
                    await sendToConnection(apiClient, connectionId, { action: 'error', message: 'Room not found or expired' });
                    return { statusCode: 404, body: JSON.stringify({ status: 'error', message: 'Not found' }) };
                }

                const { mode, players } = result.Item;

                // Add member to the room for receiving events
                const members = result.Item.members || [];
                if (!members.includes(connectionId)) {
                    members.push(connectionId);
                    await docClient.send(new UpdateCommand({
                        TableName: TABLE_NAME,
                        Key: { code },
                        UpdateExpression: 'SET members = :members',
                        ExpressionAttributeValues: { ':members': members },
                    }));
                }

                // Track which room this connection is in
                await docClient.send(new UpdateCommand({
                    TableName: CONNECTIONS_TABLE,
                    Key: { connectionId },
                    UpdateExpression: 'SET roomCode = :code',
                    ExpressionAttributeValues: { ':code': code },
                }));

                const apiClient = getApiGatewayClient(event);
                await sendToConnection(apiClient, connectionId, { action: 'entered', code, mode, players });

                // Notify other members that someone entered
                for (const memberId of members) {
                    if (memberId !== connectionId) {
                        try {
                            await sendToConnection(apiClient, memberId, { action: 'guestJoined', guestId: connectionId });
                        } catch (e) {
                            console.log(`Failed to notify member ${memberId}`, e);
                        }
                    }
                }

                return { statusCode: 200, body: JSON.stringify({ status: 'ok', code, mode, players }) };
            }

            case 'message': {
                const body = event.body ? JSON.parse(event.body) : {};
                const { code, data } = body;

                const result = await docClient.send(new GetCommand({
                    TableName: TABLE_NAME,
                    Key: { code },
                }));

                if (!result.Item) {
                    return { statusCode: 404, body: JSON.stringify({ status: 'error', message: 'Room not found' }) };
                }

                const apiClient = getApiGatewayClient(event);

                // Add the sender's connection ID to the payload
                const dataWithSender = { ...data, sentBy: connectionId };

                // Send to all other members in the room
                for (const memberId of result.Item.members || []) {
                    if (memberId !== connectionId) {
                        try {
                            await sendToConnection(apiClient, memberId, { action: 'gameData', data: dataWithSender });
                        } catch (e) {
                            console.log(`Failed to send to member ${memberId}`, e);
                        }
                    }
                }

                return { statusCode: 200, body: JSON.stringify({ status: 'ok' }) };
            }

            default:
                return { statusCode: 400, body: JSON.stringify({ status: 'error', message: 'Unknown route' }) };
        }
    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, body: JSON.stringify({ status: 'error', message: 'Internal server error' }) };
    }
}
