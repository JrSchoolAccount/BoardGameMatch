'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Session} from 'next-auth';
import {socket} from '@/app/socket';
import formatTimestamp from '@/components/chat/formatTimestamp';

interface MessagesProps {
    session: Session | null;
}

interface Message {
    username: string;
    message: string;
    timestamp: string;
}

const Messages = ({session}: MessagesProps) => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true);
        };

        const onDisconnect = () => {
            setIsConnected(false);
        };

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        socket.on('profile-history', (history: Message[]) => {
            setMessages(history);
        });

        socket.on('message', (newMessage: Message) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('message');
            socket.off('profile-history');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() && session?.user?.name) {
            const newMessage = {
                username: session.user.name,
                message: message,
                timestamp: new Date().toISOString(),
            };

            socket.emit('message', newMessage);

            setMessage('');
        }
    };
    return (
        <div className="flex-grow h-full flex flex-col">
            {/* Header Section */}
            <div
                className="w-full h-15 p-1 bg-purple-600 dark:bg-gray-800 shadow-md rounded-xl rounded-bl-none rounded-br-none">
                <div className="flex p-2 align-middle items-center">
                    {/* Back Button */}
                    <div className="p-2 md:hidden rounded-full mr-1 hover:bg-purple-500 text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                    </div>
                    {/* Avatar */}
                    <div className="border rounded-full border-white p-1/2">
                        <Image
                            className="w-14 h-14 rounded-full"
                            src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
                            alt="avatar"
                            width={56}
                            height={56}
                        />
                    </div>
                    {/* User Info */}
                    <div className="flex-grow p-2">
                        <div className="text-md text-gray-50 font-semibold">John Doe</div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                            <div className="text-xs text-gray-50 ml-1">Online</div>
                        </div>
                    </div>
                    {/* Menu Button */}
                    <div className="p-2 text-white cursor-pointer hover:bg-purple-500 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Messages Section */}
            <div className="w-full flex-col flex-grow bg-gray-100 dark:bg-gray-900 my-2 p-2 overflow-y-auto">
                <div className="flex flex-col items-start space-y-2">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.username === session?.user?.name ? 'justify-end' : 'justify-start'} w-full`}
                        >
                            <div
                                className={`p-3 mb-2 max-w-sm w-auto rounded-2xl ${msg.username === session?.user?.name ? 'bg-purple-500 dark:bg-gray-800' : 'bg-purple-300 dark:bg-gray-800'}`}
                            >
                                <div className="text-xs text-gray-600 dark:text-gray-200">{msg.username}</div>
                                <div className="group relative">
                                    {/* Message Content */}
                                    <div className="text-gray-700 dark:text-gray-200">{msg.message}</div>

                                    {/* Timestamp */}
                                    <div
                                        className="absolute -bottom-7 left-0 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {formatTimestamp(msg.timestamp)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Input Section */}
            <div className="h-15 p-3 rounded-xl rounded-tr-none rounded-tl-none bg-gray-100 dark:bg-gray-800">
                <div className="flex items-center">
                    {/* Emoji Icon */}
                    <div className="p-2 text-gray-600 dark:text-gray-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    {/* Input Field */}
                    <div className="search-chat flex flex-grow p-2">
                        <input
                            className="input text-gray-700 dark:text-gray-200 text-sm p-5 focus:outline-none bg-gray-100 dark:bg-gray-800 flex-grow rounded-l-md"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') sendMessage();
                            }}
                            placeholder="Type your message ..."
                        />
                        <div
                            role="button"
                            tabIndex={0}
                            className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 flex justify-center items-center pr-3 text-gray-400 rounded-r-md"
                            onClick={sendMessage}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
