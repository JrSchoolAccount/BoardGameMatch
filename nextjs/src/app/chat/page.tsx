import Image from 'next/image'
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

const ChatPage = async () => {
    const session = await getServerSession(options);

    return (
        <div className="grid place-items-center">
            <h1>ChatPage</h1>
            <div>
                {session?.user?.name ? <h2>Hello {session.user.name}!</h2> : null}

                {session?.user?.image ? (
                    <Image
                        src={session.user.image}
                        width={150}
                        height={150}
                        className='rounded-lg'
                        alt={`Profile Pic for ${session.user.name}`}
                        priority={true}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default ChatPage;