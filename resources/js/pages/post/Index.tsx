'use client';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Eraser, NotebookText, Pencil } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { LimitString } from '../helper/LimitString';
import { Paginate } from '../helper/Paginate';
import { PaginationLinks, Post } from '../helper/types';
import {edit, show} from '@/actions/App/Http/Controllers/PostController';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/post/index',
    },
];

export default function Index({ posts, user_id }: { posts: { data: Post[]; links: PaginationLinks[] }; user_id: number | null }) {
    const { flash } = usePage().props as {
        flash?: { success?: string; error?: string };
    };

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, { duration: 2000 });
        }
        if (flash?.error) {
            toast.error(flash.error, { duration: 2000 });
        }
    }, [flash]);
    // Delete Post

    const deletePost = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            {
                router.delete(route('post.destroy', id), {
                    onSuccess: () => {
                        toast.success('Post deleted successfully.', { duration: 2000 });
                    },
                    onError: () => {
                        toast.error('Failed to delete post.');
                    },
                });
            }
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="mx-auto mt-2">
                {posts.data.length > 0 ? (
                    <>
                        <div className="overflow-x-auto rounded-md border">
                            <Table className="min-w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                                <TableCaption className="caption-top p-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    A list of your recent posts.
                                </TableCaption>
                                <TableHeader className="bg-gray-100 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                                    <TableRow>
                                        <TableHead className="px-6 py-3">Title</TableHead>
                                        <TableHead className="px-6 py-3">Content</TableHead>
                                        <TableHead className="px-6 py-3">State</TableHead>
                                        <TableHead className="px-6 py-3 text-center">Show</TableHead>
                                        <TableHead className="px-6 py-3 text-center">Edit</TableHead>
                                        <TableHead className="px-6 py-3 text-center">Delete</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {posts.data.map((post) => (
                                        <TableRow key={post.id}>
                                            <TableCell className="w-48 px-6 py-4">{LimitString(post.title, 20, '...')}</TableCell>
                                            <TableCell className="px-6 py-4">{LimitString(post.content, 40, '...')}</TableCell>
                                            <TableCell className="px-6 py-4">{post.is_public ? 'Public' : 'Private'}</TableCell>

                                            {user_id === post.user_id && (
                                                <>
                                                    <TableCell className="text-center">
                                                        <Link
                                                            className="inline-flex items-center justify-center text-black hover:text-blue-500"
                                                            href={show.url(post.id)}
                                                        >
                                                            <NotebookText size={12} />
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4 text-center">
                                                        <Link
                                                            className="inline-flex items-center justify-center text-green-500 hover:text-green-700"
                                                            href={edit.url(post.id)}
                                                        >
                                                            <Pencil size={12} />
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4">
                                                        <Link
                                                            href="#"
                                                            className="inline-flex items-center justify-center text-red-500 hover:text-red-700"
                                                            onClick={() => deletePost(post.id)}
                                                        >
                                                            <Eraser size={12} />
                                                        </Link>
                                                    </TableCell>
                                                </>
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        <Paginate links={posts.links} />
                    </>
                ) : (
                    <div className="mx-auto mt-5 mb-5 max-w-4xl overflow-hidden rounded-md bg-gradient-to-br from-indigo-50 to-purple-50 p-3 shadow-md dark:from-gray-900 dark:to-gray-800">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-indigo-400 dark:text-indigo-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75v14.5m7.25-7.25H4.75" />
                        </svg>
                        <h2 className="mt-4 text-xl font-bold text-indigo-600 dark:text-indigo-400">No Posts Yet</h2>
                        <p className="mt-2 max-w-sm text-sm text-gray-600 dark:text-gray-400">
                            Looks like <span className="font-semibold"></span> hasn’t posted anything yet. Stay tuned for updates!
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
