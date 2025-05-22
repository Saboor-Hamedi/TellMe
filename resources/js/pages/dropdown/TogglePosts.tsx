import { Ellipsis, GlobeLock, Pencil, Trash2 } from 'lucide-react';

import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { PageProps } from '../helper/types';
interface PostProps {
    post: any;
}
export default function PostCard({ post }: PostProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    // immediately update the li to public/private
    const [isPublic, setIsPublic] = useState(post.is_public);
    // allow only user to edit their own post
    const { auth } = usePage<PageProps>().props;

    // close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // make the post private or public
    const isPrivate = () => {
        if (!post || !post.id) {
            toast.error('Cannot update: Invalid post data');
            return;
        }

        router.patch(
            `/post/${post.id}/toggleVisibilities`,
            {},
            {
                onSuccess: (page) => {
                    const flash = page.props.flash as PageProps['flash'];
                    setIsPublic(!isPublic);
                    if (flash?.success) {
                        toast.success(flash.success, {
                            duration: 2000,
                            position: 'top-right',
                        });
                    }
                    if (flash?.error) {
                        toast.error(flash.error, {
                            duration: 2000,
                            position: 'top-right',
                        });
                    }
                },
            },
        );
        setDropdownOpen(false);
    };
    return (
        <div className="">
            <div className="flex items-start justify-between">
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={toggleDropdown}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-1 hover:bg-gray-100 focus:outline-none"
                    >
                        <Ellipsis size={16} strokeWidth={1.25} />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute top-10 right-0 z-10 w-40 border bg-white shadow-lg">
                            <ul className="text-sm">
                                {/* check if the post belongs to current logged in user */}
                                {auth?.user && auth?.user.id === post.user_id && (
                                    <li onClick={isPrivate} className="flex cursor-pointer items-center gap-x-2 px-2 py-2 hover:bg-gray-100">
                                        <GlobeLock size={16} strokeWidth={1.25} />
                                        {isPublic ? 'Public' : 'Private'}
                                    </li>
                                )}

                                <li className="flex cursor-pointer items-center gap-x-2 px-2 py-2 hover:bg-gray-100">
                                    <Pencil size={16} strokeWidth={1.25} />
                                    Edit
                                </li>
                                <li className="flex cursor-pointer items-center gap-x-2 px-2 py-2 text-red-600 hover:bg-red-100">
                                    <Trash2 size={16} strokeWidth={1.25} />
                                    Delete
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
