'use client';

import ConversationItem from '@/components/chat/ConversationItem';
import { useEffect, useState } from 'react';
import { socket } from '@/app/socket';
import { User } from '@/components/chat/models/User';

interface ConversationProps {
    username: string | null | undefined; // Accept null or undefined
}

const Conversation = ({ username }: ConversationProps) => {
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

    return (
        <div className="p-1">
            {users
                .filter((item) => item.username !== currentUser)
                .map((item, index) => (
                    <ConversationItem
                        key={index}
                        lastMessage={'item.lastMessage'}
                        time={'item.time'}
                        name={item.username}
                        active={item.connected}
                    />
                ))}
        </div>
    );
};

export default Conversation;
