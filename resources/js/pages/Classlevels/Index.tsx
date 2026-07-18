import { Head, Link, router } from '@inertiajs/react';
import { Ellipsis, SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
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
import { index, create, edit, destroy } from '@/routes/classlevels';
import type { BreadcrumbItem, Classlevel } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Classes', href: index() },
];

export default function ClasslevelsIndex({ classes }: { classes: Classlevel[] }) {
    const { t } = useLanguage();
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
            <Head title="Classes Index" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">{`${t('table')} ${t('classes')}`}</h3>
                <div className="flex flex-row gap-4 my-4">
                    <Link href={create()} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        {t('addClass')}
                    </Link>
                </div>
                <Table>
                    <TableCaption>{`${t('table')} ${t('classes')}`}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>{t('level')}</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {classes.map((cls, index) => (
                            <TableRow key={cls.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>Class {cls.level}</TableCell>
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
                                                    <Link href={edit(cls.id)} className="flex gap-4">
                                                         <SquarePen className="my-auto" size={16} /> {t('edit')}
                                                    </Link>
                                                </DropdownMenuLabel>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem variant="destructive" onSelect={() => {
                                                    setDeleteId(cls.id);
                                                    setDeleteName('Class ' + cls.level);
                                                    setShowAlert(true);
                                                }}>
                                                     <Trash2 className="my-auto" size={16} /> {t('delete')}
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
                        <AlertDialogTitle>{t('areYouSureDelete', { name: deleteName })}</AlertDialogTitle>
                        <AlertDialogDescription>{t('thisActionCannotUndone')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={handleDelete}>{t('delete')}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
