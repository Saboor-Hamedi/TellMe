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
            <div className="mx-auto mt-2 mb-2 w-4/5 p-2">
                <form onSubmit={StorePost} encType="multipart/form-data">
                    <div className="space-y-4">
                        {/* Title and Image Side-by-Side */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Title Input */}
                            <div>
                                <Input
                                    id="title"
                                    name="title"
                                    className="rounded-sm border-t border-r-0 border-b-0 border-l-0 border-indigo-400 bg-white p-2 text-gray-900 outline-none focus:border-t focus:border-r-0 focus:border-b-0 focus:border-l-0 focus:border-indigo-400 focus:ring-0 focus:outline-none"
                                    placeholder="Enter the post title"
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
                                    placeholder="Upload an image"
                                    className="rounded-sm border-t border-r-0 border-b-0 border-l-0 border-indigo-400 bg-white p-2 text-gray-900 outline-none focus:border-t focus:border-r-0 focus:border-b-0 focus:border-l-0 focus:border-indigo-400 focus:ring-0 focus:outline-none"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setData('image', e.target.files[0]);
                                        }
                                    }}
                                />
                                {errors.image && <small className="text-[10px] text-red-500">{errors.image}</small>}
                            </div>
                        </div>

                        {/* Generate through ai */}

                        {/* Content Textarea Full Width */}
                        <div>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Write your post content here..."
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
