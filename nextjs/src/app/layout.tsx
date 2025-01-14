import type { Metadata } from 'next';
import './globals.css';

import NavbarWrapper from '@/components/NavbarWrapper';

export const metadata: Metadata = {
    title: 'BoardGameMatch',
    description: 'Boardgame Matchmaking',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={'antialiased'}>
                <NavbarWrapper />
                {children}
            </body>
        </html>
    );
}
