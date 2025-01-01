import express from "express";
import { createServer } from 'node:http';
import WebSocketServer from './src/routes/websocket.js';

const app = express();

const server = createServer(app);
const port = process.env.PORT || 3001;

const webSocketServer = new WebSocketServer(server);

app.get("/", (req, res) => {
    res.status(200).send('Websocket server is running');
})

server.listen(port, () => {
    console.log(`WebSocket server is running on port: ${port}`);
})