import ConversationItem from '@/components/chat/ConversationItem';

const Conversation = () => {
    type ConversationData = {
        name: string,
        time: string,
        message: string,
        active?: boolean,
    };
    const data: ConversationData[] = [
        {name: 'John Doe', time: 'just now', message: 'Hey there! Are you finish creating the chat app?', active: true},
        {name: 'Cherry Ann', time: '12:00', message: 'Hello? Are you available tonight?'},
        {name: 'Lalaine', time: 'yesterday', message: 'I\'m thinking of resigning'},
        {name: 'Princess', time: '1 day ago', message: 'I found a job :)'},
        {name: 'Charm', time: '1 day ago', message: 'Can you get me some chocolates?'},
        {name: 'Garen', time: '1 day ago', message: 'I\'m the bravest of all kind'},
    ];

    return (
        <div className="p-1">
            {data.map((item, index) => (
                <ConversationItem
                    key={index} // Always provide a unique key for mapped items
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