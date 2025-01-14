import {MessageCircle} from 'lucide-react';
import {Button} from '@/components/ui/button';

export function ChatFab() {
    return (
        <div className="fixed bottom-6 right-6">
            <Button
                size="icon"
                className="rounded-full w-14 h-14 bg-teal-500 hover:bg-teal-600 text-white shadow-lg"
            >
                <MessageCircle className="h-6 w-6"/>
                <span className="sr-only">Open chat</span>
            </Button>
        </div>
    );
}

