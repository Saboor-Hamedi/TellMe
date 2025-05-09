import { show } from '@/actions/App/Http/Controllers/Post/FrontController';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Toaster } from 'sonner';
import { ToUpper } from './helper/Case';
import { LimitString } from './helper/LimitString';
import { Post, User } from './helper/types';
import Hero from './Hero';
import PostVisibility from './post/PostVisibility';
// end of menu
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
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
            <Head title="Home" />
            <Toaster position="top-right" />
            <Hero />
            {/* cards */}
            <div className="mx-auto mt-4 grid max-w-5xl gap-4 bg-white p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {postList
                    .filter((post) => post.is_public == true)
                    .map((post) => (
                        <div
                            key={post.id}
                            className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                        >
                            {/* Card Header */}
                            <div className="border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 overflow-hidden rounded-full bg-white ring-2 ring-indigo-200">
                                        <img
                                            src={
                                                post.user?.profile?.profile_image
                                                    ? `/storage/${post.user?.profile?.profile_image}`
                                                    : '/storage/default/default-profile.png'
                                            }
                                            alt={post.user?.name || 'User'}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/storage/default/default-profile.png';
                                            }}
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <Link href={route('profile', post.user?.name)} className="hover:text-indigo-600 hover:underline">
                                            <div className="flex flex-col">
                                                <span className="truncate text-sm font-medium text-gray-800">
                                                    {ToUpper(post.author)} {post.lastname}
                                                </span>
                                                <small className="text-xs text-indigo-500">
                                                    {new Date(post.created_at).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </small>
                                            </div>
                                        </Link>
                                    </div>

                                    <PostVisibility post={post} onVisibiltyChange={updatePostVisibility} />
                                </div>
                            </div>

                            {/* Post Image - Always shown with default fallback */}
                            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                                <img
                                    src={post.image ? `/postImages/${post.image}` : '/storage/default/default-post.png'}
                                    alt={post.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/storage/default/default-post.png';
                                    }}
                                />
                            </div>

                            {/* Card Body - Fixed height with flex-grow-0 */}
                            <div className="flex-grow-0 bg-white p-5">
                                <h3 className="mb-3 line-clamp-2 text-lg font-bold text-gray-900">{ToUpper(post.title)}</h3>

                                <p className="mb-4 line-clamp-3 text-sm text-gray-600">{LimitString(post.content, 100, '...')}</p>

                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">Technology</span>
                                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">General</span>
                                </div>
                            </div>

                            {/* Card Footer - Fixed at bottom */}
                            <div className="mt-auto border-t border-gray-100 bg-gray-50 p-4">
                                <Link
                                    href={show.url(post.id)}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 hover:shadow-sm"
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
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
            {/* end of cards */}
        </>
    );
}
