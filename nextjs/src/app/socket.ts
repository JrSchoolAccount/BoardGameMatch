'use client';

import {io} from 'socket.io-client';

const socketUrl = process.env.WEBSOCKET_URL || 'http://localhost:3001';
const socket = io(socketUrl);

export {socket};