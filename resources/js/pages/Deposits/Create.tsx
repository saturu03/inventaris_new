import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { index, create, store } from '@/routes/deposits';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Deposits',
        href: index(),
    },
    {
        title: 'Add Deposit',
        href: create(),
    },
];

export default function DepositCreate() {
    const {
        data,
        setData,
        post,
        errors,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        depositor_name: '',
        depositor_phone: '',
        deposit_date: '',
        estimated_pickup_date: '',
        notes: '',
        items: [{ item_name: '', quantity: 1, notes: '' }],
    });

    const addItem = () => {
        setData('items', [
            ...data.items,
            { item_name: '', quantity: 1, notes: '' },
        ]);
    };

    const removeItem = (index: number) => {
        setData(
            'items',
            data.items.filter((_, i) => i !== index),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add a new Deposit" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Add a new Deposit</h3>
                <Separator />
                <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="depositor_name" className="block text-sm font-medium">
                                Depositor Name
                            </Label>
                            <Input
                                type="text"
                                name="depositor_name"
                                id="depositor_name"
                                required
                                value={data.depositor_name}
                                onChange={(e) => setData('depositor_name', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.depositor_name} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="depositor_phone" className="block text-sm font-medium">
                                Phone Number
                            </Label>
                            <Input
                                type="text"
                                name="depositor_phone"
                                id="depositor_phone"
                                value={data.depositor_phone}
                                onChange={(e) => setData('depositor_phone', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.depositor_phone} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="deposit_date" className="block text-sm font-medium">
                                Deposit Date
                            </Label>
                            <Input
                                type="datetime-local"
                                name="deposit_date"
                                id="deposit_date"
                                required
                                value={data.deposit_date}
                                onChange={(e) => setData('deposit_date', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.deposit_date} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="estimated_pickup_date" className="block text-sm font-medium">
                                Estimasi Ambil
                            </Label>
                            <Input
                                type="datetime-local"
                                name="estimated_pickup_date"
                                id="estimated_pickup_date"
                                value={data.estimated_pickup_date}
                                onChange={(e) => setData('estimated_pickup_date', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.estimated_pickup_date} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes" className="block text-sm font-medium">
                            Notes
                        </Label>
                        <Textarea
                            name="notes"
                            id="notes"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.notes} />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Items</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addItem}
                            >
                                <Plus className="mr-1 size-4" />
                                Add Item
                            </Button>
                        </div>

                        {data.items.map((item, itemIndex) => (
                            <div
                                key={itemIndex}
                                className="space-y-4 rounded-lg border p-4"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 space-y-2">
                                        <Label
                                            htmlFor={`item_name_${itemIndex}`}
                                            className="block text-sm font-medium"
                                        >
                                            Item Name
                                        </Label>
                                        <Input
                                            type="text"
                                            id={`item_name_${itemIndex}`}
                                            required
                                            value={item.item_name}
                                            onChange={(e) => {
                                                const updated = [...data.items];
                                                updated[itemIndex].item_name = e.target.value;
                                                setData('items', updated);
                                            }}
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors[`items.${itemIndex}.item_name` as keyof typeof errors]}
                                        />
                                    </div>

                                    <div className="w-24 space-y-2">
                                        <Label
                                            htmlFor={`quantity_${itemIndex}`}
                                            className="block text-sm font-medium"
                                        >
                                            Qty
                                        </Label>
                                        <Input
                                            type="number"
                                            id={`quantity_${itemIndex}`}
                                            min={1}
                                            required
                                            value={item.quantity}
                                            onChange={(e) => {
                                                const updated = [...data.items];
                                                updated[itemIndex].quantity = Number(e.target.value);
                                                setData('items', updated);
                                            }}
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors[`items.${itemIndex}.quantity` as keyof typeof errors]}
                                        />
                                    </div>

                                    {data.items.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="mt-6 shrink-0"
                                            onClick={() => removeItem(itemIndex)}
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor={`item_notes_${itemIndex}`}
                                        className="block text-sm font-medium"
                                    >
                                        Item Notes
                                    </Label>
                                    <Input
                                        type="text"
                                        id={`item_notes_${itemIndex}`}
                                        value={item.notes}
                                        onChange={(e) => {
                                            const updated = [...data.items];
                                            updated[itemIndex].notes = e.target.value;
                                            setData('items', updated);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Add
                        </Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600">Added.</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
