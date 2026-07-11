<?php

namespace App\Console\Commands;

use App\Models\Loan;
use App\Models\User;
use App\Notifications\LoanOverdueNotification;
use Illuminate\Console\Command;

class CheckOverdueLoans extends Command
{
    protected $signature = 'loans:check-overdue';

    protected $description = 'Send notifications for overdue loans';

    public function handle(): void
    {
        $overdueLoans = Loan::with('item')
            ->whereNull('returned')
            ->where('estimated_return_date', '<', now())
            ->get();

        $users = User::whereIn('role', ['proktor', 'staff'])->get();

        foreach ($overdueLoans as $loan) {
            foreach ($users as $user) {
                $user->notify(new LoanOverdueNotification($loan));
            }
            $this->info("Overdue notification sent for loan #{$loan->id} ({$loan->borrower_name})");
        }

        if ($overdueLoans->isEmpty()) {
            $this->info('No overdue loans found.');
        }
    }
}
