import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

// end of menu
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile',
        href: '/profile',
    },
];
export default function Profile() {

    return (
        <>
                <Head title="Profile" />
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg dark:from-gray-900 dark:to-gray-800">
                {/* Background Image */}
                <div className="h-48 w-full bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800">
                    <img src="/path-to-user-background-image.jpg" alt="Profile background" className="h-full w-full object-cover opacity-90" />
                </div>

                {/* Profile Content */}
                <div className="relative px-6 pb-8 sm:px-8">
                    {/* Profile Image */}
                    <div className="absolute -top-16 left-6 overflow-hidden rounded-full ring-4 ring-white dark:ring-gray-800">
                        <img src="/path-to-user-profile-image.jpg" alt="User profile" className="h-32 w-32 bg-white object-cover" />
                    </div>

                    {/* Profile Info */}
                    <div className="pt-20 sm:pl-40">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sarah Johnson</h1>
                                <p className="text-indigo-600 dark:text-indigo-400">Storyteller & Content Creator</p>
                            </div>
                            <button className="mt-4 rounded-lg bg-indigo-600 px-6 py-2 text-white transition-colors hover:bg-indigo-700 sm:mt-0">
                                Follow
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 flex gap-6 text-center">
                            <div>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">142</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Stories</p>
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">5.2K</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">328</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
                            </div>
                        </div>

                        {/* Bio */}
                        <p className="mt-6 text-gray-700 dark:text-gray-300">
                            Sharing stories that inspire and connect people. Passionate about technology, travel, and human experiences.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
