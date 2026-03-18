import type {ReducerAction} from "../../state/Reducers.ts";

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
    onGameData?: (message: { stateDigest: string, data: ReducerAction }) => void;
    onError?: (message: string) => void;
    onClose?: () => void;
}

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || 'wss://your-api-id.execute-api.us-east-1.amazonaws.com/prod';

export class GameWebSocket {
    private ws: WebSocket | null = null;
    private callbacks: WebSocketCallbacks = {};
    private roomCode: string | null = null;

    connect(callbacks: WebSocketCallbacks): Promise<void> {
        this.callbacks = callbacks;

        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(WEBSOCKET_URL);

            this.ws.onopen = () => {
                this.callbacks.onOpen?.();
                resolve();
            };

            this.ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
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
                        this.callbacks.onGameData?.(data.data);
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
                this.callbacks.onClose?.();
            };
        });
    }

    hostGame(mode: string, players: string): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({action: 'create', mode, players}));
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

    sendMessage(message: { stateDigest: string, data: ReducerAction }): void {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            throw new Error('WebSocket not connected');
        }
        if (!this.roomCode) {
            throw new Error('Not in a game');
        }
        this.ws.send(JSON.stringify({action: 'message', code: this.roomCode, data: message}));
    }

    disconnect(): void {
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
