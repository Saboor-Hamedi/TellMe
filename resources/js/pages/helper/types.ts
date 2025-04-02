
import { toast } from 'sonner';

export interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}
export interface Post {
    id: number;
    title: string;
    content: string;
}
