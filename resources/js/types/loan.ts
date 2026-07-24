export type Loan = {
    id: number;
    item_id: number;
    user_out_id: number;
    user_in_id: number | null;
    student_id: number | null;
    borrower_name: string;
    borrower_role: string;
    collateral_type: string;
    borrower_date: string;
    estimated_return_date: string | null;
    returned: string | null;
    approval_status: 'none' | 'pending' | 'approved' | 'rejected';
    approval_note: string | null;
    approved_by: number | null;
    approved_at: string | null;
    item: {
        id: number;
        name: string;
        barcode: string;
        is_limited?: boolean;
    };
    student: {
        id: number;
        name: string;
        nis: string;
    } | null;
    user_out: {
        id: number;
        name: string;
    };
    user_in: {
        id: number;
        name: string;
    } | null;
    approved_by_user?: {
        id: number;
        name: string;
    } | null;
};

export type LoanEntry = {
    student_id: number | null;
    borrower_name: string;
    item_ids: number[];
};

export type LoanForm = {
    entries: LoanEntry[];
    item_ids?: number[];
    item_id?: number;
    student_id?: number | null;
    borrower_name?: string;
    borrower_role: string;
    collateral_type: string;
    borrower_date: string;
    estimated_return_date: string;
};
