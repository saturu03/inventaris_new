import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeftRight, ChevronDown, ChevronRight, Ellipsis, FileText, SquarePen, Trash2 } from 'lucide-react';
import { useState, useMemo } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { index, create, edit, destroy, pdf, returnMethod } from '@/routes/loans';
import type { BreadcrumbItem, Loan } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Loans',
        href: index(),
    },
];

const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Borrowed', value: 'borrowed' },
];

const periods = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
];

export default function LoansIndex({
    groups,
    filter,
    period,
}: {
    groups: { label: string; loans: Loan[] }[];
    filter: string;
    period: string;
}) {
    const [deleteLoanId, setDeleteLoanId] = useState(0);
    const [deleteLoanName, setDeleteLoanName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

    const loanStatus = useMemo(() => {
        return (loan: Loan) => {
            if (loan.returned || !loan.estimated_return_date) return null;

            const now = new Date();
            const est = new Date(loan.estimated_return_date);
            const diffMs = est.getTime() - now.getTime();
            const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

            if (diffDays < 0) return { label: `Terlambat ${Math.abs(diffDays)} hari`, variant: 'destructive' as const };
            if (diffDays === 0) return { label: 'H-0 (Segera)', variant: 'secondary' as const };
            if (diffDays === 1) return { label: 'H-1 (Segera)', variant: 'secondary' as const };

            return { label: `Aman (sisa ${diffDays} hari)`, variant: 'default' as const };
        };
    }, []);

    const loanDuration = useMemo(() => {
        return (loan: Loan) => {
            const from = new Date(loan.borrower_date);
            const to = loan.returned ? new Date(loan.returned) : new Date();
            const diffMs = to.getTime() - from.getTime();
            const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

            if (loan.estimated_return_date && !loan.returned) {
                const est = new Date(loan.estimated_return_date);
                const estDiffMs = est.getTime() - from.getTime();
                const estDays = Math.ceil(estDiffMs / (1000 * 60 * 60 * 24));
                return `Hari ke-${diffDays} dari ${estDays} hari`;
            }

            return `${diffDays} hari`;
        };
    }, []);

    const handleDelete = () => {
        router.delete(destroy(deleteLoanId));
        setDeleteLoanId(0);
        setDeleteLoanName('');
    };

    const handleReturn = (loanId: number) => {
        router.put(returnMethod.url(loanId));
    };

    const toggleGroup = (label: string) => {
        setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Loans Index" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Table Loans</h3>
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <Button
                                key={tab.value}
                                variant={filter === tab.value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(index(), { filter: tab.value, period }, { preserveState: true, preserveScroll: true })}
                            >
                                {tab.label}
                            </Button>
                        ))}
                        <span className="mx-1 text-muted-foreground">|</span>
                        {periods.map((p) => (
                            <Button
                                key={p.value}
                                variant={period === p.value ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => router.get(index(), { filter, period: p.value }, { preserveState: true, preserveScroll: true })}
                            >
                                {p.label}
                            </Button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <a href={pdf.url({ period })} target="_blank">
                            <Button type="button" variant="outline" size="sm">
                                <FileText className="mr-1 size-4" />
                                Download PDF
                            </Button>
                        </a>
                        <Link href={create()}>
                            Add loan
                        </Link>
                    </div>
                </div>

                {groups.length === 0 && (
                    <div className="py-12 text-center text-muted-foreground">No loans found.</div>
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
                                                <TableHead>Status</TableHead>
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
                                                    <TableCell>{loanDuration(loan)}</TableCell>
                                                    <TableCell>
                                                        {(() => {
                                                            const status = loanStatus(loan);
                                                            if (!status) return '-';
                                                            return <Badge variant={status.variant}>{status.label}</Badge>;
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
                                                                <DropdownMenuGroup>
                                                                    <DropdownMenuLabel>
                                                                        <Link
                                                                            href={edit(loan.id)}
                                                                            className="flex gap-4"
                                                                        >
                                                                            <SquarePen className="my-auto" size={16} />{' '}
                                                                            Edit
                                                                        </Link>
                                                                    </DropdownMenuLabel>
                                                                    {!loan.returned && (
                                                                        <DropdownMenuItem
                                                                            onSelect={() => handleReturn(loan.id)}
                                                                        >
                                                                            <ArrowLeftRight className="my-auto" size={16} />{' '}
                                                                            Return
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                </DropdownMenuGroup>
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
