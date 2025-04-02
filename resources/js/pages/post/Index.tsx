'use client';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Trash2, FilePenLine } from 'lucide-react';
import { toast } from 'sonner';
import { LimitString } from '../helper/LimitString';
import { Paginate } from '../helper/Paginate';
import { PaginationLinks } from '../helper/types';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/post/index',
    },
];

interface Post {
    id: number;
    title: string;
    content: string;
}

export default function Index({ posts }: { posts: { data: Post[]; links: PaginationLinks[] } }) {
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
    // update post 
    const updatePost = (id: number) => {
        router.get(`/post/${id}/edit`, {
            
        });
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="mx-auto mt-5 w-4/5">
                <Table>
                    <TableCaption>A list of your recent posts.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Text</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.data.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{LimitString(post.content, 80, '...')}</TableCell>
                                <TableCell>
                                    <Link href={`/post/${post.id}/edit`} className="bg-red-400">
                                        <FilePenLine size={16} strokeWidth={1}  />
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => deletePost(post.id)} variant="destructive" size="sm">
                                        <Trash2 size={12} strokeWidth={1} />
                                    </Button>
                                </TableCell>
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
