'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Github, Linkedin, X} from 'lucide-react';
import {signIn} from 'next-auth/react';
import Image from 'next/image';

interface RegisterProps {
    isLink?: boolean;
}

const Register = ({isLink = false}: RegisterProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle registration logic here
            console.log('Form submitted:', formData);
            closeModal();
        }
    };

    return (
        <>
            {isLink ? (
                <button
                    onClick={openModal}
                    className="text-teal-400 hover:underline"
                >
                    Sign up
                </button>
            ) : (
                <Button
                    onClick={openModal}
                    variant="outline"
                    size="sm"
                    className="text-teal-400 border-teal-400 hover:bg-teal-400/10"
                >
                    Register
                </Button>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeModal}>
                    <div
                        className="relative bg-gray-900 p-8 rounded-lg shadow-xl max-w-md w-full mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute inset-0 -z-10">
                            <Image
                                src="/logo.png"
                                alt="BoardGameMatch Logo Background"
                                fill
                                className="object-contain opacity-10"
                                priority
                            />
                        </div>
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
                            aria-label="Close register modal"
                        >
                            <X className="w-6 h-6"/>
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>

                        <div className="space-y-4">
                            <Button
                                variant="outline"
                                onClick={() => signIn('github', {callbackUrl: '/profile'})}
                                className="w-full justify-start text-white hover:text-teal-400 hover:border-teal-400"
                            >
                                <Github className="mr-2 h-4 w-4"/>
                                Continue with GitHub
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-white hover:text-teal-400 hover:border-teal-400"
                            >
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor"
                                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor"
                                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor"
                                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor"
                                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-white hover:text-teal-400 hover:border-teal-400"
                            >
                                <Linkedin className="mr-2 h-4 w-4"/>
                                Continue with LinkedIn
                            </Button>
                        </div>

                        <div className="my-6 flex items-center justify-between">
                            <hr className="w-full border-gray-600"/>
                            <span className="px-3 text-gray-400 text-sm">OR</span>
                            <hr className="w-full border-gray-600"/>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-teal-500"
                                />
                                {errors.username && (
                                    <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                                )}
                            </div>
                            <div>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-teal-500"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-teal-500"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>
                            <div>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-teal-500"
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                                Create Account
                            </Button>
                        </form>

                        <p className="mt-4 text-center text-sm text-gray-400">
                            Already have an account?{' '}
                            <button onClick={closeModal} className="text-teal-400 hover:underline">
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Register;