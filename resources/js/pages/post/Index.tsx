'use client';
import { edit, show } from '@/actions/App/Http/Controllers/PostController';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { LimitString } from '../helper/LimitString';
import { Post } from '../helper/types';
import { Button } from '@/components/ui/button';

import { BookMinus, Pencil } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/post/index',
    },
];
export default function Index() {
    const { posts } = usePage<{ posts: { data: Post[] }; user_id: number }>().props;
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
            <div className="mx-auto w-full max-w-4xl  p-2 mt-2">
                <div className="grid w-full gap-4 px-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                    {posts.data.length === 0 ? (
                        <p>No Posts</p>
                    ) : (
                        posts.data.map((post) => (
                            <div
                                key={post.id}
                                className="group relative flex h-full flex-col overflow-hidden rounded-md bg-white shadow-sm transition-all duration-300 hover:shadow-xs"
                            >
                                {/* Top Bar - Author + Date */}
                                <div className="flex items-center justify-start gap-2 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-2">
                                    <img
                                        src={post.image ? `/postImages/${post.image}` : '/storage/default/default-profile.png'}
                                        alt={post.user?.name || 'User'}
                                        className="inline-block size-6 rounded-full ring-2 ring-white"
                                    />
                                    <div className="flex w-full justify-between text-sm text-gray-700">
                                        <span className="capitalize">
                                            <Link href={show.url(post.id)}>
                                                {post.author} {post.lastname}
                                            </Link>
                                        </span>
                                        <span>
                                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                </div>

                                {/* Body - Title & Content */}
                                <div className="flex flex-grow flex-col gap-2 p-4">
                                    <Link href={show.url(post.id)}>
                                        <h1 className="text-lg font-semibold text-gray-800">{post.title}</h1>
                                    </Link>
                                    <p className="text-gray-600">{LimitString(post.content, 40, '...')}</p>
                                </div>

                                {/* card footer */}

                                <div className="flex items-center justify-end gap-2 border-t p-3">
                                    <Button asChild size="sm">
                                        <Link href={edit.url(post.id)}>
                                            <Pencil
                                                size={16}
                                                strokeWidth={0.9}
                                                className="text-white transition-colors duration-200 hover:bg-gray-800"
                                            />{' '}
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        onClick={() => deletePost(post.id)}
                                        variant="destructive"
                                        size="sm"
                                        className="cursor-pointer transition-colors duration-200 hover:bg-red-800"
                                    >
                                        <BookMinus size={16} strokeWidth={0.9} className="text-white" /> Delete
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
