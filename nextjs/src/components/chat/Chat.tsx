'use client';

import Conversation from '@/components/chat/Conversation';
import Messages from '@/components/chat/Messages';
import {Session} from 'next-auth';
import {useEffect, useState} from 'react';
import {socket} from '@/app/socket';
import {Message} from '@/components/chat/models/Message';

interface ChatProps {
    session: Session | null;
}

const Chat = ({session}: ChatProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (messages.length == 0 && isConnected) {
            setIsLoading(true);
        }
    }, [messages, isConnected]);

    useEffect(() => {
        const handleConnect = () => {
            setIsConnected(true);
            setIsLoading(false);
        };

        const handleDisconnect = () => {
            setIsConnected(false);
        };

        const handleMessage = (newMessage: Message) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        const handleConnectError = () => {
            setIsConnected(false);
            setErrorMessage('Unable to connect to the server. Please try again later.');
            setIsLoading(false);
        };

        const handleHistory = (history: Message[]) => {
            setMessages(history);
            setIsLoading(false);
        };

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('profile-history', handleHistory);
        socket.on('message', handleMessage);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('connect-error', handleConnectError);
            socket.off('message');
            socket.off('profile-history');
        };
    }, []);

    const sendMessage = (message: string) => {
        if (message.trim() && session?.user?.name) {
            const newMessage = {
                username: session.user.name,
                message: message,
                timestamp: new Date().toISOString(),
            };

            socket.emit('message', newMessage);
        }
    };

    return (
        <div className="flex bg-white dark:bg-gray-900">
            {/* Chat Section */}
            <div className="w-80 h-screen dark:bg-gray-800 bg-gray-100 p-2 hidden md:block">
                <div className="h-full overflow-y-auto">
                    <div
                        className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3">{session?.user?.name ? `${session.user.name}` : null}</div>
                    <div className="search-chat flex p-3">
                        <input
                            className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700 w-full rounded-l-md"
                            type="text"
                            placeholder="Search Messages"
                        />
                        <div
                            className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-5" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-600 dark:text-gray-200 p-3">Recent</div>
                    <Conversation/>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-grow h-screen p-2 rounded-md">
                <Messages
                    session={session}
                    messages={messages}
                    isLoading={isLoading}
                    isConnected={isConnected}
                    errorMessage={errorMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;
