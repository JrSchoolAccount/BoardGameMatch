export interface User {
    userID: string;
    username: string;
    connected: boolean;
    lastMessage: {
        content: string;
        timestamp: string;
    };
}
