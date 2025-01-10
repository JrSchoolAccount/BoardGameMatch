'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useRef, useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {SignIn} from './SignIn';
import {Session} from 'next-auth';
import {useClickAway} from 'react-use';


interface NavbarProps {
    session: Session | null;
}

const Navbar = ({session}: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const featuresRef = useRef<HTMLUListElement>(null);

    useClickAway(featuresRef, () => setIsOpen(false));

    return (
        <header className="bg-gray-900 text-gray-100">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10">
                        <Image
                            src="/bgmLogo-s.png"
                            alt="BoardGameMatch Logo"
                            width={40}
                            height={40}
                            className="text-teal-500"
                        />
                    </div>
                    <span className="text-2xl font-bold">
            <span className="text-teal-500">Board</span>Game<span className="font-light">Match</span>
          </span>
                </div>
                <nav>
                    <ul className="flex space-x-4 items-center">
                        <li className="relative"
                            onMouseEnter={() => setIsOpen(true)}
                        >
                            <button
                                className="flex items-center hover:text-teal-400 transition-colors"
                            >
                                Features <ChevronDown className="ml-1 h-4 w-4"/>
                            </button>
                            {isOpen && (
                                <ul
                                    ref={featuresRef}
                                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                                    <li>
                                        <Link href="/chat"
                                              onClick={() => {
                                                  setIsOpen(false);
                                              }}
                                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700
                                            hover:text-white">
                                            Chat
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#match"
                                              onClick={() => {
                                                  setIsOpen(false);
                                              }}
                                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Match
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li><Link href="#" className="hover:text-teal-400 transition-colors">About</Link></li>
                        <li><Link href="#" className="hover:text-teal-400 transition-colors">Contact</Link></li>
                        {!session ? (
                            <li><SignIn/></li>
                        ) : (
                            <li><Link href="/profile" className="hover:text-teal-400 transition-colors">Profile</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;