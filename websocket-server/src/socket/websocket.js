import { Server } from 'socket.io';
import { Message } from '../model/message.js';
import { Session } from '../model/session.js';

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
        this.io.use(async (socket, next) => {
            const existingSessionID = socket.handshake.auth.sessionID;
            if (existingSessionID) {
                const session = await Session.findOne({
                    sessionID: existingSessionID,
                });
                if (session) {
                    socket.sessionID = existingSessionID;
                    socket.userID = session.userID;
                    socket.username = session.username;
                    return next();
                }
            }
            const username = socket.handshake.auth.username;
            if (!username) {
                return next(new Error('Invalid username'));
            }
            const newSessionID = crypto.randomBytes(8).toString('hex');
            const userID = crypto.randomBytes(8).toString('hex');
            socket.sessionID = newSessionID;
            socket.userID = userID;
            socket.username = username;

            await new Session({
                sessionID: existingSessionID,
                userID,
                username,
                connected: true,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            }).save();

            next();
        });

        this.io.on('connection', async (socket) => {
            console.log(
                `Client connected: ${socket.id}, Origin: ${socket.handshake.headers.origin}`
            );
            console.log(
                `Total clients connected: ${this.io.engine.clientsCount}`
            );

            const users = await Session.find({});
            const messages = await Message.find({
                $or: [{ from: socket.userID }, { to: socket.userID }],
            });

            socket.emit('users', users);
            socket.emit('messages', messages);

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
