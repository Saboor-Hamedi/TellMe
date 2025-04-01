import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input'; // Import ShadCN Input
import { Textarea } from '@/components/ui/textarea'; // Import ShadCN Textarea
import { Button } from '@/components/ui/button'; // Import ShadCN Button

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Post',
        href: '/post/create', // ✅ Fix URL
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', data); // Debugging
        post('/post'); // Ensure this matches your Laravel POST route
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />
            <div className="p-2">
                <form onSubmit={handleSubmit}>
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
                                onChange={(e) => setData("title", e.target.value)} // ✅ Bind input to state
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
                                onChange={(e) => setData("content", e.target.value)} // ✅ Bind textarea to state
                            />
                            {errors.content && <small className="text-[10px] text-red-500">{errors.content}</small>}
                        </div>

                        <div>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Saving..." : "Create Post"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
