import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { LimitString } from './helper/LimitString';
import { Post } from './helper/types';
import Hero from './Hero';
import { useState } from 'react';
import {  Toaster } from 'sonner';
import PostVisibility from './post/PostVisibility';

// end of menu
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Welcome',
        href: '/welcome',
    },
];
export default function Welcome() {
    const { posts } = usePage<SharedData & { posts: { data: Post[] } }>().props;
    const [postList, setPostList] = useState(posts.data);
   
    return (
        <>
            <Head title="Welcome" />
            <Toaster position="top-right" />
            <Hero />

            {/* cards */}
            <div className="mx-auto grid w-full gap-6 p-4 sm:grid-cols-1 md:w-5/6 md:grid-cols-2 lg:w-4/5 lg:grid-cols-3">
                {postList.map((post) => (
                    <div
                        key={post.id}
                        className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Card Header */}
                        <div className="border-b border-gray-100 p-4">
                            <div className="flex items-start gap-3">
                                <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                                    <img
                                        src={post.image ? `/postImages/${post.image}` : '/storage/default/default-profile.png'}
                                        alt={post.user?.name || 'User'}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-gray-900">{post.title}</h3>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-600">{post.user?.name || 'Anonymous'}</span>
                                    </div>
                                </div>
                                {/* dropdown menu */}

                                <PostVisibility post={post}/>
                                {/* end of dropdown menu */}
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="flex-grow p-5">
                            <span className="text-xs text-gray-500">
                                {new Date(post.created_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </span>
                            <p className="mb-4 line-clamp-3 text-gray-700">{LimitString(post.content, 80, '...')}</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">Technology</span>
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                    {/* {post.category || 'General'} */}
                                    General
                                </span>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="border-t border-gray-100 p-4">
                            <a
                                href={`/front/${post.id}`}
                                className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                                Read Full Story
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
