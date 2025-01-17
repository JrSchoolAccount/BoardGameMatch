import { Server } from 'socket.io';
import Message from '../models/message.js';

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

            Message.find()
                .sort({ timestamp: -1 })
                .limit(1000)
                .then((messages) => {
                    console.log('Chat history successfully loaded');
                    socket.emit('message-history', messages.reverse());
                });

            socket.on('message', async (data) => {
                console.log('Message received:', data);

                const newMessage = new Message({
                    username: data.username,
                    message: data.message,
                });
                await newMessage.save();

                this.io.emit('message', newMessage);
            });

            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);
            });
        });
    }
}

export default WebSocketServer;
