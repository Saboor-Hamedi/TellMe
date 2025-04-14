'use client';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { LimitString } from '../helper/LimitString';
import { Paginate } from '../helper/Paginate';
import { PaginationLinks, Post } from '../helper/types';
import PostVisibility from './PostVisibility';

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
                            <TableHead>State</TableHead>

                            <TableHead>Edit</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.data.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{LimitString(post.content, 80, '...')}</TableCell>
                                <TableCell>{post.is_public ? 'Public' : 'Private'}</TableCell>

                                {user_id === post.user_id && (
                                    <>
                                        <TableCell>
                                            <Button
                                                href={`/post/${post.id}/edit`}
                                                variant="contained"
                                                color="success"
                                                style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                            >
                                                {<EditIcon />}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => deletePost(post.id)}
                                                variant="contained"
                                                color="error"
                                                style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                            >
                                                <DeleteIcon />
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
