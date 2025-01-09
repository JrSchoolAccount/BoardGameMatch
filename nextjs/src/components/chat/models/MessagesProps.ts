import {Session} from 'next-auth';
import {Message} from '@/components/chat/models/Message';

export interface MessagesProps {
    session: Session | null;
    sendMessage: (message: string) => void;
    messages: Message[];
    isLoading: boolean;
    isConnected: boolean;
    errorMessage: string;
}