import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import Navbar from './Navbar';

export default async function NavbarWrapper() {
    const session = await getServerSession(options);

    return <Navbar session={session} />;
}
