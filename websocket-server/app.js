import express from 'express';
import { createServer } from 'node:http';
import WebSocketServer from './src/routes/websocket.js';
import connectDB from './src/config/db.js';

const app = express();
const port = process.env.PORT || 3001;

const initServer = async () => {
    try {
        await connectDB();

        const server = createServer(app);
        const webSocketServer = new WebSocketServer(server);

        app.get('/', (req, res) => {
            res.status(200).send('Websocket server is running');
        });

        server.listen(port, () => {
            console.log(`WebSocket server is running on port: ${port}`);
        });
    } catch (e) {
        console.error(`Error while starting server: ${e.message}`);
    }
};

initServer().catch((e) => {
    console.error(`Error while initialize server: ${e.message}`);
    process.exit(1);
});
