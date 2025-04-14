import { Head, Link, usePage } from '@inertiajs/react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Post } from '../helper/types';
import Header from '../Header';
import PostVisibility from '../post/PostVisibility';
import { Toaster } from 'sonner';

export default function Show() {
    const { post } = usePage<{ post: Post }>().props;
    const readingTime = Math.ceil(post.content.split(' ').length / 200);

    return (
        <>
            <Toaster position="top-right" />
            <Header />
            <Head title={post.title} />
            <div className="flex min-h-screen items-start justify-center bg-[#FDFDFC] px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#0a0a0a]">
                <div className="w-full max-w-3xl space-y-6 rounded-2xl bg-white p-6 shadow-xl sm:p-8 dark:bg-[#1a1a1a]">
                    {/* Back Button */}
                    <div className="flex items-center justify-between bg-red-400">
                        <div className="flex items-center gap-2">
                            <Link
                                href={route('home')}
                                className="inline-flex items-center gap-2 text-sm text-[#1b1b18] hover:underline dark:text-[#EDEDEC]"
                                prefetch
                            >
                                <KeyboardBackspaceIcon fontSize="small" />
                                Back to Home
                            </Link>
                        </div>
                        <div>
                            <PostVisibility post={post} />
                        </div>
                    </div>

                    {/* Post Banner Image (Static for now) */}
                    <img
                        src={post.image ? `/postImages/${post.image}` : '/storage/default/default-profile.png'}
                        alt={post.user?.name || 'User'}
                        className="w-full rounded-lg object-cover"
                    />

                    {/* Author Info */}
                    <div className="mt-4 flex items-center gap-4">
                        <img src="/storage/default/default-profile.png" alt="Author avatar" className="h-10 w-10 rounded-full object-cover" />
                        <div>
                            <p className="text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">John Doe</p>
                            <p className="text-xs text-[#5a5a58] dark:text-[#a5a5a5]">Content Creator & Blogger</p>
                        </div>
                    </div>

                    {/* Post Meta */}
                    <div className="text-sm text-[#5a5a58] dark:text-[#a5a5a5]">
                        <span className="text-xs text-gray-500">
                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </span>{' '}
                        min read
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {['Laravel', 'React', 'Inertia'].map((tag) => (
                            <span key={tag} className="rounded-full bg-[#eee] px-3 py-1 text-sm text-[#1b1b18] dark:bg-[#2a2a2a] dark:text-[#ededec]">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Separator */}
                    <div className="h-[2px] w-16 rounded bg-[#1b1b18]/20 dark:bg-[#EDEDEC]/20" />

                    {/* Post Title */}
                    <h1 className="text-3xl leading-tight font-bold text-[#1b1b18] sm:text-4xl dark:text-[#EDEDEC]">{post.title}</h1>

                    {/* Post Content */}
                    <p className="text-lg leading-relaxed text-[#3a3a36] dark:text-[#c9c9c9]">{post.content}</p>

                    {/* Share Buttons */}
                    <div className="mt-8 flex gap-4">
                        <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Share on Twitter</button>
                        <button className="rounded-md bg-[#3b5998] px-4 py-2 text-white hover:bg-[#2d4373]">Share on Facebook</button>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-12 space-y-4">
                        <h3 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Comments</h3>

                        {/* Comment Form */}
                        <form className="flex flex-col gap-2">
                            <textarea
                                className="rounded-md border border-gray-300 p-3 text-sm dark:border-gray-600 dark:bg-[#1a1a1a] dark:text-white"
                                rows={3}
                                placeholder="Write a comment..."
                            />
                            <button
                                type="submit"
                                className="self-end rounded-md bg-[#1b1b18] px-4 py-2 text-white hover:bg-[#3a3a36] dark:bg-[#EDEDEC] dark:text-[#1b1b18]"
                            >
                                Post Comment
                            </button>
                        </form>

                        {/* Static Comments */}
                        <div className="space-y-2">
                            <div className="rounded-md bg-[#f1f1f1] p-3 text-sm dark:bg-[#2a2a2a] dark:text-[#EDEDEC]">
                                <p>
                                    <strong>Jane Doe:</strong> Great post! Helped me a lot.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Related Posts */}
                    <div className="mt-12">
                        <h3 className="mb-4 text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Related Posts</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {[
                                { id: 1, title: 'Getting started with Laravel Livewire' },
                                { id: 2, title: 'Integrating React with Laravel using Inertia' },
                            ].map((related) => (
                                <Link
                                    key={related.id}
                                    href="#"
                                    className="block rounded-lg border p-4 hover:shadow dark:border-[#3a3a36] dark:bg-[#1f1f1f]"
                                >
                                    <h4 className="font-medium text-[#1b1b18] dark:text-[#EDEDEC]">{related.title}</h4>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
