import type {Metadata} from 'next';
import './globals.css';
import {GeistSans} from 'geist/font/sans';
import {GeistMono} from 'geist/font/mono';

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
        <body
            className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        >
        <NavbarWrapper/>
        {children}
        </body>
        </html>
    );
}
