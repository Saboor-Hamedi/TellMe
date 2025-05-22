'use client';
import { edit, show } from '@/actions/App/Http/Controllers/PostController';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { LimitString } from '../helper/LimitString';
import { PageProps, Post } from '../helper/types';

import { Eye, Pencil, PencilIcon, Trash2, TrashIcon } from 'lucide-react';
import KebabDropdown from '../dropdown/KebabDropdown';
import PostCard from '../dropdown/PostCard';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/post/index',
    },
];
export default function Index() {
    const { posts } = usePage<{ posts: { data: Post[] }; user_id: number }>().props;
    const [isDeleting, setIsDeleting] = useState(false);
    const deletePost = async (id: number) => {
        console.log(`deletePost called for post ID: ${id}`);
        if (!confirm('Are you sure you want to delete this post?')) return;
        if (isDeleting) {
            console.log('Deletion already in progress for post ID:', id);
            return;
        }
        setIsDeleting(true);
        try {
            await router.delete(route('post.destroy', id), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    const flash = page.props.flash as PageProps['flash'];
                    if (flash?.success) {
                        toast.success(flash.success, {
                            duration: 2000,
                            position: 'top-right',
                        });
                    }
                    if (flash?.error) {
                        toast.error(flash.error, {
                            duration: 2000,
                            position: 'top-right',
                        });
                    }
                },
                onError: (errors) => {
                    console.error('Delete errors:', errors);
                    const errorMessage = Object.values(errors).flat().join(' ') || 'Failed to delete post';
                    toast.error(errorMessage, {
                        duration: 2000,
                        position: 'top-right',
                    });
                },
                onFinish: () => {
                    setIsDeleting(false);
                },
            });
        } catch (error) {
            console.error('Unexpected error during deletion:', error);
            toast.error('An unexpected error occurred', {
                duration: 2000,
                position: 'top-right',
            });
            setIsDeleting(false);
        }
        return { deletePost, isDeleting };
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid w-full gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {posts.data.length === 0 ? (
                        <div className="col-span-full py-12 text-center">
                            <div className="mx-auto max-w-md">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="mt-2 text-lg font-medium text-gray-900">No posts found</h3>
                                <p className="mt-1 text-gray-500">Create your first post to get started</p>
                                <Button onClick={() => router.get(route('post.create'))} className="mt-6 w-full" variant="outline">
                                    Create Post
                                </Button>
                            </div>
                        </div>
                    ) : (
                        posts.data.map((post) => (
                            <div
                                key={post.id}
                                className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                {/* Top Bar - Author + Date */}
                                <div className="flex items-center justify-start gap-2 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-3">
                                    <img
                                        src={
                                            post.user?.profile?.profile_image
                                                ? `/storage/${post.user?.profile?.profile_image}`
                                                : '/storage/default/default-profile.png'
                                        }
                                        alt={post.user?.name || 'User'}
                                        className="inline-block size-8 rounded-full object-cover ring-2 ring-white"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/storage/default/default-profile.png';
                                        }}
                                    />
                                    <div className="flex w-full items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">
                                            <Link href={show.url(post.id)} className="hover:text-indigo-600 hover:underline">
                                                {post.author} {post.lastname}
                                            </Link>
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                </div>

                                {/* Body - Image */}
                                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={post.image ? `/storage/${post.image}` : '/storage/default/default-post.png'}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/storage/default/default-post.png';
                                        }}
                                    />
                                </div>
                                <div className="absolute top-2 right-2">
                                </div>
                                {/* Body - Content */}
                                <div className="flex flex-grow flex-col p-4">
                                    <Link href={show.url(post.id)}>
                                        <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-800 hover:text-indigo-600">{post.title}</h2>
                                    </Link>
                                    <p className="line-clamp-3 text-sm text-gray-600">{LimitString(post.content, 100, '...')}</p>
                                </div>

                                {/* Footer - Actions */}
                                <div className="mx-auto flex items-center justify-between gap-2 border-t border-gray-100 p-3">
                                    <Button asChild size="sm" variant="outline" className="group-hover:bg-gray-50">
                                        <Link href={show.url(post.id)} className="flex items-center gap-1">
                                            <Eye size={16} strokeWidth={1.5} className="text-gray-600" />
                                            <span>View</span>
                                        </Link>
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                                            <Link href={edit.url(post.id)} className="flex items-center gap-1">
                                                <Pencil size={16} strokeWidth={1.5} className="text-white" />
                                                <span>Edit</span>
                                            </Link>
                                        </Button>
                                        <Button
                                            onClick={() => deletePost(post.id)}
                                            variant="destructive"
                                            size="sm"
                                            className="flex cursor-pointer items-center gap-1 hover:bg-red-700"
                                        >
                                            <Trash2 size={16} strokeWidth={1.5} className="text-white" />
                                            <span>Delete</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
