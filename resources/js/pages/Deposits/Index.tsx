import { Head, Link, router } from '@inertiajs/react';
import { Ellipsis, Plus, SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableHeader,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { index as depositsIndex, create, destroy, edit, pickup } from '@/routes/deposits';
import type { BreadcrumbItem, Deposit } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Deposits',
        href: depositsIndex(),
    },
];

const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Deposited', value: 'deposited' },
    { label: 'Picked Up', value: 'picked_up' },
];

export default function DepositsIndex({
    deposits,
    filter,
}: {
    deposits: Deposit[];
    filter: string;
}) {
    const [deleteId, setDeleteId] = useState(0);
    const [deleteName, setDeleteName] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleDelete = () => {
        router.delete(destroy(deleteId));
        setDeleteId(0);
        setDeleteName('');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Deposits" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Manage Deposits</h3>
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <Button
                                key={tab.value}
                                variant={filter === tab.value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(depositsIndex(), { filter: tab.value }, { preserveState: true })}
                            >
                                {tab.label}
                            </Button>
                        ))}
                    </div>
                    <Link href={create()}>
                        <Button>
                            <Plus className="mr-1 size-4" />
                            Add Deposit
                        </Button>
                    </Link>
                </div>

                {deposits.length === 0 && (
                    <div className="py-12 text-center text-muted-foreground">No deposits found.</div>
                )}

                {deposits.length > 0 && (
                    <div className="overflow-x-auto rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Depositor</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Items</TableHead>
                                    <TableHead>Deposit Date</TableHead>
                                    <TableHead>Est. Pickup</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {deposits.map((deposit, i) => (
                                    <TableRow key={deposit.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{deposit.depositor_name}</TableCell>
                                        <TableCell>{deposit.depositor_phone ?? '-'}</TableCell>
                                        <TableCell>
                                            {deposit.items.map((item) => (
                                                <div key={item.id}>
                                                    {item.item_name} x{item.quantity}
                                                </div>
                                            ))}
                                        </TableCell>
                                        <TableCell>{deposit.deposit_date}</TableCell>
                                        <TableCell>{deposit.estimated_pickup_date ?? '-'}</TableCell>
                                        <TableCell>
                                            <Badge variant={deposit.status === 'picked_up' ? 'default' : 'secondary'}>
                                                {deposit.status === 'picked_up' ? 'Picked Up' : 'Deposited'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline">
                                                        <Ellipsis />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuLabel>
                                                            <Link
                                                                href={edit(deposit.id)}
                                                                className="flex gap-4"
                                                            >
                                                                <SquarePen className="my-auto" size={16} /> Edit
                                                            </Link>
                                                        </DropdownMenuLabel>
                                                        {deposit.status === 'deposited' && (
                                                            <DropdownMenuItem
                                                                onSelect={() => router.put(pickup.url(deposit.id))}
                                                            >
                                                                Picked Up
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuGroup>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem
                                                            variant="destructive"
                                                            onSelect={() => {
                                                                setDeleteId(deposit.id);
                                                                setDeleteName(deposit.depositor_name);
                                                                setShowAlert(true);
                                                            }}
                                                        >
                                                            <Trash2 className="my-auto" size={16} /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure want to delete deposit from {deleteName}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={handleDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
