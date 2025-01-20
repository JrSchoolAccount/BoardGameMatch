'use client';

import ConversationItem from '@/components/chat/ConversationItem';
import { useEffect, useState } from 'react';
import FormatTimestamp from '@/components/chat/FormatTimestamp';

const Conversation = ({ userId }: { userId: string }) => {
    type ConversationData = {
        name: string;
        time: string;
        message: string;
        active?: boolean;
    };
    const [conversations, setConversations] = useState<ConversationData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await fetch(`/api/rooms?userId=${userId}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch conversations.');
                }

                const rooms = await res.json();

                const transformedData = rooms.map((room: any) => ({
                    name: room.name,
                    time: FormatTimestamp(room.lastMessage?.timestamp),
                    message: room.lastMessage?.message || 'No messages yet',
                    active: true, // Implement this later
                }));

                setConversations(transformedData);
            } catch (error: any) {
                setError(error.message || 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchConversations();
    }, [userId]);

    return (
        <div className="p-1">
            {conversations.map((item, index) => (
                <ConversationItem
                    key={index}
                    message={item.message}
                    time={item.time}
                    name={item.name}
                    active={item.active}
                />
            ))}
        </div>
    );
};

export default Conversation;
