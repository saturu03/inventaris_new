export type DepositItem = {
    id: number;
    deposit_id: number;
    item_name: string;
    quantity: number;
    notes: string | null;
};

export type Deposit = {
    id: number;
    depositor_name: string;
    depositor_phone: string | null;
    deposit_date: string;
    estimated_pickup_date: string | null;
    pickup_date: string | null;
    status: 'deposited' | 'picked_up';
    notes: string | null;
    user_id: number;
    items: DepositItem[];
    user: { id: number; name: string };
};

export type DepositForm = {
    depositor_name: string;
    depositor_phone: string;
    deposit_date: string;
    estimated_pickup_date: string;
    notes: string;
    items: { item_name: string; quantity: number; notes: string }[];
};
