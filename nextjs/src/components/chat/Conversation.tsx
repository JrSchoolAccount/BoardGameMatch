'use client';

import ConversationItem from '@/components/chat/ConversationItem';
import { useState } from 'react';

const Conversation = () => {
    type ConversationData = {
        name: string;
        time: string;
        message: string;
        active?: boolean;
    };
    const [users, setUsers] = useState<ConversationData[]>([]);

    return (
        <div className="p-1">
            {users.map((item, index) => (
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
