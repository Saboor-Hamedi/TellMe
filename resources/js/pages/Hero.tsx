import { type SharedData } from '@/types';
import {  Link, usePage } from '@inertiajs/react';
import { ChevronRight, MoveRight } from 'lucide-react';
import Header from './Header';

export default function Hero() {
        const { auth } = usePage<SharedData>().props;
    
    return (
        <div className="flex min-h-screen flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a]">
            {/* Header with Auth Navigation */}

            <Header />
            

            {/* Modern Hero Section */}
            <div className="relative isolate overflow-hidden bg-white dark:bg-[#0a0a0a]">
                {/* Abstract geometric background */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-0 left-[max(20%,15rem)] h-[60rem] w-[80rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-amber-100 to-rose-100 opacity-30 blur-[100px] dark:from-amber-900/20 dark:to-rose-900/20"></div>
                    <div className="absolute right-[max(20%,15rem)] bottom-0 h-[50rem] w-[80rem] translate-x-1/2 -rotate-[20deg] bg-gradient-to-tl from-blue-100 to-emerald-100 opacity-30 blur-[100px] dark:from-blue-900/20 dark:to-emerald-900/20"></div>
                </div>

                {/* Hero content */}
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-12 lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                        {/* Animated floating badge */}
                        <div className="animate-float relative mb-8 flex w-fit items-center gap-x-4 rounded-full bg-black/5 px-4 py-2 text-sm font-medium text-gray-600 ring-1 ring-gray-200 backdrop-blur ring-inset dark:bg-white/5 dark:text-gray-300 dark:ring-gray-800">
                            <span className="h-2 w-2 rounded-full bg-rose-400"></span>
                            New: Explore our latest features
                        </div>

                        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
                            <span className="inline bg-gradient-to-r from-amber-500 to-rose-600 bg-clip-text text-transparent">Curated</span>{' '}
                            knowledge, <br />
                            <span className="text-gray-900 dark:text-white">shared beautifully</span>
                        </h1>

                        <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">
                            A community-powered platform where ideas meet inspiration. Discover content that matters, crafted by people who care.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-6">
                            <a
                                href="#featured-posts"
                                className="group relative overflow-hidden rounded-lg bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                            >
                                <span className="absolute top-0 left-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full"></span>
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore Content
                                    <MoveRight size={16} strokeWidth={0.75} />
                                </span>
                            </a>

                            <a
                                href="#"
                                className="group flex items-center gap-2 text-sm leading-6 font-semibold text-gray-900 hover:text-rose-600 dark:text-white dark:hover:text-rose-400"
                            >
                                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-rose-600 after:transition-all after:duration-300 group-hover:after:w-full dark:after:bg-rose-400">
                                    How it works
                                </span>
                                <ChevronRight size={16} strokeWidth={0.75} />
                            </a>
                        </div>
                    </div>

                    {/* 3D Card Stack Effect */}
                    <div className="mt-16 hidden sm:mt-24 lg:mt-0 lg:flex lg:flex-none lg:items-center">
                        <div className="perspective-1000 relative w-[400px]">
                            <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-amber-200 opacity-40 blur-3xl dark:bg-amber-800/30"></div>
                            <div className="transform-style-preserve-3d relative h-[450px] w-full transition-all duration-700 hover:rotate-y-12">
                                <div className="absolute inset-0 rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"></div>
                                <div className="absolute inset-0 translate-z-[-20px] rotate-y-[-5deg] transform rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"></div>
                                <div className="absolute inset-0 translate-z-[-40px] rotate-y-[-10deg] transform rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                                    <img
                                        src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                                        alt="Content preview"
                                        className="h-full w-full rounded-2xl object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Posts Section */}
            <div id="featured-posts" className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
                {/* Your card grid component goes here */}
            </div>
        </div>
    );
}
