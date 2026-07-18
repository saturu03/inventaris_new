import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeftRight, ChevronDown, ChevronRight, FileText, Plus, SquarePen, Trash2 } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { index, create, edit, destroy, pdf, returnMethod } from '@/routes/loans';
import { useLanguage } from '@/contexts/language-context';
import type { BreadcrumbItem, Loan } from '@/types';

function statusBadge(loan: Loan, t: (key: string, params?: Record<string, string | number>) => string) {
    if (loan.returned || !loan.estimated_return_date) return null;

    const now = new Date();
    const est = new Date(loan.estimated_return_date);
    const diffMs = est.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return <Badge variant="destructive">{t('overdueDays', { n: Math.abs(diffDays) })}</Badge>;
    if (diffDays <= 1) return <Badge variant="secondary">{t('urgentDays', { n: diffDays })}</Badge>;
    return <Badge variant="default">{t('safeDays', { n: diffDays })}</Badge>;
}

function loanDuration(loan: Loan, t: (key: string, params?: Record<string, string | number>) => string) {
    const from = new Date(loan.borrower_date);
    const to = loan.returned ? new Date(loan.returned) : new Date();
    const diffMs = to.getTime() - from.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (loan.estimated_return_date && !loan.returned) {
        const est = new Date(loan.estimated_return_date);
        const estDiffMs = est.getTime() - from.getTime();
        const estDays = Math.ceil(estDiffMs / (1000 * 60 * 60 * 24));
        return t('dayOf', { n: diffDays, m: estDays });
    }

    return `${diffDays} days`;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Loans', href: index() },
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

    const { t } = useLanguage();

    const tabs = [
        { label: t('all'), value: 'all' },
        { label: t('borrowed'), value: 'borrowed' },
    ];

    const periods = [
        { label: t('day'), value: 'day' },
        { label: t('week'), value: 'week' },
        { label: t('month'), value: 'month' },
        { label: t('year'), value: 'year' },
    ];

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
            <Head title="Manage Loans" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-medium">Manage Loans</h3>
                    <div className="flex gap-2">
                        <a href={pdf.url({ period })} target="_blank">
                            <Button type="button" variant="outline" size="sm">
                                <FileText className="mr-1 size-4" />
                                PDF
                            </Button>
                        </a>
                        <Link
                            href={create()}
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                        >
                            <Plus size={16} />
                            Add Loan
                        </Link>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
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

                {groups.length === 0 && (
                    <div className="py-12 text-center text-muted-foreground">{t('noDataFound')}</div>
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
                                    {t('loanCount', { n: group.loans.length })}
                                </span>
                            </button>

                            {isExpanded && (
                                <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {group.loans.map((loan) => (
                                        <div key={loan.id} className="flex flex-col rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
                                            <div className="mb-3 flex items-start justify-between">
                                                <h5 className="text-base font-semibold text-card-foreground">
                                                    {loan.item.name}
                                                </h5>
                                                {statusBadge(loan, t)}
                                            </div>

                                            <div className="mb-3 flex-1 space-y-1.5 text-sm text-muted-foreground">
                                                <div className="flex justify-between">
                                                    <span>{t('borrower')}</span>
                                                    <span className="font-medium text-card-foreground">{loan.borrower_name}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>{t('lentBy')}</span>
                                                    <span className="font-medium text-card-foreground">{loan.user_out?.name ?? '-'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>{t('borrowDate')}</span>
                                                    <span className="font-medium text-card-foreground">{loan.borrower_date}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>{t('estimatedReturn')}</span>
                                                    <span className="font-medium text-card-foreground">{loan.estimated_return_date ?? '-'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>{t('duration')}</span>
                                                    <span className="font-medium text-card-foreground">{loanDuration(loan, t)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>{t('returnedStatus')}</span>
                                                    <span className="font-medium text-card-foreground">{loan.returned ?? '-'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>{t('receivedBy')}</span>
                                                    <span className="font-medium text-card-foreground">{loan.user_in?.name ?? '-'}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 border-t pt-3">
                                                <Link
                                                    href={edit(loan.id)}
                                                    className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md bg-gray-100 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-100 hover:text-indigo-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-indigo-900 dark:hover:text-indigo-300"
                                                >
                                                    <SquarePen size={14} />
                                                    {t('edit')}
                                                </Link>
                                                {!loan.returned && (
                                                    <button
                                                        onClick={() => handleReturn(loan.id)}
                                                        className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md bg-gray-100 text-sm font-medium text-gray-700 transition-colors hover:bg-emerald-100 hover:text-emerald-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-emerald-900 dark:hover:text-emerald-300"
                                                    >
                                                        <ArrowLeftRight size={14} />
                                                        {t('returnBtn')}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        setDeleteLoanId(loan.id);
                                                        setDeleteLoanName(loan.borrower_name);
                                                        setShowAlert(true);
                                                    }}
                                                    className="inline-flex h-8 items-center justify-center rounded-md bg-gray-100 px-2 text-gray-700 transition-colors hover:bg-red-100 hover:text-red-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-red-900 dark:hover:text-red-300"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
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
                            {t('areYouSureDelete', { name: deleteLoanName })}
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
