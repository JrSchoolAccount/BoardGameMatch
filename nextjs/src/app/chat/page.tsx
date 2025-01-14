import Chat from '@/components/chat/Chat';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

const ChatPage = async () => {
    const session = await getServerSession(options);
    console.log(session);
    return <Chat session={session} />;
};
export default ChatPage;
