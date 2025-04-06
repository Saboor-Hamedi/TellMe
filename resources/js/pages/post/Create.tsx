'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import Button from '@mui/material/Button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Post',
        href: '/post/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm<{
        title: string;
        content: string;
        is_public: boolean;
        image: File | null,
    }>({
        title: '',
        content: '',
        is_public: false,
        image: null,
    });
 
    const StorePost = (eve: React.FormEvent<HTMLFormElement>) => {
        eve.preventDefault();
        post('/post', {
           
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />
            <div className="mx-auto mt-5 w-4/5">
                <form onSubmit={StorePost} encType="multipart/form-data">
                    <div className="space-y-4">
                        {/* Title and Image Side-by-Side */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Title Input */}
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
                                        if (e.target.files && e.target.files[0]) {
                                            setData('image', e.target.files[0]);
                                        }
                                    }}
                                />
                                {errors.image && <small className="text-[10px] text-red-500">{errors.image}</small>}
                            </div>
                        </div>

                        {/* Content Textarea Full Width */}
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
                        <div className="flex flex-row-reverse items-center justify-between space-x-2 rounded-md ">
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
                                <Button type="submit" disabled={processing} variant="contained" size="small">
                                    {processing ? 'Saving...' : 'Create'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
