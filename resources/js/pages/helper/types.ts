
import { toast } from 'sonner';

export interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}
export interface Post {
    id: number;
    user_id: number;
    title: string;
    content: string;
    is_public: boolean;
}
