import { Server } from 'socket.io';
import { Message } from '../model/message.js';
import { Session } from '../model/session.js';
import crypto from 'crypto';

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
                    socket.userID = session.username;
                    socket.username = session.username;
                    return next();
                }
            }
            const username = socket.handshake.auth.username;
            if (!username) {
                return next(new Error('Invalid username'));
            }
            const newSessionID = username;
            const userID = crypto.randomBytes(8).toString('hex');
            socket.sessionID = newSessionID;
            socket.userID = username;
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
                `Client connected: ${socket.id}, Origin: ${socket.handshake.headers.origin}, username: ${socket.handshake.auth.username}`
            );
            console.log(
                `Total clients connected: ${this.io.engine.clientsCount}`
            );

            await Session.findOneAndUpdate(
                { sessionID: socket.sessionID },
                {
                    sessionID: socket.sessionID,
                    userID: socket.userID,
                    username: socket.username,
                    connected: true,
                },
                { upsert: true }
            );

            socket.emit('session', {
                sessionID: socket.sessionID,
                userID: socket.userID,
            });

            socket.join(socket.userID);

            const sessions = await Session.find({});
            const messages = await Message.find({
                $or: [{ from: socket.userID }, { to: socket.userID }],
            });

            const users = sessions.map((session) => {
                const userMessages = messages.filter(
                    (message) =>
                        message.from === session.userID ||
                        message.to === session.userID
                );
                return {
                    userID: session.userID,
                    username: session.username,
                    connected: session.connected,
                    messages: userMessages,
                };
            });

            socket.emit('users', users);

            socket.broadcast.emit('user connected', {
                userID: socket.userID,
                username: socket.username,
                connected: true,
                messages: [],
            });

            socket.on('private message', async ({ content, to }) => {
                const message = {
                    content,
                    from: socket.userID,
                    to,
                };
                await new Message(message).save();
                socket
                    .to(to)
                    .to(socket.userID)
                    .emit('private message', message);
            });

            socket.on('message', async (data) => {
                console.log('Message received:', data);

                const { roomId, username, message } = data;

                const newMessage = new Message({ roomId, username, message });
                await newMessage.save();

                this.io.to(roomId).emit('message', newMessage);
            });

            socket.on('disconnect', async () => {
                socket.broadcast.emit('user disconnected', socket.userID);

                await Session.findOneAndUpdate(
                    { sessionID: socket.sessionID },
                    { connected: false }
                );
            });
        });
    }
}

export default WebSocketServer;
