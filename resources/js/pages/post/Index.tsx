'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { FilePenLine, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { LimitString } from '../helper/LimitString';
import { Paginate } from '../helper/Paginate';
import { PaginationLinks, Post } from '../helper/types';
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
                router.delete(`/post/${id}`, {
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
            <div className="mx-auto mt-5 w-4/5">
                <Table>
                    <TableCaption>A list of your recent posts.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Content</TableHead>
                            <TableHead>Edit</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.data.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{LimitString(post.content, 80, '...')}</TableCell>

                                {user_id === post.user_id && (
                                    <>
                                        <TableCell>
                                            <Link href={`/post/${post.id}/edit`} className="bg-red-400">
                                                <FilePenLine size={16} strokeWidth={1} />
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => deletePost(post.id)} variant="destructive" size="sm">
                                                <Trash2 size={12} strokeWidth={1} />
                                            </Button>
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination Links */}
                <Paginate links={posts.links} />
            </div>
        </AppLayout>
    );
}
