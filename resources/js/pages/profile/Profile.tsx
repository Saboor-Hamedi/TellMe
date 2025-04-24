import { show } from '@/actions/App/Http/Controllers/Post/FrontController';
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { InstagramIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import Header from '../Header';
import { ToUpper } from '../helper/Case';
import { Post, User } from '../helper/types';

// end of menu
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile',
        href: '/profile',
    },
];
export default function Profile() {
    // const { user } = usePage<{ user: User}>().props;
    const { user } = usePage<{ user: User & { posts: Post[] } }>().props;
    const BackHome = () => {
        const { backUrl } = usePage().props;

        return (
            <Link
                href={String(backUrl)}
                className="mb-2 inline-flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium text-indigo-600 transition delay-100 duration-200 ease-in-out hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-gray-700"
                prefetch
            >
                <KeyboardBackspaceIcon fontSize="small" />
                Back to Home
            </Link>
        );
    };

    return (
        <>
            <Head title="Profile" />
            <Header />
            {/* Profile Card */}

            <div className="mx-auto mt-5 w-full max-w-4xl space-y-6 overflow-hidden rounded-md bg-gray-100 lg:px-2 lg:py-2">
                <div className="flex items-center justify-between">{BackHome()}</div>
                {/* Background Image */}
                <div className="relative h-40 w-full bg-gradient-to-r from-indigo-500 to-purple-600 sm:h-48 dark:from-indigo-700 dark:to-purple-800">
                    <img
                        src="/storage/profileImages/default-background.png"
                        alt="Profile background"
                        className="h-full w-full object-cover opacity-90"
                    />

                    {/* Edit Button (absolute positioned) */}
                    <button className="absolute top-4 right-4 rounded-md bg-white/90 px-3 py-1 text-xs font-medium text-indigo-600 backdrop-blur-sm hover:bg-white sm:text-sm">
                        Edit Cover
                    </button>
                </div>

                {/* Profile Content */}
                <div className="relative px-4 pb-6 sm:px-6 sm:pb-8">
                    {/* Profile Image */}
                    <div className="sm-top-16 absolute -top-12 left-4 overflow-hidden rounded-full ring-4 ring-white sm:left-6 dark:ring-gray-800">
                        <img
                            src="/storage/default/default-profile.png"
                            alt="User profile"
                            className="h-24 w-24 bg-white object-cover sm:h-32 sm:w-32"
                        />
                        {/* Edit Profile Picture Button */}
                        <button className="absolute right-0 bottom-0 left-0 bg-black/50 py-1 text-xs text-white backdrop-blur-sm">Edit</button>
                    </div>

                    {/* Profile Info */}
                    <div className="pt-16 sm:pt-20 md:pl-40">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                    {ToUpper(user.name) || 'no name'} {user.profile ? ToUpper(user.profile.lastname) : ''}
                                </h1>

                                <p className="text-sm text-indigo-600 sm:text-base dark:text-indigo-400">Storyteller & Content Creator</p>
                            </div>
                            <div className="mt-3 flex gap-2 sm:mt-0">
                                <button className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm text-white transition-colors hover:bg-indigo-700 sm:px-6 sm:py-2 sm:text-base">
                                    Follow
                                </button>
                                <button className="rounded-lg border border-indigo-600 px-4 py-1.5 text-sm text-indigo-600 transition-colors hover:bg-indigo-50 sm:px-6 sm:py-2 sm:text-base dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-700">
                                    Message
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-4 grid grid-cols-3 gap-4 text-center sm:mt-6 sm:flex sm:flex-wrap sm:gap-6">
                            <div className="rounded-lg bg-white/50 p-2 sm:bg-transparent sm:p-0 dark:bg-gray-700/50 sm:dark:bg-transparent">
                                <p className="text-[14px] font-semibold text-gray-900 md:text-[16px] lg:text-[18px] dark:text-white">142</p>
                                <p className="text-[10px] text-gray-600 md:text-[12px] lg:text-[14px] dark:text-gray-400">Stories</p>
                            </div>
                            <div className="rounded-lg bg-white/50 p-2 sm:bg-transparent sm:p-0 dark:bg-gray-700/50 sm:dark:bg-transparent">
                                <p className="text-[14px] font-semibold text-gray-900 md:text-[16px] lg:text-[18px] dark:text-white">5.2K</p>
                                <p className="text-[10px] text-gray-600 md:text-[12px] lg:text-[14px] dark:text-gray-400">Followers</p>
                            </div>
                            <div className="rounded-lg bg-white/50 p-2 sm:bg-transparent sm:p-0 dark:bg-gray-700/50 sm:dark:bg-transparent">
                                <p className="text-[14px] font-semibold text-gray-900 md:text-[16px] lg:text-[18px] dark:text-white">328</p>
                                <p className="text-[10px] text-gray-600 md:text-[12px] lg:text-[14px] dark:text-gray-400">Following</p>
                            </div>
                        </div>

                        {/* Bio */}
                        <p className="mt-4 text-sm text-gray-700 sm:mt-6 sm:text-base dark:text-gray-300">
                            Sharing stories that inspire and connect people. Passionate about technology, travel, and human experiences.
                        </p>

                        {/* Social Links (mobile only) */}
                        <div className="mt-4 flex gap-3 sm:hidden">
                            <a href="#" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                                <TwitterIcon className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                                <InstagramIcon className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                                <LinkedinIcon className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* post */}
            {user.posts?.length > 0 ? (
                <div className="mx-auto mt-8 w-full max-w-4xl overflow-hidden rounded-md bg-gradient-to-br from-indigo-50 to-purple-50 p-4 px-4 shadow-md sm:p-6 sm:px-6 lg:px-3 dark:from-gray-900 dark:to-gray-800">
                    <h2 className="mb-6 text-xl font-bold text-indigo-600 dark:text-indigo-400">Posts by {user.name}</h2>
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                        {user.posts.map((post) => (
                            <div
                                key={post.id}
                                className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800"
                            >
                                {/* Card Header */}
                                <div className="mx-auto grid w-full max-w-6xl gap-6 p-4 sm:grid-cols-1 md:grid-cols-2">
                                    <div className="flex items-center gap-2 space-x-2 p-2">
                                        <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-indigo-300 dark:ring-indigo-600">
                                            <img
                                                src={post.image ? `/postImages/${post.image}` : '/storage/default/default-profile.png'}
                                                alt="Profile Image"
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    const target = e.currentTarget;
                                                    target.src = './storage/default/postImages/default-post.png';
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-semibold">
                                                <a href={show.url(post.id)}>{ToUpper(user.name) || 'no name'}</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="flex-grow bg-white p-4 dark:bg-gray-900">
                                    <h3 className="leading-tight font-bold text-gray-900 sm:text-4xl sm:text-[12px] md:text-[15px] lg:text-lg dark:text-white">
                                        {ToUpper(post.title) || 'No Title'}
                                    </h3>
                                    <span className="text-xs text-indigo-400 dark:text-indigo-300">
                                        {new Date(post.created_at).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                    <p className="my-3 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                                        {post.content.length > 80 ? post.content.slice(0, 80) + '...' : post.content}
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-700 dark:text-white">
                                            Technology
                                        </span>
                                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 dark:bg-purple-700 dark:text-white">
                                            General
                                        </span>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="border-t border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                                    <a
                                        href={show.url(post.id)}
                                        className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 hover:shadow-md"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                        Read Full Story
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mx-auto mt-5 mb-5 max-w-4xl overflow-hidden rounded-md bg-gradient-to-br from-indigo-50 to-purple-50 p-3 shadow-md dark:from-gray-900 dark:to-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-indigo-400 dark:text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75v14.5m7.25-7.25H4.75" />
                    </svg>
                    <h2 className="mt-4 text-xl font-bold text-indigo-600 dark:text-indigo-400">No Posts Yet</h2>
                    <p className="mt-2 max-w-sm text-sm text-gray-600 dark:text-gray-400">
                        Looks like <span className="font-semibold">{user.name}</span> hasn’t posted anything yet. Stay tuned for updates!
                    </p>
                </div>
            )}

            {/* end */}
        </>
    );
}
