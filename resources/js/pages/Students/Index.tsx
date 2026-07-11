import { Head, Link, router } from '@inertiajs/react';
import { Ellipsis, Eye, FileUp, SquarePen, Trash2, Upload } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { index, create, edit, destroy, download, upload } from '@/routes/students';
import barcode from '@/routes/students/barcode';
import { SearchInput } from '@/components/search-input';
import type { BreadcrumbItem, Student } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Students',
        href: index(),
    },
];

interface ClassOption {
    label: string;
    major_id: number;
    class_id: number;
}

interface Filters {
    major_id?: string;
    class_id?: string;
}

export default function StudentsIndex({ students, classOptions, filters, search }: { students: Student[]; classOptions: ClassOption[]; filters: Filters; search?: string }) {
    const [deleteStudentId, setDeleteStudentId] = useState(0);
    const [deleteStudentName, setDeleteStudentName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showUploadDialog, setShowUploadDialog] = useState(false);
    const [isDraggingFile, setIsDraggingFile] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleDelete = () => {
        router.delete(destroy(deleteStudentId));
        setDeleteStudentId(0);
        setDeleteStudentName('');
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setSelectedFile(file);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingFile(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingFile(false);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingFile(false);

        const file = event.dataTransfer.files?.[0] ?? null;
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleFilterChange = useCallback((value: string) => {
        if (!value) {
            router.get(index());
            return;
        }
        const [majorId, classId] = value.split('-');
        router.get(index(), { major_id: majorId, class_id: classId });
    }, []);

    const handleUpload = () => {
        if (!selectedFile) {
            return;
        }

        setIsUploading(true);
        router.post(
            upload(),
            { file: selectedFile },
            {
                forceFormData: true,
                onFinish: () => setIsUploading(false),
                onSuccess: () => {
                    setSelectedFile(null);
                    setShowUploadDialog(false);
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students Index" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Table Students</h3>
                <div className="flex flex-row p-4 gap-4">
                    <SearchInput route={index().url} currentSearch={search} placeholder="Cari nama atau NIS..." />
                    <Link href={create()} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        Add student
                    </Link>
                    <a href={download.url()} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        Download
                    </a>
                    <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                        <DialogTrigger className='inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>Upload</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Upload Student File</DialogTitle>
                                <DialogDescription>
                                    Seret file ke area di bawah atau klik untuk memilih file.
                                    Format yang didukung: .xlsx, .xls, .csv
                                </DialogDescription>
                            </DialogHeader>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        fileInputRef.current?.click();
                                    }
                                }}
                                className={`flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition-colors ${
                                    isDraggingFile
                                        ? 'border-primary bg-primary/10'
                                        : 'border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/40'
                                }`}
                            >
                                <Upload className="mb-3" size={24} />
                                <p className="text-sm font-medium">
                                    {selectedFile ? selectedFile.name : 'Drop file di sini'}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {selectedFile
                                        ? `${Math.ceil(selectedFile.size / 1024)} KB`
                                        : 'Atau klik untuk memilih file dari komputer'}
                                </p>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowUploadDialog(false)}
                                    disabled={isUploading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleUpload}
                                    disabled={!selectedFile || isUploading}
                                >
                                    <FileUp className="mr-2" size={16} />
                                    {isUploading ? 'Uploading...' : 'Upload File'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <a href={barcode.all.url()} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        Download QR Codes
                    </a>
                </div>
                <div className="flex flex-row gap-2">
                    <select
                        className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        value={
                            filters.major_id
                                ? `${filters.major_id}-${filters.class_id}`
                                : ''
                        }
                        onChange={(e) => handleFilterChange(e.target.value)}
                    >
                        <option value="">All Classes</option>
                        {classOptions.map((option, i) => (
                            <option key={i} value={`${option.major_id}-${option.class_id}`}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <Table>
                    <TableCaption>Table Student</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Majors</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student, index) => (
                            <TableRow key={student.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>
                                    {student.class.level}-{student.major.alias}
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
                                                        href={edit(student.id)}
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
                                                        setDeleteStudentId(
                                                            student.id,
                                                        );
                                                        setDeleteStudentName(
                                                            student.name,
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
                            Are you sure want to delete {deleteStudentName}?
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
