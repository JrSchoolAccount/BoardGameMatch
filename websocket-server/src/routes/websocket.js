import { Server } from "socket.io";

   class WebSocketServer {
        constructor(httpServer) {
            this.io = new Server(httpServer, {
                cors: {
                    origin: "*",  // Replace with specific origin before production
                    methods: ["GET", "POST"],
                },
            });

            this.setupSocketEvents();
        }

        setupSocketEvents() {
            this.io.on('connection', (socket) => {
                console.log(`Client connected: ${socket.id}`);

                socket.on('message', async (data) => {
                    console.log('Message received:', data);

                    this.io.emit('message', newMessage);
                });

                socket.on('disconnect', () => {
                    console.log(`Client disconnected: ${socket.id}`);
                });
            });
        }
    }

export default WebSocketServer;