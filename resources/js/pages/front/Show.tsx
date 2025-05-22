import { Head, Link, router, usePage } from '@inertiajs/react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useState } from 'react';
import { Toaster } from 'sonner';
import Header from '../Header';
import { Post } from '../helper/types';
import PostVisibility from '../post/PostVisibility';
import {show} from '@/actions/App/Http/Controllers/Post/FrontController';
import { ToUpper } from '../helper/Case';
import Button from '@mui/material/Button';

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

    // This returns to the previous URL
  const BackHome = () => {
      const { backUrl } = usePage().props;
       return (
           <Link
               href={String(backUrl)}
               className="inline-flex items-center justify-center gap-2 rounded-sm p-2 text-sm font-medium text-indigo-600 transition delay-100 duration-200 ease-in-out hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-gray-700"
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
            <div className="mb-2 flex items-start justify-center">
                <div className="mt-2 w-full max-w-4xl rounded-md">
                    {/* Back Button and Post Controls */}
                    <div className="mb-2 flex items-center justify-between">
                        {BackHome()}
                        <PostVisibility post={post} onVisibiltyChange={updatePostVisibility} />
                    </div>
                    {/* Post Banner Image */}
                    <div className="mb-2 overflow-hidden border-b-2 border-indigo-100 shadow-xs">
                        <img
                            src={post.image ? `/storage/${post.image}` : '/storage/default/default-profile.png'}
                            alt={post.user?.name || 'User'}
                            className="h-48 w-full object-cover md:h-64"
                        />
                    </div>
                    {/* Comments Section */}
                    <div className="p-2">
                        <h1 className="font-sans sm:text-[1.5rem] md:text-lg lg:text-3xl dark:text-white">{ToUpper(post.title) || 'No Title'}</h1>
                        <small className="text-xs text-indigo-400">
                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </small>
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

                        {/* content */}
                        <article className="prose dark:prose-invert mb-5 max-w-none py-4 text-gray-600 dark:text-gray-300">{post.content}</article>

                        {/* Comments */}

                        {/* Comment Form */}
                        <form className="mb-2 flex flex-col gap-1 border-t-2 border-indigo-400">
                            <textarea
                                className="focus-ring-0 max-w-full border-none bg-white p-2 text-gray-900 outline-none"
                                rows={4}
                                placeholder="Share your thoughts..."
                            />
                            <div className="p-2">
                                <Button variant="contained" className="ml-2">
                                    Contained
                                </Button>
                            </div>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-4">
                            <div className="rounded-xl bg-indigo-50 p-4 text-sm dark:bg-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-indigo-100">
                                        <img
                                            src={
                                                post.user?.profile?.profile_image
                                                    ? `/storage/${post.user?.profile?.profile_image}`
                                                    : '/storage/default/default-profile.png'
                                            }
                                            alt={post.user?.name || 'User'}
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                    </div>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        <Link href={route('profile', post.user?.name)} className="hover:text-indigo-600 hover:underline">
                                            {ToUpper(post.author)}
                                        </Link>
                                    </span>
                                </div>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">
                                    Great post! The examples really helped me understand the concepts better.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
