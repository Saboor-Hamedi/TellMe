import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Toaster } from 'sonner';
import { ToUpper } from '../helper/Case';
import { Post } from '../helper/types';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/post/index',
    },
];
export default function Show() {
    const { post } = usePage<{ post: Post }>().props;
    const BackHome = () => {
        const { backUrl } = usePage().props;

        return (
            <Link
                href={String(backUrl)}
                className="inline-flex items-center justify-center gap-2 rounded-sm p-2 text-sm font-medium text-indigo-600 transition delay-100 duration-200 ease-in-out hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-gray-700"
                prefetch
            >
                <KeyboardBackspaceIcon fontSize="small" />
                Back to Home
            </Link>
        );
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Toaster position="top-right" />
            <Head title={post.title} />
            {/* Back Button */}
            <div className="flex items-start justify-center">
                <div className="mt-2 w-full max-w-4xl rounded-md bg-white shadow-sm">
                    {/* Back Button and Post Controls */}
                    <div className="flex items-center justify-between p-2">
                        <Link
                            href={route('post.index')}
                            className="inline-flex items-center justify-center gap-2 rounded-sm p-2 text-sm font-medium text-indigo-600 transition delay-100 duration-200 ease-in-out hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-gray-700"
                            prefetch
                        >
                            <KeyboardBackspaceIcon fontSize="small" />
                            Back to Home
                        </Link>
                        {/* <PostVisibility post={post} onVisibiltyChange={updatePostVisibility} /> */}
                    </div>
                    {/* Post Banner Image */}
                    <div className="overflow-hidden shadow-xs">
                        <img
                            src={post.image ? `/postImages/${post.image}` : '/storage/default/default-profile.png'}
                            alt={post.user?.name || 'User'}
                            className="h-48 w-full object-cover md:h-64"
                        />
                    </div>
                    {/* Comments Section */}
                    <div className="p-2">
                        <h1 className="leading-tight font-bold text-gray-900 sm:text-4xl sm:text-[12px] md:text-[15px] lg:text-lg dark:text-white">
                            {ToUpper(post.title) || 'No Title'}
                        </h1>
                        <small className="text-xs text-indigo-400">
                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </small>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {['Laravel', 'React', 'Inertia'].map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <article className="prose dark:prose-invert max-w-none pt-4 text-gray-600 dark:text-gray-300">{post.content}</article>

                        {/* Comment Form */}
                        <form className="mt-5 flex flex-col gap-3">
                            <textarea
                                className="rounded-lg border border-gray-200 p-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                rows={4}
                                placeholder="Share your thoughts..."
                            />
                            <Button variant={'default'} className="mb-2">
                                Post Comment
                            </Button>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-4">
                            <div className="rounded-xl bg-indigo-50 p-4 text-sm dark:bg-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-indigo-100"></div>
                                    <span className="font-medium text-gray-900 dark:text-white">Jane Doe</span>
                                </div>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">
                                    Great post! The examples really helped me understand the concepts better.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
