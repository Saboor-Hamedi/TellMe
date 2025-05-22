// resources/js/Components/PostCard.tsx
import { PencilIcon, TrashIcon } from 'lucide-react';
import KebabDropdown from './KebabDropdown';

export default function PostCard({ post }: { post: any }) {
    return (
        <div className="relative mb-4 rounded-lg bg-white p-4 shadow">
            {/* Post content */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-600">{post.content}</p>
            </div>

            {/* Kebab dropdown positioned top-right */}
            <KebabDropdown>
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <PencilIcon className="mr-2 h-4 w-4" />
                    Edit
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Delete
                </button>
            </KebabDropdown>
        </div>
    );
}
