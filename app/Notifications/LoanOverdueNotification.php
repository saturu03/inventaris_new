<?php

namespace App\Notifications;

use App\Models\Loan;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class LoanOverdueNotification extends Notification
{
    use Queueable;

    public Loan $loan;

    public function __construct(Loan $loan)
    {
        $this->loan = $loan;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'loan_id' => $this->loan->id,
            'title' => 'Peminjaman Terlambat',
            'message' => "Peminjaman atas nama {$this->loan->borrower_name} sudah melewati batas waktu pengembalian.",
            'borrower_name' => $this->loan->borrower_name,
            'estimated_return_date' => $this->loan->estimated_return_date?->format('d M Y'),
            'days_overdue' => now()->diffInDays($this->loan->estimated_return_date),
        ];
    }
}
