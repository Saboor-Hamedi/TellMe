'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
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
    }>({
        title: '',
        content: '',
        is_public: false,
    });

    const StorePost = (eve: React.FormEvent<HTMLFormElement>) => {
        eve.preventDefault();
        post('/post', {
            // onSuccess: () => {
            //     toast.success('Post created successfully.', {duration: 2000});
            //     reset(); 
            // },
            // onError: () => {
            //     if(Object.keys(errors).length >=0){
            //         return;
            //     }
            //     toast.error('Failed to create post.', { duration: 2000 });
            // }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />
            <div className="mx-auto mt-5 w-4/5">
                <form onSubmit={StorePost}>
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
                                rows={5}
                                className="max-h-[300px] min-h-[100px]"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)} // ✅ Bind textarea to state
                            />
                            {errors.content && <small className="text-[10px] text-red-500">{errors.content}</small>}
                        </div>

                        {/* is_public */}

                        <div className="mt-3 mb-3 flex items-center space-x-2">
                            <Switch
                                id="airplane-mode"
                                name="is_public"
                                checked={data.is_public}
                                onCheckedChange={(checked) => setData('is_public', checked ? true : false)}
                            />
                            <Label htmlFor="airplane-mode">Publish</Label>
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
