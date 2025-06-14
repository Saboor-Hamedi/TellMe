// menu
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import { Post } from '../helper/types';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

export default function PostVisibility({ post, onVisibiltyChange }: { post: Post; onVisibiltyChange: (postId: number, newVisibility: boolean) => void }) {
    // Create a state to track this specific post's visibility
    const [isPublic, setIsPublic] = useState(post?.is_public || false);
    const { auth } = usePage<SharedData>().props;

    const postVisibility = () => {
        // Only proceed if we have a valid post
        if (!post || !post.id) {
            toast.error('Cannot update: Invalid post data');
            return;
        }
        // Toggle the visibility state immediately (optimistic update)
        setIsPublic(!isPublic);

        // Make the API request
        axios
            .patch(`/post/${post.id}/visibility`)
            .then((response) => {
                const data = response.data;
                console.log('Server response:', data);
                // Update the state with the server's response
                if (data && typeof data.is_public !== 'undefined') {
                    setIsPublic(data.is_public);
                    onVisibiltyChange(post.id, data.is_public);
                }
                // Show success message
                const message = data.message || (data.is_public ? 'Post made public.' : 'Post made private.');
                toast.success(message, { duration: 2000 });
            })
            .catch((error) => {
                console.error('Failed to toggle visibility:', error);
                // Revert the optimistic update on error
                setIsPublic(post.is_public);
                toast.error('Failed to update post visibility', { duration: 2000 });
            });
    };
    return (
        <>
            <div className="flex cursor-pointer items-center justify-end gap-2 rounded-lg transition-all duration-100 hover:bg-gray-200 mr-1">
                {/* <small className="text-xs mr-1">{isPublic ? 'Public' : 'Private'}</small> */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreHorizIcon className="ring:none h-6 w-6 cursor-pointer rounded-full bg-gray-100 p-1 text-gray-500 outline-none" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Post Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {auth.user && auth.user.id === post.user_id && (
                            <DropdownMenuItem onClick={postVisibility}>{post.is_public ? 'Make private' : 'Make public'}</DropdownMenuItem>
                        )}
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
}
