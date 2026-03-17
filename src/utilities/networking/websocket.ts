export type WebSocketMessage = {
    action: string;
    code?: string;
    data?: unknown;
    message?: string;
    guestId?: string;
    from?: string;
};

export type WebSocketCallbacks = {
    onHosted?: (code: string) => void;
    onJoined?: (code: string) => void;
    onGuestJoined?: (guestId: string) => void;
    onGameData?: (data: unknown, from?: string) => void;
    onError?: (message: string) => void;
    onClose?: () => void;
    onOpen?: () => void;
};

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || 'wss://your-api-id.execute-api.us-east-1.amazonaws.com/prod';

class GameWebSocket {
    private socket: WebSocket | null = null;
    private callbacks: WebSocketCallbacks = {};
    private currentCode: string | null = null;

    connect(callbacks: WebSocketCallbacks): Promise<void> {
        return new Promise((resolve, reject) => {
            this.callbacks = callbacks;
            this.socket = new WebSocket(WEBSOCKET_URL);

            this.socket.onopen = () => {
                callbacks.onOpen?.();
                resolve();
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                reject(error);
            };

            this.socket.onclose = () => {
                callbacks.onClose?.();
            };

            this.socket.onmessage = (event) => {
                try {
                    const message: WebSocketMessage = JSON.parse(event.data);
                    this.handleMessage(message);
                } catch (e) {
                    console.error('Failed to parse WebSocket message:', e);
                }
            };
        });
    }

    private handleMessage(message: WebSocketMessage): void {
        switch (message.action) {
            case 'hosted':
                this.currentCode = message.code!;
                this.callbacks.onHosted?.(message.code!);
                break;
            case 'joined':
                this.currentCode = message.code!;
                this.callbacks.onJoined?.(message.code!);
                break;
            case 'guestJoined':
                this.callbacks.onGuestJoined?.(message.guestId!);
                break;
            case 'gameData':
                this.callbacks.onGameData?.(message.data, message.from);
                break;
            case 'error':
                this.callbacks.onError?.(message.message!);
                break;
        }
    }

    hostGame(): void {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            throw new Error('WebSocket not connected');
        }
        this.socket.send(JSON.stringify({ action: 'host' }));
    }

    joinGame(code: string): void {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            throw new Error('WebSocket not connected');
        }
        this.socket.send(JSON.stringify({ action: 'join', code }));
    }

    sendGameData(data: unknown): void {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            throw new Error('WebSocket not connected');
        }
        if (!this.currentCode) {
            throw new Error('Not in a game');
        }
        this.socket.send(JSON.stringify({ action: 'message', code: this.currentCode, data }));
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        this.currentCode = null;
    }

    isConnected(): boolean {
        return this.socket?.readyState === WebSocket.OPEN;
    }
}

export const gameWebSocket = new GameWebSocket();
