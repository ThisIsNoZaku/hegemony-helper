export type WebSocketMessage = {
    action: string;
    code?: string;
    data?: unknown;
    message?: string;
    guestId?: string;
    from?: string;
};

interface WebSocketCallbacks {
    onOpen?: () => void;
    onHosted?: (code: string, mode: string, players: string) => void;
    onJoined?: (code: string, mode: string, players: string) => void;
    onEntered?: (code: string, mode: string, players: string) => void;
    onGuestJoined?: (guestId: string) => void;
    onGameData?: (message: {
        type: string,
        sentBy: string,
        data: any
    }) => void;
    onError?: (message: string) => void;
    onClose?: () => void;
}

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || 'wss://your-api-id.execute-api.us-east-1.amazonaws.com/prod';

const PING_INTERVAL_MS = 30 * 1000; // 30 seconds

export class GameWebSocket {
    private ws: WebSocket | null = null;
    private callbacks: WebSocketCallbacks = {};
    private roomCode: string | null = null;
    private pingIntervalId: ReturnType<typeof setInterval> | null = null;

    connect(callbacks: WebSocketCallbacks): Promise<void> {
        this.callbacks = callbacks;

        if (this.ws) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(WEBSOCKET_URL);

            this.ws.onopen = () => {
                this.startPingInterval();
                this.callbacks.onOpen?.();
                resolve();
            };

            this.ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                // Handle pong response (optional - just for logging/debugging)
                if (data.action === 'pong') {
                    console.debug('Received pong from server');
                    return;
                }

                switch (data.action) {
                    case 'created':
                        this.roomCode = data.code;
                        this.callbacks.onJoined?.(data.code, data.mode, data.players);
                        break;
                    case 'joined':
                        this.roomCode = data.code;
                        this.callbacks.onJoined?.(data.code, data.mode, data.players);
                        break;
                    case 'entered':
                        this.roomCode = data.code;
                        this.callbacks.onEntered?.(data.code, data.mode, data.players);
                        break;
                    case 'guestJoined':
                        this.callbacks.onGuestJoined?.(data.guestId);
                        break;
                    case 'gameData':
                        this.callbacks.onGameData?.(data.payload);
                        break;
                    case 'error':
                        this.callbacks.onError?.(data.message);
                        break;
                }
            };

            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                reject(error);
            };

            this.ws.onclose = () => {
                this.stopPingInterval();
                this.callbacks.onClose?.();
            };
        });
    }

    // FIXME: players should be a number
    hostGame(mode: string, players: string): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            console.debug('Sending ping to keep connection alive');
            this.ws.send(JSON.stringify({action: 'create', mode, players}));
        }
    }

    private startPingInterval(): void {
        this.stopPingInterval(); // Clear any existing interval
        this.pingIntervalId = setInterval(() => {
            this.sendPing();
        }, PING_INTERVAL_MS);
    }

    private stopPingInterval(): void {
        if (this.pingIntervalId) {
            clearInterval(this.pingIntervalId);
            this.pingIntervalId = null;
        }
    }

    private sendPing(): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            console.debug('Sending ping to keep connection alive');
            this.ws.send(JSON.stringify({action: 'ping'}));
        }
    }

    joinGame(code: string): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({action: 'join', code}));
        }
    }

    enterGame(code: string): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({action: 'enter', code}));
        }
    }

    sendMessage(message: { stateDigest: string, payload: any }): void {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            throw new Error('WebSocket not connected');
        }
        if (!this.roomCode) {
            throw new Error('Not in a game');
        }
        this.ws.send(JSON.stringify({action: 'message', code: this.roomCode, payload: message.payload}));
    }

    disconnect(): void {
        this.stopPingInterval();
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.roomCode = null;
    }

    isConnected(): boolean {
        return this.ws?.readyState === WebSocket.OPEN;
    }
}

export const gameWebSocket = new GameWebSocket();
