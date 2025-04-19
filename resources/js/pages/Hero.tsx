import { type SharedData } from '@/types';
import {  Link, usePage } from '@inertiajs/react';
import { ChevronRight, MoveRight } from 'lucide-react';
import Header from './Header';

export default function Hero() {
        const { auth } = usePage<SharedData>().props;
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Navigation */}
        <Header />
            

            {/* Hero Content */}
            <div className="container mx-auto flex flex-col items-center px-6 py-24 text-center md:py-32">
                <h1 className="max-w-3xl text-4xl leading-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                    Share your stories with the world
                    <span className="relative">
                        <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-indigo-600/30">
                            <span className="relative text-indigo-600">Tell Me</span>
                        </span>
                    </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg text-gray-600 md:text-xl">
                    A place where your voice matters. Connect, express, and discover stories that inspire.
                </p>

                <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <button className="rounded-lg bg-indigo-600 px-8 py-3 text-lg font-medium text-white shadow-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
                        Start Writing
                    </button>
                    <button className="rounded-lg border border-gray-300 px-8 py-3 text-lg font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
                        Explore Stories
                    </button>
                </div>

                <div className="mt-16 flex items-center justify-center">
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <img
                                key={item}
                                className="h-10 w-10 rounded-full border-2 border-white"
                                src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item}.jpg`}
                                alt="User"
                            />
                        ))}
                    </div>
                    <div className="ml-4 text-left">
                        <p className="text-sm font-medium text-gray-600">Join our community</p>
                        <p className="text-xs text-gray-500">10,000+ active writers</p>
                    </div>
                </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="container mx-auto px-6 pb-24">
                <div className="overflow-hidden rounded-xl bg-white shadow-xl">
                    <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-indigo-100 to-purple-100">
                        <div className="flex h-full items-center justify-center p-8">
                            <div className="text-center">
                                <svg
                                    className="mx-auto h-16 w-16 text-indigo-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Your story starts here</h3>
                                <p className="mt-2 text-gray-500">Write your first post and share it with the world</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
