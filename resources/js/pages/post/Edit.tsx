'use client';

import Button from '@mui/material/Button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Post } from '../helper/types';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Update Post',
        href: '/post/update',
    },
];

export default function Edit({ post }: { post: Post }) {
    const [image, setImage] = useState<File | null>(null);
    const { data, setData, errors, processing } = useForm({
        title: post.title,
        content: post.content,
        is_public: post.is_public,
        image: null,
    });

    const updatePost = (eve: React.FormEvent<HTMLFormElement>) => {
        eve.preventDefault();
        router.post(`/post/${post.id}`, {
            _method: 'put',
            title: data.title,
            content: data.content,
            is_public: data.is_public,
            image: image,
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Post" />
            <div className="mx-auto mt-5 w-4/5">
                <form onSubmit={updatePost} encType="multipart/form-data">
                    <div className="space-y-4">
                        {/* preveiw image */}
                        {post.image && !data.image && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">Current Image:</p>
                                <img src={`/storage/${post.image}`} alt="Current post image" className="h-20 w-20 rounded object-cover" />
                            </div>
                        )}
                        {/* Title Input */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Enter the post title"
                                    className="rounded-sm border-t border-r-0 border-b-0 border-l-0 border-indigo-400 bg-white p-2 text-gray-900 outline-none focus:border-t focus:border-r-0 focus:border-b-0 focus:border-l-0 focus:border-indigo-400 focus:ring-0 focus:outline-none"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors.title && <small className="text-[10px] text-red-500">{errors.title}</small>}
                            </div>
                            {/* Image Input */}
                            <div>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    className="rounded-sm border-t border-r-0 border-b-0 border-l-0 border-indigo-400 bg-white p-2 text-gray-900 outline-none focus:border-t focus:border-r-0 focus:border-b-0 focus:border-l-0 focus:border-indigo-400 focus:ring-0 focus:outline-none"
                                    placeholder="Upload an image"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setImage(file);
                                        }
                                    }}
                                />
                                {errors.image && <small className="text-[10px] text-red-500">{errors.image}</small>}
                            </div>
                        </div>

                        {/* Content Textarea */}
                        <div>
                            
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Write your post content here..."
                                rows={5}
                                className="min-h-[200px] max-w-full overflow-y-auto rounded-sm border-t border-r-0 border-b-0 border-l-0 border-indigo-400 bg-white p-2 text-gray-900 outline-none focus:border-t focus:border-r-0 focus:border-b-0 focus:border-l-0 focus:border-indigo-400 focus:ring-0 focus:outline-none"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                            />
                            {errors.content && <small className="text-[10px] text-red-500">{errors.content}</small>}
                        </div>

                        {/* Publish Switch */}
                        <div className="flex flex-row-reverse items-center justify-between space-x-2 rounded-md">
                            <div className="flex items-center gap-2">
                                <Switch
                                    id="is_public"
                                    name="is_public"
                                    checked={data.is_public}
                                    onCheckedChange={(checked) => setData('is_public', checked)}
                                />
                                <Label htmlFor="is_public">Publish</Label>
                            </div>
                            {/* Submit Button */}
                            <div>
                                {/* <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Update Post'}
                                </Button> */}

                                <Button type="submit" disabled={processing} variant="contained" size="small">
                                    {processing ? 'Saving...' : 'Update'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
