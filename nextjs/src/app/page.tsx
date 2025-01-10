import {ChatFab} from '@/components/ChatFab';
import {Button} from '@/components/ui/button';
import {Clock, Search, Users, Zap} from 'lucide-react';
import React from 'react';
import {Input} from '@/components/ui/input';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">

            <main>
                <section className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-5xl font-bold mb-6">Find Your Perfect Game Night Match</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">Connect with board game enthusiasts,
                        discover new games, and never play alone again. Your next great gaming experience is just a
                        click away.</p>
                    <div className="flex justify-center space-x-4">
                        <Button size="lg">Get Started</Button>
                        <Button variant="outline" size="lg"
                                className="text-teal-400 border-teal-400 hover:bg-teal-400/10">
                            Learn More
                        </Button>
                    </div>
                </section>

                <section id="features" className="bg-gray-800/50 py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose BoardGameMatch?</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard
                                icon={<Users className="h-12 w-12 text-teal-500"/>}
                                title="Community Matching"
                                description="Find players with similar interests and skill levels."
                            />
                            <FeatureCard
                                icon={<Search className="h-12 w-12 text-teal-500"/>}
                                title="Game Discovery"
                                description="Explore a vast library of board games for every taste."
                            />
                            <FeatureCard
                                icon={<Clock className="h-12 w-12 text-teal-500"/>}
                                title="Flexible Scheduling"
                                description="Plan game nights that fit everyone's timetable."
                            />
                            <FeatureCard
                                icon={<Zap className="h-12 w-12 text-teal-500"/>}
                                title="Quick Matchmaking"
                                description="Get into a game fast with our smart matching system."
                            />
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 py-20 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Join the Community?</h2>
                    <p className="text-xl mb-8 text-gray-300">Join thousands of board game lovers and start your journey
                        today!</p>
                    <div
                        className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="max-w-xs bg-gray-800 border-gray-700 focus:border-teal-500 text-white"
                        />
                        <Button size="lg">Sign Up Now</Button>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800/50 py-8">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} BoardGameMatch. All rights reserved.</p>
                </div>
            </footer>

            <ChatFab/>
        </div>
    );
};

function FeatureCard({icon, title, description}: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-800/80 transition-colors">
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    );
}

export default LandingPage;