'use client';

import Image from 'next/image';

const Welcome = () => {
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
                    <div className="flex-grow p-2">
                        <div className="text-md text-gray-50 font-semibold">
                            Welcome to Chat
                        </div>
                        <div className="text-xs text-gray-50">
                            Select a conversation to start chatting
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full scroll-auto flex-col flex-grow bg-gray-100 dark:bg-gray-900 my-2 p-2 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-[500px] h-[300px] mx-auto opacity-75 rounded-xl overflow-hidden">
                        <Image
                            src="/logo3.png"
                            alt="BoardGameMatch Logo"
                            fill
                            className="object-fill"
                            priority
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mt-4">
                        Start a Conversation
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Select a user from the sidebar to begin chatting
                    </p>
                </div>
            </div>

            {/* Input Section */}
            <div className="h-15 p-3 rounded-xl rounded-tr-none rounded-tl-none bg-gray-100 dark:bg-gray-800">
                <div className="flex items-center justify-center"></div>
            </div>
        </div>
    );
};

export default Welcome;
