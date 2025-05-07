import { show } from '@/actions/App/Http/Controllers/Post/FrontController';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Camera, InstagramIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { toast, Toaster } from 'sonner';
import Header from '../Header';
import { ToUpper } from '../helper/Case';
import { Post, User } from '../helper/types';
import CoverImage from './CoverImage';
// end of menu
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile',
        href: '/profile',
    },
];

export default function Profile() {
    // const { user, auth } = usePage<{ user: User & { posts: Post[] } }>().props;
    const { user, auth } = usePage<{ user: User & { posts: Post[] }; auth: { user: User | null } }>().props;
    const isProfileOwner = auth?.user?.id === user.id;
    // Upload Profile
    const profileInputRef = useRef<HTMLInputElement>(null);
    const [selectedProfileImage, setSelectedProfileImage] = useState<string | null>(null);
    const [profileFileToUpload, setProfileFileToUpload] = useState<File | null>(null);

    const handleProfileImageClick = () => {
        if (profileInputRef.current) {
            profileInputRef.current.click();
        }
    };

    const handleCancelProfile = () => {
        setSelectedProfileImage(null);
        if (profileInputRef.current) {
            profileInputRef.current.value = '';
        }
    };
    const handleSaveProfile = async () => {
        if (profileFileToUpload) {
            const formData = new FormData();
            formData.append('profile_image', profileFileToUpload);
                 await router.post('/profile/uploadProfilePicture', formData, {
                     onSuccess: () => {
                         toast.success('Background image updated successfully!', {
                             duration: 2000,
                             position: 'top-right',
                         });
                         setSelectedProfileImage(null);
                         setProfileFileToUpload(null);
                         if (profileInputRef.current) {
                             profileInputRef.current.value = '';
                         }
                     },
                     onError: (errors) => {
                         toast.error('Failed to update background image. Please try again.', {
                             duration: 2000,
                             position: 'top-right',
                         });
                     },

                 });
           
        } else {
            console.log('Please select an image.');
        }
    };
    const handleProfileFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // This creates a temporary URL for the selected image
            const previewURL = URL.createObjectURL(file);
            setSelectedProfileImage(previewURL);
            setProfileFileToUpload(file); // Store the file object into state
        } else {
            // if not found then set it to null
            setSelectedProfileImage(null);
            setProfileFileToUpload(null);
        }
    };

    // end of upload

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
            <Head title="Profile" />
            <Header />
            <Toaster position="top-right" />
            {/* Profile Card */}
            <div className="mx-auto mt-2 max-w-4xl overflow-hidden shadow-xs">
                <div className="flex items-center justify-between border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-2">{BackHome()}</div>
                {/* Background Image */}
                <CoverImage />
                {/* Profile Content */}
                <div className="relative px-4 pb-6 sm:px-6 sm:pb-8">
                    {/* Profile Image */}
                    <div className="sm-top-16 absolute -top-12 left-4 sm:left-6">
                        {/* Profile Image Container */}
                        <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-red-400 sm:h-32 sm:w-32 dark:ring-gray-800">
                            <img
                                src={
                                    selectedProfileImage ||
                                    (user.profile?.profile_image
                                        ? `/storage/${user.profile.profile_image}`
                                        : '/storage/profileImages/default-background.png')
                                }
                                alt="User profile"
                                className="h-full w-full bg-white object-cover"
                            />

                            {/* Cancel Button Inside Circle */}
                            {isProfileOwner && selectedProfileImage && (
                                <button
                                    onClick={handleCancelProfile}
                                    className="absolute top-0 right-0 left-0 cursor-pointer bg-black/50 py-1 text-xs text-white backdrop-blur-sm"
                                >
                                    Cancel
                                </button>
                            )}
                            {isProfileOwner && selectedProfileImage && (
                                <button
                                    onClick={handleSaveProfile}
                                    className="absolute right-0 bottom-0 left-0 cursor-pointer bg-black/50 py-1 text-xs text-white backdrop-blur-sm"
                                >
                                    Save
                                </button>
                            )}

                            {/* File input */}
                            {isProfileOwner && (
                                <input
                                    type="file"
                                    name="profile_image"
                                    id="profile_image"
                                    ref={profileInputRef}
                                    onChange={handleProfileFileChange}
                                    className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white/90 px-3 py-1 text-xs font-medium text-indigo-600 backdrop-blur-sm hover:bg-white sm:text-sm"
                                    accept="image/*"
                                />
                            )}
                        </div>

                        {/* Camera Icon – half in, half out */}
                        {isProfileOwner && (
                            <button
                                style={{ zIndex: 100 }}
                                className="absolute -right-3 bottom-17 translate-y-3 transform cursor-pointer rounded-full bg-blue-700 p-1 text-white shadow-md transition-colors duration-200 hover:bg-blue-400"
                                onClick={handleProfileImageClick}
                            >
                                <Camera size={16} strokeWidth={1.75} />
                            </button>
                        )}
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
                <div className="mx-auto mt-2 grid max-w-4xl gap-3 overflow-hidden bg-white p-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {user.posts.map((post) => (
                        <div
                            key={post.id}
                            className="group relative flex h-full flex-col overflow-hidden rounded-md bg-white shadow-sm transition-all duration-300 hover:shadow-xs"
                        >
                            {/* Card Header */}
                            <div className="flex items-center gap-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-2">
                                <div className="h-10 w-10 overflow-hidden rounded-full bg-white ring-2 ring-indigo-200">
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
                                    <span className="mt-3 flex flex-col text-sm font-semibold">
                                        <Link href={show.url(post.id)}>{ToUpper(user.name) || 'no name'}</Link>
                                        <small className="text-xs text-indigo-400 dark:text-indigo-300">
                                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </small>
                                    </span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="flex-grow bg-white p-4 dark:bg-gray-900">
                                <h3 className="leading-tight font-bold text-gray-900 sm:text-4xl sm:text-[12px] md:text-[15px] lg:text-lg dark:text-white">
                                    {ToUpper(post.title) || 'No Title'}
                                </h3>

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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
