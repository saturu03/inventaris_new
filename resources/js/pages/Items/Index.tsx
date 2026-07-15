import { Head, Link, router } from '@inertiajs/react';
import { Ellipsis, Eye, SquarePen, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
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

function Lightbox({ item, onClose }: { item: Item | null; onClose: () => void }) {
    useEffect(() => {
        if (!item) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [item, onClose]);

    if (!item) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl bg-white p-2 shadow-2xl dark:bg-gray-900"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                    </svg>
                </button>
                <img
                    src={'/storage/' + item.photo}
                    alt={item.name}
                    className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
                />
                <p className="mt-2 text-center text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                </p>
            </div>
        </div>
    );
}

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
    const [previewItem, setPreviewItem] = useState<Item | null>(null);

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
                            <TableHead>Photo</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category - Location</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {item.photo ? (
                                        <img
                                            src={'/storage/' + item.photo}
                                            alt={item.name}
                                            className="h-12 w-12 cursor-pointer rounded-lg object-cover transition-transform hover:scale-110"
                                            onClick={() => setPreviewItem(item)}
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                            <svg
                                                className="h-6 w-6 text-gray-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                                <circle cx="9" cy="9" r="2" />
                                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                            </svg>
                                        </div>
                                    )}
                                </TableCell>
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
            <Lightbox item={previewItem} onClose={() => setPreviewItem(null)} />
        </AppLayout>
    );
}
