import Image from 'next/image';

interface ConversationItemProps {
    active: boolean;
    time: string;
    name: string;
    lastMessage: string;
}

const ConversationItem = ({
    active,
    time,
    name,
    lastMessage,
}: ConversationItemProps) => {
    const _class = active ? 'bg-gray-200' : 'bg-white';

    return (
        <div>
            {/* Users */}
            <div
                className={`conversation-item p-1 dark:bg-gray-700 hover:bg-gray-900 m-1 rounded-md ${_class}`}
            >
                <div className="flex items-center p-2 cursor-pointer">
                    <div className="relative w-7 h-7 m-1">
                        <Image
                            className="rounded-full"
                            src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
                            alt="avatar"
                            width={28}
                            height={28}
                        />
                        <div
                            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-700 ${
                                active ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        ></div>
                    </div>

                    <div className="flex-grow p-2">
                        <div className="flex justify-between text-md">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                {name}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-300">
                                {time}
                            </div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 w-40 truncate">
                            {lastMessage}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationItem;
