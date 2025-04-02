'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import {Post} from '../helper/types'
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Update Post',
        href: '/post/update',
    },
];

export default function Edit({ post }: { post: Post }) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content,
    });

    const updatePost = (eve: React.FormEvent<HTMLFormElement>) => {
        eve.preventDefault();
        put(`/post/${post.id}`, {
            onSuccess: () => {
                toast.success('Post updated successfully.', {duration: 2000});
            },
            onError: () => {
                if(Object.keys(errors).length >=0){
                    return;
                }
                toast.error('Failed to update post.', { duration: 2000 });
            }
        });
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Post" />
            <div className="mx-auto mt-5 w-4/5">
                <form onSubmit={updatePost}>
                    <div className="space-y-1">
                        {/* Input for Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter the post title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)} // ✅ Bind input to state
                            />
                            {errors.title && <small className="text-[10px] text-red-500">{errors.title}</small>}
                        </div>

                        {/* Textarea for Content */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                Content
                            </label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Write your post content here..."
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)} // ✅ Bind textarea to state
                            />
                            {errors.content && <small className="text-[10px] text-red-500">{errors.content}</small>}
                        </div>

                        <div>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Create Post'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
