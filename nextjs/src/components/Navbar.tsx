'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SignIn } from './SignIn';
import { Session } from 'next-auth';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import Register from '@/components/Register';

interface NavbarProps {
    session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gray-900 text-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <Link
                            href="/"
                            onClick={() => {
                                if (isMenuOpen) {
                                    setIsMenuOpen(!isMenuOpen);
                                }
                            }}
                            className="flex items-center space-x-3 rounded-md"
                        >
                            <div className="relative w-8 sm:w-10 h-8 sm:h-10">
                                <Image
                                    src="/bgmLogo-s.png"
                                    alt="BoardGameMatch Logo"
                                    width={40}
                                    height={40}
                                    className="text-teal-500"
                                />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold">
                                <span className="text-teal-500">Board</span>Game
                                <span className="font-light">Match</span>
                            </span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>

                    {/* Desktop navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-4 items-center">
                            <li>
                                <Link
                                    href="#match"
                                    className="hover:text-teal-400 transition-colors"
                                >
                                    Match
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-teal-400 transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-teal-400 transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                            {!session ? (
                                <>
                                    <li>
                                        <SignIn />
                                    </li>
                                    <li>
                                        <Register />
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href="/profile"
                                            className="hover:text-teal-400 transition-colors"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-teal-400 border-teal-400 hover:bg-teal-400/10"
                                            onClick={() =>
                                                signOut({ callbackUrl: '/' })
                                            }
                                        >
                                            Sign Out
                                        </Button>
                                    </li>
                                </>
                            )}
                            <li>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-teal-500/10 text-teal-400 border-teal-400 hover:bg-teal-500/20 font-medium"
                                >
                                    <Link
                                        href="/chat"
                                        className="flex items-center space-x-2"
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        <span>Chat</span>
                                    </Link>
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Mobile navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden absolute inset-x-0 bg-gray-900 pb-4 flex flex-col items-center justify-center space-y-4 transition-transform duration-200 ease-in-out z-50">
                        <ul className="flex flex-col space-y-4 items-center justify-center px-6">
                            <li>
                                <Link
                                    href="#match"
                                    className="block hover:text-teal-400 transition-colors"
                                >
                                    Match
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="block hover:text-teal-400 transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="block hover:text-teal-400 transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                            {!session ? (
                                <>
                                    <li>
                                        <SignIn />
                                    </li>
                                    <li>
                                        <Register />
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href="/profile"
                                            onClick={() =>
                                                setIsMenuOpen(!isMenuOpen)
                                            }
                                            className="block hover:text-teal-400 transition-colors"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full text-teal-400 border-teal-400 hover:bg-teal-400/10"
                                            onClick={() =>
                                                signOut({ callbackUrl: '/' })
                                            }
                                        >
                                            Sign Out
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full bg-teal-500/10 text-teal-400 border-teal-400 hover:bg-teal-500/20 font-medium"
                                        >
                                            <Link
                                                href="/chat"
                                                onClick={() =>
                                                    setIsMenuOpen(!isMenuOpen)
                                                }
                                                className="flex items-center justify-center space-x-2"
                                            >
                                                <MessageCircle className="h-4 w-4" />
                                                <span>Chat</span>
                                            </Link>
                                        </Button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Navbar;
