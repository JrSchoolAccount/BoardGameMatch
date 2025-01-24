'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import FormatTimestamp from '@/components/chat/FormatTimestamp';
import { MessagesProps } from '@/components/chat/models/MessagesProps';
import dynamic from 'next/dynamic';
import { useClickAway } from 'react-use';
import { Theme } from 'emoji-picker-react';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const Messages = ({
    session,
    messages,
    isLoading,
    isConnected,
    errorMessage,
    sendMessage,
    currentConversation,
    currentConversationStatus,
}: MessagesProps) => {
    const [message, setMessage] = useState<string>('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    useClickAway(emojiPickerRef, () => setShowEmojiPicker(false));

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messages, currentConversation]);

    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage(message);
            setMessage('');
        }
    };

    const handleEmojiClick = (emojiData: { emoji: string }) => {
        setMessage((prevMessage) => prevMessage + emojiData.emoji);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker((prev) => !prev);
    };

    return (
        <div className="flex-grow h-full flex flex-col">
            {/* Header Section */}
            <div className="w-full h-15 p-1 bg-purple-600 dark:bg-gray-800 shadow-md rounded-xl rounded-bl-none rounded-br-none">
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
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
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
                        <div className="text-md text-gray-50 font-semibold">
                            {currentConversation}
                        </div>
                        <div className="flex items-center">
                            <div
                                className={`w-2 h-2 ${currentConversationStatus ? 'bg-green-300' : 'bg-red-500'} rounded-full`}
                            ></div>
                            <div className="text-xs text-gray-50 ml-1">
                                {currentConversationStatus
                                    ? 'Online'
                                    : 'Offline'}
                            </div>
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
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Loading Messages */}
            <div
                className="w-full scroll-auto flex-col flex-grow bg-gray-100 dark:bg-gray-900 my-2 p-2 overflow-y-auto"
                ref={chatContainerRef}
            >
                {isLoading ? (
                    <div className="loading">
                        <div className="text-center">
                            <p>Connecting to the server...</p>
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                ) : errorMessage ? (
                    <div className="error">
                        <p className="text-red-500">{errorMessage}</p>
                    </div>
                ) : (
                    <div
                        className={`text-center status ${isConnected ? 'text-green-500' : 'text-red-500'}`}
                    >
                        {isConnected
                            ? 'Connected to the server'
                            : 'Disconnected'}
                    </div>
                )}
                {/* Messages Section */}
                <div className="flex flex-col items-start space-y-2">
                    {messages
                        .filter(
                            (msg) =>
                                (msg.from === session?.user?.name &&
                                    msg.to === currentConversation) ||
                                (msg.from === currentConversation &&
                                    msg.to === session?.user?.name)
                        )
                        .map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.from === session?.user?.name ? 'justify-end' : 'justify-start'} w-full`}
                            >
                                <div
                                    className={`p-3 mb-2 max-w-sm w-auto rounded-2xl ${msg.from === session?.user?.name ? 'bg-purple-500 dark:bg-gray-800' : 'bg-purple-300 dark:bg-gray-700'}`}
                                >
                                    {/* Username */}
                                    <div className="text-xs text-gray-600 dark:text-gray-200">
                                        {msg.from}:
                                    </div>
                                    <div className="group relative">
                                        {/* Message Content */}
                                        <div className="text-gray-700 dark:text-gray-200">
                                            {msg.content}
                                        </div>

                                        {/* Timestamp */}
                                        <div className="absolute -bottom-7 left-0 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {FormatTimestamp(msg.timestamp)}
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
                    <div className="p-2 hover:bg-gray-900 text-gray-600 dark:text-gray-200 rounded-full relative">
                        <div role="button" onClick={toggleEmojiPicker}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        {/* Emoji Picker */}
                        {showEmojiPicker && (
                            <div
                                ref={emojiPickerRef}
                                className="absolute bottom-16 left-2 md:left-0 z-50"
                            >
                                <Picker
                                    onEmojiClick={handleEmojiClick}
                                    theme={'dark' as Theme}
                                />
                            </div>
                        )}
                    </div>
                    {/* Input Field */}
                    <div className="search-chat flex flex-grow p-2">
                        <input
                            className="input text-gray-700 dark:text-gray-200 text-sm p-5 focus:outline-none bg-gray-100 dark:bg-gray-800 flex-grow rounded-l-md"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSendMessage();
                            }}
                            placeholder="Type your message ..."
                        />
                        <div
                            role="button"
                            tabIndex={0}
                            className="bg-gray-100 hover:bg-gray-500 dark:bg-gray-800 dark:text-gray-200 flex justify-center items-center pr-3 text-gray-400 rounded-r-md"
                            onClick={handleSendMessage}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
