import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { LimitString } from './helper/LimitString';
import { Post } from './helper/types';
import Hero from './Hero';
import { useState } from 'react';
import {  Toaster } from 'sonner';
import PostVisibility from './post/PostVisibility';
import {show} from '@/actions/App/Http/Controllers/Post/FrontController';
import {ToUpper} from './helper/Case';
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

    const updatePostVisibility = (postId: number, newVisibility: boolean) => {
        setPostList((prevList) => prevList.map((post) => (post.id === postId ? { ...post, is_public: newVisibility } : post)));
    };
   
    return (
        <>
            <Head title="Welcome" />
            <Toaster position="top-right" />
            <Hero />
            {/* cards */}
            <div className="mx-auto grid w-full gap-6 p-4 sm:grid-cols-1 md:w-5/6 md:grid-cols-2 lg:w-4/5 lg:grid-cols-3">
                {postList
                    .filter((post) => post.is_public == true)
                    .map((post) => (
                        <div
                            key={post.id}
                            className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            {/* Card Header */}
                            <div className="border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-2">
                                <div className="flex items-center gap-4 rounded-md p-2">
                                    <div className="h-10 w-10 overflow-hidden rounded-full bg-white ring-2 ring-indigo-200">
                                        <img
                                            src={post.image ? `/postImages/${post.image}` : '/storage/default/default-profile.png'}
                                            alt={post.user?.name || 'User'}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <Link href={route('profile', post.user?.name)}>
                                            <span className="block text-sm font-semibold">{ToUpper(post.user?.name) || 'Anonymous'}</span>
                                        </Link>
                                    </div>

                                    {/* dropdown menu */}
                                    <PostVisibility post={post} onVisibiltyChange={updatePostVisibility} />
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="flex-grow bg-white p-5">
                                <h3 className="lg:text-lg md:text-[15px] sm:text-[12px] leading-tight font-bold text-gray-900 sm:text-4xl dark:text-white">{ToUpper(post.title)}</h3>
                              
                                <span className="text-xs text-indigo-400">
                                    {new Date(post.created_at).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </span>
                                <p className="my-3 line-clamp-3 text-sm text-gray-600">{LimitString(post.content, 80, '...')}</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">Technology</span>
                                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                                        {/* {post.category || 'General'} */}
                                        General
                                    </span>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="border-t border-gray-100 bg-gray-50 p-4">
                                <a
                                    href={show.url(post.id)}
                                    className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 hover:shadow-md"
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
