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
    created_at: string;
    image: File | null;
    user: User;
}

export interface User {
    id: number;
    name: string;
    avatar?: string; 
    posts?: Post[];
    
}
