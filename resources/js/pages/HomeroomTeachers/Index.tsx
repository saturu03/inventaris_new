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
    TableCaption,
    TableCell,
    TableHead,
    TableRow,
    TableHeader,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { index, create, edit, destroy } from '@/routes/homeroom-teachers';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Wali Kelas',
        href: index(),
    },
];

type HomeroomTeacher = {
    id: number;
    name: string;
    major: { alias: string } | null;
    class: { level: string } | null;
    phone: string;
};

export default function HomeroomTeachersIndex({ homeroomTeachers }: { homeroomTeachers: HomeroomTeacher[] }) {
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
            <Head title="Wali Kelas" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">{t('homeroomTeachersTitle')}</h3>
                <div className="flex flex-row gap-4 my-4">
                    <Link href={create()} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        {t('addHomeroomTeacher')}
                    </Link>
                </div>
                <Table>
                    <TableCaption>{`${t('table')} ${t('homeroomTeachersTitle')}`}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>{t('name')}</TableHead>
                            <TableHead>{t('classLabel')}</TableHead>
                            <TableHead>{t('majorLabel')}</TableHead>
                            <TableHead>{t('whatsapp')}</TableHead>
                            <TableHead className="text-right">{t('action')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {homeroomTeachers.map((teacher, index) => (
                            <TableRow key={teacher.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{teacher.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{teacher.class?.level ?? '-'}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge>{teacher.major?.alias ?? '-'}</Badge>
                                </TableCell>
                                <TableCell>{teacher.phone}</TableCell>
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
                                                        href={edit(teacher.id)}
                                                        className="flex gap-4"
                                                    >
                                                        <SquarePen className="my-auto" size={16} /> {t('edit')}
                                                    </Link>
                                                </DropdownMenuLabel>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem
                                                    variant="destructive"
                                                    onSelect={() => {
                                                        setDeleteId(teacher.id);
                                                        setDeleteName(teacher.name);
                                                        setShowAlert(true);
                                                    }}
                                                >
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
                        <AlertDialogTitle>
                            {t('areYouSureDelete', { name: deleteName })}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {t('thisActionCannotUndone')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={handleDelete}>
                            {t('delete')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
