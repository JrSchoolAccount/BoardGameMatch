# BoardGameMatch

This project consists of a **Next.js frontend** and a **WebSocket server**. The frontend communicates with the WebSocket
server and uses **NextAuth.js** for authentication via GitHub.

## Setup Instructions

### 1. Clone the repository

### 2. Setup Frontend (nextjs)

Navigate to the frontend folder:

```bash
cd ./nextjs
```

Install the dependencies:

```bash
npm install
```

Create a .env file in the nextjs directory with the following content:

```bash
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

Run the development server:

```bash
npm run dev
```

The frontend should now be accessible at http://localhost:3000.

### 3. Setup WebSocket Server (websocket-server)

Navigate to the WebSocket server folder:

```bash
cd ../websocket-server
```

Install the dependencies:

```bash
npm install
```

Create a .env file in the websocket-server directory with the following content:

```bash
MONGODB_URI=your-mongodb-uri
```

Run the WebSocket server:

```bash
npm run dev
```

The WebSocket server should now be running on http://localhost:3001.
