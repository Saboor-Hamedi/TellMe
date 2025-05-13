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
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Enter the post title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors.title && <small className="text-[10px] text-red-500">{errors.title}</small>}
                            </div>
                            {/* Image Input */}
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Image
                                </label>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
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
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                Content
                            </label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Write your post content here..."
                                rows={5}
                                className="max-h-[300px] min-h-[100px]"
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
