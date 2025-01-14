import {ChatFab} from '@/components/ChatFab';
import {Button} from '@/components/ui/button';
import {Clock, Search, Users, Zap} from 'lucide-react';
import React from 'react';
import {Input} from '@/components/ui/input';
import FeatureCard from '@/components/FeatureCard';
import Image from 'next/image';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <main>
                <section className="relative">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/boardGames.jpg"
                            alt="Board game collection"
                            fill
                            className="object-cover brightness-[0.3]"
                            priority
                        />
                    </div>
                    <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 text-center">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                            Find Your Perfect Game Night Match
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-xl mx-auto text-gray-300">
                            Connect with board game enthusiasts, discover new games, and never play alone again.
                            Your next great gaming experience is just a click away.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto text-teal-400 border-teal-400 hover:bg-teal-400/10"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </section>

                <section id="features" className="bg-gray-800/50 py-12 sm:py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Why Choose
                            BoardGameMatch?</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            <FeatureCard
                                icon={<Users className="h-10 w-10 sm:h-12 sm:w-12 text-teal-500"/>}
                                title="Community Matching"
                                description="Find players with similar interests and skill levels."
                            />
                            <FeatureCard
                                icon={<Search className="h-10 w-10 sm:h-12 sm:w-12 text-teal-500"/>}
                                title="Game Discovery"
                                description="Explore a vast library of board games for every taste."
                            />
                            <FeatureCard
                                icon={<Clock className="h-10 w-10 sm:h-12 sm:w-12 text-teal-500"/>}
                                title="Flexible Scheduling"
                                description="Plan game nights that fit everyone's timetable."
                            />
                            <FeatureCard
                                icon={<Zap className="h-10 w-10 sm:h-12 sm:w-12 text-teal-500"/>}
                                title="Quick Matchmaking"
                                description="Get in contact with others fast with our smart matching system."
                            />
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 py-12 sm:py-20 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ready to Join the Community?</h2>
                    <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-300">Join thousands of board game lovers
                        and start your journey today!</p>
                    <div
                        className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full sm:w-auto max-w-xs bg-gray-800 border-gray-700 focus:border-teal-500 text-white"
                        />
                        <Button size="lg" className="w-full sm:w-auto">Sign Up Now</Button>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800/50 py-6">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} BoardGameMatch. All rights
                        reserved.</p>
                </div>
            </footer>

            <ChatFab/>
        </div>
    );
};

export default LandingPage;