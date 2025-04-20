import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react';
import Header from '../Header';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Scrape',
        href: '/scrape',
    },
];

interface PreviewData {
    title?: string;
    description?: string;
    paragraphs?: string[];
    image?: string;
    url?: string;
    error?: string;
    success?: boolean;
    author?: string;
    published_at?: string;
    tags?: string[];
}

export default function Scrape() {
    const { auth } = usePage().props;
    const [url, setUrl] = useState('');
    const [preview, setPreview] = useState<PreviewData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleScrape = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/scrape/process', { url });
            setPreview(response.data);
        } catch (error) {
            setPreview({
                success: false,
                error: 'An error occurred while scraping the URL',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head title="Link Preview" />
            <Header />

            <div className="mx-auto max-w-5xl p-4 sm:p-6">
                <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                    <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Link Preview Generator</h1>

                    <form onSubmit={handleScrape} className="mb-6">
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <input
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Paste a URL to preview (e.g., https://example.com)"
                                className="flex-grow rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                required
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                            >
                                {isLoading ? 'Processing...' : 'Preview'}
                            </button>
                        </div>
                    </form>

                    {preview && preview.success && (
                        <>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{preview.title || 'No title found'}</h2>

                            {preview.author && (
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    By <span className="font-medium">{preview.author}</span>
                                </p>
                            )}
                            {preview.published_at && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Published on {new Date(preview.published_at).toLocaleString()}
                                </p>
                            )}

                            {preview.image && (
                                <div className="my-4 overflow-hidden rounded-lg">
                                    <img
                                        src={preview.image}
                                        alt="Preview"
                                        className="h-48 w-full object-cover sm:h-64"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}

                            <p className="mt-2 text-gray-700 dark:text-gray-300">{preview.description || 'No description available'}</p>

                            {preview.paragraphs && preview.paragraphs.length > 0 && (
                                <div className="mt-4 space-y-2 text-gray-800 dark:text-gray-200">
                                    {preview.paragraphs.map((para, idx) => (
                                        <p key={idx}>{para}</p>
                                    ))}
                                </div>
                            )}

                            {preview.tags && preview.tags.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {preview.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="mt-4 flex items-center justify-between">
                                <a
                                    href={preview.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                                >
                                    {new URL(preview.url || '').hostname}
                                </a>

                                <button
                                    onClick={() => window.open(preview.url, '_blank')}
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                                >
                                    Visit Site
                                </button>
                            </div>
                        </>
                    )}

                  

                    <div className="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">How it works</h3>
                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300">
                            <li>Paste any website URL in the input field</li>
                            <li>Click "Preview" to generate a preview card</li>
                            <li>Use the preview to share links with rich content</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
