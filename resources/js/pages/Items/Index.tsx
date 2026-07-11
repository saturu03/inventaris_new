import { Head, Link, router } from '@inertiajs/react';
import { Ellipsis, Eye, SquarePen, Trash2 } from 'lucide-react';
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
    TableCaption,
    TableCell,
    TableHead,
    TableRow,
    TableHeader,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { index, create, edit, destroy } from '@/routes/items';
import barcode from '@/routes/items/barcode';
import type { BreadcrumbItem, Item } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Items',
        href: index(),
    },
];

export default function ItemsIndex({ items }: { items: Item[] }) {
    const [deleteItemId, setDeleteItemId] = useState(0);
    const [deleteItemName, setDeleteItemName] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleDelete = () => {
        router.delete(destroy(deleteItemId));
        setDeleteItemId(0);
        setDeleteItemName('');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items Index" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Table Items</h3>
                <div className="flex flex-row p-4 gap-4">
                    <Link href={create()} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        Add item
                    </Link>
                    <a href={barcode.all.url()} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        Download QR Codes
                    </a>
                </div>
                <Table>
                    <TableCaption>Table Items</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category - Location</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    {item.category.name} - {item.location.name}
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
                                                        href={edit(item.id)}
                                                        className="flex gap-4"
                                                    >
                                                        <SquarePen
                                                            className="my-auto"
                                                            size={16}
                                                        />{' '}
                                                        Edit
                                                    </Link>
                                                </DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Link
                                                        href="#"
                                                        className="flex gap-4"
                                                    >
                                                        <Eye
                                                            className="my-auto"
                                                            size={16}
                                                        />{' '}
                                                        Show
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem
                                                    variant="destructive"
                                                    onSelect={() => {
                                                        setDeleteItemId(
                                                            item.id,
                                                        );
                                                        setDeleteItemName(
                                                            item.name,
                                                        );
                                                        setShowAlert(true);
                                                    }}
                                                >
                                                    <Trash2
                                                        className="my-auto"
                                                        size={16}
                                                    />{' '}
                                                    Delete
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
            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure want to delete {deleteItemName}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
