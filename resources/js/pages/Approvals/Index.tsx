import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { index as loansIndex } from '@/routes/loans';
import type { BreadcrumbItem, Loan } from '@/types';
import { formatDateTime } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Persetujuan Peminjaman', href: '/loans/approvals' },
];

export default function ApprovalsIndex({ loans }: { loans: Loan[] }) {
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
    const [action, setAction] = useState<'approve' | 'reject'>('approve');
    const [note, setNote] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    const handleOpen = (loan: Loan, type: 'approve' | 'reject') => {
        setSelectedLoan(loan);
        setAction(type);
        setNote('');
        setShowDialog(true);
    };

    const handleConfirm = () => {
        if (!selectedLoan) return;

        if (action === 'approve') {
            router.put(`/loans/${selectedLoan.id}/approve`, { approval_note: note }, { onSuccess: () => setShowDialog(false) });
        } else {
            router.put(`/loans/${selectedLoan.id}/reject`, { approval_note: note }, { onSuccess: () => setShowDialog(false) });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Persetujuan Peminjaman" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Persetujuan Peminjaman</h3>
                    <a href={loansIndex()}>
                        <Button variant="outline" size="sm">Kembali ke Peminjaman</Button>
                    </a>
                </div>

                {loans.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                        <Clock className="mb-3 size-10 opacity-40" />
                        <p>Tidak ada peminjaman yang menunggu persetujuan.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {loans.map((loan) => (
                            <div key={loan.id} className="flex flex-col rounded-xl border bg-card p-4 shadow-sm">
                                <div className="mb-3 flex items-start justify-between">
                                    <h5 className="text-base font-semibold text-card-foreground">
                                        {loan.item.name}
                                    </h5>
                                    <Badge variant="outline" className="border-amber-400 text-amber-700 dark:border-amber-500 dark:text-amber-300">
                                        <Clock className="mr-1 size-3" />
                                        Pending
                                    </Badge>
                                </div>

                                <div className="mb-4 flex-1 space-y-1.5 text-sm text-muted-foreground">
                                    <div className="flex justify-between">
                                        <span>Peminjam</span>
                                        <span className="font-medium text-card-foreground">{loan.borrower_name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Dipinjam oleh</span>
                                        <span className="font-medium text-card-foreground">{loan.user_out?.name ?? '-'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tanggal Pinjam</span>
                                        <span className="font-medium text-card-foreground">{formatDateTime(loan.borrower_date)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Estimasi Kembali</span>
                                        <span className="font-medium text-card-foreground">{formatDateTime(loan.estimated_return_date)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Jaminan</span>
                                        <span className="font-medium text-card-foreground">{loan.collateral_type}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 border-t pt-3">
                                    <button
                                        onClick={() => handleOpen(loan, 'approve')}
                                        className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md bg-emerald-100 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-800"
                                    >
                                        <CheckCircle size={14} />
                                        Setujui
                                    </button>
                                    <button
                                        onClick={() => handleOpen(loan, 'reject')}
                                        className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md bg-red-100 text-sm font-medium text-red-700 transition-colors hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                                    >
                                        <XCircle size={14} />
                                        Tolak
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {action === 'approve' ? 'Setujui Peminjaman?' : 'Tolak Peminjaman?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {selectedLoan && (
                                <>
                                    Peminjaman <strong>{selectedLoan.item.name}</strong> oleh <strong>{selectedLoan.borrower_name}</strong>.
                                </>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor="approval_note">
                            {action === 'reject' ? 'Alasan penolakan (wajib)' : 'Catatan (opsional)'}
                        </Label>
                        <Textarea
                            id="approval_note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder={action === 'approve' ? 'Catatan untuk peminjam...' : 'Tulis alasan penolakan...'}
                            rows={3}
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            variant={action === 'approve' ? 'default' : 'destructive'}
                            onClick={handleConfirm}
                            disabled={action === 'reject' && !note.trim()}
                        >
                            {action === 'approve' ? 'Setujui' : 'Tolak'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
