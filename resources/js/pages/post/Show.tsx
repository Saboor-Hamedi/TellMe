import { Head, Link, usePage } from '@inertiajs/react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Post } from '../helper/types';
import PostVisibility from '../post/PostVisibility';
import { Toaster } from 'sonner';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/post/index',
    },
];
export default function Show() {
    const { post } = usePage<{ post: Post }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Toaster position="top-right" />
            <Head title={post.title} />
            <div className="flex items-start justify-center bg-[#FDFDFC] lg:px-8 dark:bg-[#0a0a0a]">
                <div className="mt-1 w-full max-w-4xl space-y-6 bg-white p-6 shadow-sm sm:p-8 dark:bg-[#1a1a1a]">
                    {/* Back Button */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Link
                                href={route('post.index')}
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
                        className="h-48 w-[100%] rounded-md object-cover"
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
                </div>
            </div>
        </AppLayout>
    );
}
