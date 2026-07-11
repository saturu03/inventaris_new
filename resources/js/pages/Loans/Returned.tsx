import { Head, router } from '@inertiajs/react';
import { CheckCircle, ChevronDown, ChevronRight, Ellipsis, FileText, Trash2 } from 'lucide-react';
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
    TableCell,
    TableHead,
    TableRow,
    TableHeader,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { destroy, pdf, returned } from '@/routes/loans';
import type { BreadcrumbItem, Loan } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Returned',
        href: returned(),
    },
];

const periods = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
];

export default function LoansReturned({
    groups,
    period,
}: {
    groups: { label: string; loans: Loan[] }[];
    period: string;
}) {
    const [deleteLoanId, setDeleteLoanId] = useState(0);
    const [deleteLoanName, setDeleteLoanName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

    const handleDelete = () => {
        router.delete(destroy(deleteLoanId));
        setDeleteLoanId(0);
        setDeleteLoanName('');
    };

    const toggleGroup = (label: string) => {
        setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Returned Loans" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Returned Loans</h3>
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                        {periods.map((p) => (
                        <Button
                            key={p.value}
                            variant={period === p.value ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() =>
                                router.get(returned(), { period: p.value }, { preserveState: true, preserveScroll: true })
                            }
                        >
                            {p.label}
                        </Button>
                    ))}
                    </div>
                    <a href={pdf.url({ period })} target="_blank">
                        <Button type="button" variant="outline" size="sm">
                            <FileText className="mr-1 size-4" />
                            Download PDF
                        </Button>
                    </a>
                </div>

                {groups.length === 0 && (
                    <div className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                        No returned loans yet.
                    </div>
                )}

                {groups.map((group) => {
                    const isExpanded = expandedGroups[group.label] ?? true;

                    return (
                        <div key={group.label} className="overflow-hidden rounded-lg border">
                            <button
                                type="button"
                                onClick={() => toggleGroup(group.label)}
                                className="flex w-full items-center gap-2 bg-muted/50 px-4 py-2 text-left text-sm font-semibold hover:bg-muted"
                            >
                                {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                                {group.label}
                                <span className="ml-auto text-xs font-normal text-muted-foreground">
                                    {group.loans.length} loan{group.loans.length !== 1 ? 's' : ''}
                                </span>
                            </button>

                            {isExpanded && (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>#</TableHead>
                                                <TableHead>Item</TableHead>
                                                <TableHead>Dipinjamkan oleh</TableHead>
                                                <TableHead>Borrower</TableHead>
                                                <TableHead>Borrow Date</TableHead>
                                                <TableHead>Estimasi Kembali</TableHead>
                                                <TableHead>Durasi</TableHead>
                                                <TableHead>Returned</TableHead>
                                                <TableHead>Diterima oleh</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {group.loans.map((loan, i) => (
                                                <TableRow key={loan.id}>
                                                    <TableCell>{i + 1}</TableCell>
                                                    <TableCell>{loan.item.name}</TableCell>
                                                    <TableCell>{loan.user_out?.name}</TableCell>
                                                    <TableCell>{loan.borrower_name}</TableCell>
                                                    <TableCell>{loan.borrower_date}</TableCell>
                                                    <TableCell>
                                                        {loan.estimated_return_date ?? '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {(() => {
                                                            const from = new Date(loan.borrower_date);
                                                            const to = loan.returned ? new Date(loan.returned) : new Date();
                                                            const diffMs = to.getTime() - from.getTime();
                                                            const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
                                                            return `${diffDays} hari`;
                                                        })()}
                                                    </TableCell>
                                                    <TableCell>
                                                        {loan.returned ? loan.returned : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {loan.user_in?.name ?? '-'}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="outline">
                                                                    <Ellipsis />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                <DropdownMenuLabel>
                                                                    Actions
                                                                </DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuGroup>
                                                                    <DropdownMenuItem
                                                                        variant="destructive"
                                                                        onSelect={() => {
                                                                            setDeleteLoanId(loan.id);
                                                                            setDeleteLoanName(loan.borrower_name);
                                                                            setShowAlert(true);
                                                                        }}
                                                                    >
                                                                        <Trash2 className="my-auto" size={16} />{' '}
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
                            )}
                        </div>
                    );
                })}
            </div>
            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure want to delete loan from {deleteLoanName}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
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
