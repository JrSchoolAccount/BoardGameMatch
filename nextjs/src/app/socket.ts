'use client';

import { io } from 'socket.io-client';

const socketUrl =
    process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3001';

if (!process.env.WEBSOCKET_URL) {
    console.info(
        'WEBSOCKET_URL environment variable is not set. Defaulting to http://localhost:3001'
    );
}

const socket = io(socketUrl, { autoConnect: false });

export { socket };
