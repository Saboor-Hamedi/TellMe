import { Head, Link, router, usePage } from '@inertiajs/react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useState } from 'react';
import { Toaster } from 'sonner';
import Header from '../Header';
import { Post } from '../helper/types';
import PostVisibility from '../post/PostVisibility';
import { Facebook, Twitter } from 'lucide-react';
import {show} from '@/actions/App/Http/Controllers/Post/FrontController';
import { ToUpper } from '../helper/Case';
import ProfileController from '@/actions/App/Http/Controllers/profile/ProfileController';
export default function Show() {
   const { post: initialPost } = usePage<{ post: Post }>().props;
   const [post, setPost] = useState(initialPost);

   const updatePostVisibility = (postId: number, newVisibility: boolean) => {
       if (post.id === postId) {
           setPost((prevPost) => ({ ...prevPost, is_public: newVisibility }));
           if (newVisibility == false) {
               router.visit(route('home'), { preserveScroll: true }); 
           }
       }
   };
  const PostShow = () => {
      const { backUrl } = usePage().props;

      return (
          <Link
              href={String(backUrl)} // Dynamic URL passed from Laravel
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-gray-700"
              prefetch
          >
              <KeyboardBackspaceIcon fontSize="small" />
              Back to Home
          </Link>
      );
  };
    return (
        <>
            <Toaster position="top-right" />
            <Header />
            <Head title={post.title} />
            <div className="flex items-start justify-center bg-gradient-to-b from-indigo-50 to-purple-50 lg:px-8 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
                <div className="mt-1 w-full max-w-4xl space-y-6 rounded-xl bg-white p-6 shadow-lg sm:p-8 dark:bg-gray-800">
                    {/* Back Button and Post Controls */}
                    <div className="flex items-center justify-between">
                        {/* <Link
                            href={route('home')}
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-gray-700"
                            prefetch
                        >
                            <KeyboardBackspaceIcon fontSize="small" />
                            Back to Home
                        </Link> */}
                        {PostShow()}
                        <PostVisibility post={post} onVisibiltyChange={updatePostVisibility} />
                    </div>

                    {/* Post Banner Image */}
                    <div className="overflow-hidden rounded-lg shadow-md">
                        <img
                            src={post.image ? `/postImages/${post.image}` : '/storage/default/default-profile.png'}
                            alt={post.user?.name || 'User'}
                            className="h-48 w-full object-cover md:h-64"
                        />
                    </div>

                    {/* Author Info */}
                    <div className="mt-6 flex items-center gap-4">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-white ring-2 ring-indigo-200">
                            <img src="/storage/default/default-profile.png" alt="Author avatar" className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <span className="block text-sm font-semibold">
                                <a href={show.url(post.id)}>{ToUpper(post.user?.name) || 'no name'}</a>
                            </span>
                            <p className="text-xs text-indigo-500 dark:text-indigo-400">Content Creator & Blogger</p>
                        </div>
                    </div>

                    {/* Post Meta */}
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-xs text-indigo-400">
                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">• 5 min read</span>
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {['Laravel', 'React', 'Inertia'].map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Separator */}
                    <div className="h-[2px] w-16 rounded bg-gradient-to-r from-indigo-300 to-purple-300" />

                    {/* Post Title */}
                    <h1 className="leading-tight font-bold text-gray-900 sm:text-4xl sm:text-[12px] md:text-[15px] lg:text-lg dark:text-white">
                        {ToUpper(post.title) || 'No Title'}
                    </h1>

                    {/* Post Content */}
                    <article className="prose dark:prose-invert max-w-none pt-4 text-gray-600 dark:text-gray-300">{post.content}</article>

                    {/* Share Buttons */}
                    <div className="mt-8 flex flex-wrap gap-3">
                        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                            {/* <Twitter fontSize="small" /> */}
                            <Twitter size={16} />
                            Share on Twitter
                        </button>
                        <button className="flex items-center gap-2 rounded-lg bg-[#3b5998] px-4 py-2 text-sm text-white hover:bg-[#2d4373]">
                            <Facebook size={16} />
                            Share on Facebook
                        </button>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-12 space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Comments</h3>

                        {/* Comment Form */}
                        <form className="flex flex-col gap-3">
                            <textarea
                                className="rounded-lg border border-gray-200 p-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                rows={4}
                                placeholder="Share your thoughts..."
                            />
                            <button
                                type="submit"
                                className="self-end rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Post Comment
                            </button>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-4">
                            <div className="rounded-xl bg-indigo-50 p-4 text-sm dark:bg-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-indigo-100"></div>
                                    <span className="font-medium text-gray-900 dark:text-white">Jane Doe</span>
                                </div>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">
                                    Great post! The examples really helped me understand the concepts better.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Related Posts */}
                    <div className="mt-12">
                        <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Related Stories</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { id: 1, title: 'Getting started with Laravel Livewire' },
                                { id: 2, title: 'Integrating React with Laravel using Inertia' },
                            ].map((related) => (
                                <Link
                                    key={related.id}
                                    href="#"
                                    className="block rounded-xl border border-gray-200 p-4 transition-all hover:border-indigo-300 hover:shadow-md dark:border-gray-700 dark:hover:border-indigo-500"
                                >
                                    <h4 className="font-medium text-gray-900 dark:text-white">{related.title}</h4>
                                    <p className="mt-1 text-xs text-indigo-500">Read more →</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
