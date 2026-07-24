export type Category = {
    id: number;
    name: string;
};

export type Location = {
    id: number;
    name: string;
};

export type LocationWithItems = Location & {
    items: Item[];
};

export type Item = {
    id: number;
    category_id: number;
    location_id: number;
    name: string;
    status: 'available' | 'inavailable';
    spec: string | null;
    condition: 'functional' | 'slightly_damaged' | 'broken';
    is_limited: boolean;
    barcode: string;
    photo: string | null;
    category: { name: string };
    location: { name: string };
};

export type ItemForm = {
    category_id: number;
    location_id: number;
    name: string;
    status: string;
    spec: string;
    condition: string;
    is_limited: boolean;
    photo: string | File | null;
};
