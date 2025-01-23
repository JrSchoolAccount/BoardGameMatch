'use client';

import ConversationItem from '@/components/chat/ConversationItem';
import { useEffect, useState } from 'react';
import { socket } from '@/app/socket';
import { User } from '@/components/chat/models/User';
import FormatTimestamp from '@/components/chat/FormatTimestamp';

interface ConversationProps {
    username: string | null | undefined;
    onConversationClick: (userID: string) => void;
    conversationId: string;
}

const Conversation = ({
    username,
    conversationId,
    onConversationClick,
}: ConversationProps) => {
    const [users, setUsers] = useState<User[]>([]);

    const currentUser = username;

    useEffect(() => {
        const handleUsers = (userList: User[]) => {
            setUsers(userList);
        };

        const handleUserConnected = (newUser: User) => {
            setUsers((prevUsers) => {
                const userExists = prevUsers.some(
                    (user) => user.userID === newUser.userID
                );
                if (userExists) {
                    return prevUsers.map((user) =>
                        user.userID === newUser.userID
                            ? { ...user, connected: true }
                            : user
                    );
                }
                return [...prevUsers, newUser];
            });
        };

        const handleUserDisconnected = (userID: string) => {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.userID === userID
                        ? { ...user, connected: false }
                        : user
                )
            );
        };

        socket.on('users', handleUsers);
        socket.on('user connected', handleUserConnected);
        socket.on('user disconnected', handleUserDisconnected);

        return () => {
            socket.off('users', handleUsers);
            socket.off('user connected', handleUserConnected);
            socket.off('user disconnected', handleUserDisconnected);
        };
    }, []);

    const onlineUsers = users.filter(
        (item) => item.connected && item.username !== currentUser
    );
    const offlineUsers = users.filter(
        (item) => !item.connected && item.username !== currentUser
    );

    return (
        <div>
            <div className="text-lg font-semibold text-gray-600 dark:text-gray-200 p-3">
                Online Users:
            </div>
            <div className="p-1">
                {onlineUsers.map((item, index) => (
                    <ConversationItem
                        key={index}
                        lastMessage={item.lastMessage?.content || 'New User'}
                        time={
                            item.lastMessage?.timestamp
                                ? FormatTimestamp(item.lastMessage.timestamp)
                                : '13:37'
                        }
                        name={item.username}
                        status={item.connected}
                        active={conversationId === item.username}
                        onClick={() => onConversationClick(item.username)}
                    />
                ))}
            </div>
            <div className="text-lg font-semibold text-gray-600 dark:text-gray-200 p-3">
                Offline Users:
            </div>
            <div className="p-1">
                {offlineUsers.map((item, index) => (
                    <ConversationItem
                        key={index}
                        lastMessage={item.lastMessage?.content || 'New User'}
                        time={
                            item.lastMessage?.timestamp
                                ? FormatTimestamp(item.lastMessage.timestamp)
                                : '13:37'
                        }
                        name={item.username}
                        status={item.connected}
                        active={conversationId === item.username}
                        onClick={() => onConversationClick(item.username)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Conversation;
