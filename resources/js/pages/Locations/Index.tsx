import { Head, Link, router } from '@inertiajs/react';
import { Ellipsis, MapPin, SquarePen, Trash2 } from 'lucide-react';
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
import { index, create, edit, destroy } from '@/routes/locations';
import type { BreadcrumbItem, Location } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Locations',
        href: index(),
    },
];

export default function LocationsIndex({ locations }: { locations: Location[] }) {
    const [deleteLocationId, setDeleteLocationId] = useState(0);
    const [deleteLocationName, setDeleteLocationName] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleDelete = () => {
        router.delete(destroy(deleteLocationId));
        setDeleteLocationId(0);
        setDeleteLocationName('');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Locations Index" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Table Locations</h3>
                <div className="flex flex-row gap-4 my-4">
                    <Link href={create()} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        Add location
                    </Link>
                </div>
                <Table>
                    <TableCaption>Table Locations</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {locations.map((location, index) => (
                            <TableRow key={location.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="flex items-center gap-2">
                                    <MapPin size={16} /> {location.name}
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
                                                        href={edit(location.id)}
                                                        className="flex gap-4"
                                                    >
                                                        <SquarePen
                                                            className="my-auto"
                                                            size={16}
                                                        />{' '}
                                                        Edit
                                                    </Link>
                                                </DropdownMenuLabel>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem
                                                    variant="destructive"
                                                    onSelect={() => {
                                                        setDeleteLocationId(
                                                            location.id,
                                                        );
                                                        setDeleteLocationName(
                                                            location.name,
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
                            Are you sure want to delete {deleteLocationName}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
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
