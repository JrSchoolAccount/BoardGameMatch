import { Server } from 'socket.io';
import Message from '../model/message.js';

class WebSocketServer {
    constructor(httpServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: 'http://localhost:3000', // Replace with specific origin before production
                methods: ['GET', 'POST'],
            },
        });

        this.setupSocketEvents();
    }

    setupSocketEvents() {
        this.io.on('connection', (socket) => {
            console.log(
                `Client connected: ${socket.id}, Origin: ${socket.handshake.headers.origin}`
            );
            console.log(
                `Total clients connected: ${this.io.engine.clientsCount}`
            );

            socket.on('join-room', async (roomId) => {
                socket.join(roomId);
                console.log(`Socket ${socket.id} joined room: ${roomId}`);

                const recentMessages = await Message.find({ roomId })
                    .sort({ timestamp: -1 })
                    .limit(10);
                socket.emit('recent-messages', recentMessages.reverse());
            });

            socket.on('leave-room', (roomId) => {
                socket.leave(roomId);
                console.log(`Socket ${socket.id} left room: ${roomId}`);
            });

            socket.on(
                'message-history',
                async (roomId, limit = 50, offset = 0) => {
                    const messages = await Message.find({ roomId })
                        .sort({ timestamp: -1 })
                        .skip(offset)
                        .limit(limit);
                    socket.emit('message-history', messages.reverse());
                }
            );

            socket.on('message', async (data) => {
                console.log('Message received:', data);

                const { roomId, username, message } = data;

                const newMessage = new Message({ roomId, username, message });
                await newMessage.save();

                this.io.to(roomId).emit('message', newMessage);
            });

            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);
            });
        });
    }
}

export default WebSocketServer;
