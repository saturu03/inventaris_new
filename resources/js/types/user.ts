export type User = {
    id: number;
    name: string;
    email: string;
    role: 'proktor' | 'staff';
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
};
