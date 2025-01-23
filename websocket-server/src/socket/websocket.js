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
            socket.userID = userID;
            socket.username = username;

            await new Session({
                sessionID: newSessionID,
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

            const sendRecentMessages = async () => {
                try {
                    const recentMessages = await Message.find({
                        $or: [{ from: socket.userID }, { to: socket.userID }],
                    })
                        .sort({ timestamp: -1 })
                        .limit(100);

                    console.log('Sending recent messages to:', socket.userID);
                    socket.emit(
                        'recent-messages',
                        [...recentMessages].reverse()
                    );
                } catch (error) {
                    console.error('Error fetching recent messages:', error);
                    socket.emit('error', {
                        message: 'Failed to fetch recent messages.',
                    });
                }
            };

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

            if (socket.userID) {
                await sendRecentMessages();
            }

            const usersWithLastMessage = await Session.aggregate([
                {
                    $lookup: {
                        from: 'messages',
                        let: { userID: '$userID' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $or: [
                                            { $eq: ['$from', '$$userID'] },
                                            { $eq: ['$to', '$$userID'] },
                                        ],
                                    },
                                },
                            },
                            { $sort: { timestamp: -1 } },
                            { $limit: 1 }, // Get the latest message
                        ],
                        as: 'lastMessage',
                    },
                },
                {
                    $unwind: {
                        path: '$lastMessage',
                        preserveNullAndEmptyArrays: true, // Include users without messages
                    },
                },
                {
                    $project: {
                        userID: 1,
                        username: 1,
                        connected: 1,
                        lastMessage: '$lastMessage',
                    },
                },
            ]);

            socket.emit('users', usersWithLastMessage);

            socket.broadcast.emit('user connected', {
                userID: socket.userID,
                username: socket.username,
                connected: true,
                messages: [],
            });

            socket.on('private message', async ({ content, to, timestamp }) => {
                const message = {
                    content,
                    from: socket.userID,
                    to,
                    timestamp,
                };
                await new Message(message).save();
                socket.to(to).emit('private message', message);
                socket.emit('private message', message);
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
