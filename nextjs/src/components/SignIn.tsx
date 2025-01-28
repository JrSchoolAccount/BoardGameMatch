'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Linkedin } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Register from '@/components/Register';

export function SignIn() {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleDummySignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (username.trim()) {
            await signIn('credentials', {
                username,
                callbackUrl: '/chat',
            });
        } else {
            alert('Please enter a valid username.');
        }
    };

    return (
        <>
            <Button
                onClick={openModal}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto text-teal-400 border-teal-400 hover:bg-teal-400/10"
            >
                Sign In
            </Button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-gray-900/95 p-4 sm:p-8 rounded-lg shadow-xl max-w-md w-full mx-4 sm:mx-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
                            aria-label="Close sign in modal"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-6 text-center">
                            Sign In
                        </h2>

                        <div className="space-y-4">
                            <Button
                                variant="outline"
                                onClick={() =>
                                    signIn('github', {
                                        callbackUrl: '/chat',
                                    })
                                }
                                className="w-full justify-start text-white hover:text-teal-400 hover:border-teal-400"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                Continue with GitHub
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-white hover:text-teal-400 hover:border-teal-400"
                            >
                                <svg
                                    className="mr-2 h-4 w-4"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Continue with Google
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-white hover:text-teal-400 hover:border-teal-400"
                            >
                                <Linkedin className="mr-2 h-4 w-4" />
                                Continue with LinkedIn
                            </Button>
                        </div>

                        <div className="my-6 flex items-center justify-between">
                            <hr className="w-full border-gray-600" />
                            <span className="px-3 text-gray-400 text-sm">
                                OR
                            </span>
                            <hr className="w-full border-gray-600" />
                        </div>

                        <form
                            className="space-y-4"
                            onSubmit={handleDummySignIn}
                        >
                            <Input
                                type="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-teal-500"
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-teal-500"
                            />
                            <Button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                            >
                                Sign In
                            </Button>
                        </form>

                        <p className="mt-4 text-center text-sm text-gray-400">
                            Don&apos;t have an account? <Register isLink />
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
