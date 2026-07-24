export type Student = {
    id: number;
    major_id: number;
    class_id: number;
    name: string;
    nis: string;
    gender: 'male' | 'female';
    address: string | null;
    barcode: string;
    phone: string;
    photo: string | null;
    class: {
        level: string;
    };
    major: {
        alias: string;
    };
};

export type StudentForm = {
    major_id: number;
    class_id: number;
    name: string;
    nis: number;
    gender: string;
    address: string;
    phone: string;
    photo: string;
};

export type Major = {
    id: number;
    full_name: string;
    alias: string;
};

export type Class = {
    id: number;
    level: string;
};
