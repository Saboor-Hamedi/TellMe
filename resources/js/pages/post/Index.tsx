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
import {edit, show, create} from '@/actions/App/Http/Controllers/PostController'
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
                                <TableRow key={post.id} className="">
                                    <TableCell className="w-48 px-6 py-4">{LimitString(post.title, 20, '...')}</TableCell>
                                    <TableCell className="px-6 py-4">{LimitString(post.content, 40, '...')}</TableCell>
                                    <TableCell className="px-6 py-4">{post.is_public ? 'Public' : 'Private'}</TableCell>

                                    {user_id === post.user_id && (
                                        <>
                                            <TableCell className="text-center">
                                                <Link
                                                    className="inline-flex items-center justify-center text-black hover:text-blue-500"
                                                    // href={route('post.show', post.id)}
                                                    href={show.url(post.id)}
                                                >
                                                    <NotebookText size={12} />
                                                </Link>
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-center">
                                                <Link
                                                    className="hover:none inline-flex items-center justify-center text-green-500 hover:text-green-700 focus:outline-none"
                                                    // href={route('post.edit', post.id)}
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

                {/* Pagination Links */}
                <Paginate links={posts.links} />
            </div>
        </AppLayout>
    );
}
