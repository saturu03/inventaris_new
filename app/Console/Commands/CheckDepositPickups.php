<?php

namespace App\Console\Commands;

use App\Models\Deposit;
use App\Notifications\DepositPickupReminder;
use Illuminate\Console\Command;

class CheckDepositPickups extends Command
{
    protected $signature = 'deposits:check-pickups';

    protected $description = 'Send reminders for deposits due for pickup tomorrow';

    public function handle(): void
    {
        $tomorrow = now()->addDay()->startOfDay();

        $deposits = Deposit::with('user')
            ->where('status', 'deposited')
            ->whereNotNull('estimated_pickup_date')
            ->whereDate('estimated_pickup_date', $tomorrow)
            ->get();

        foreach ($deposits as $deposit) {
            if ($deposit->user) {
                $deposit->user->notify(new DepositPickupReminder($deposit));
                $this->info("Reminder sent for deposit #{$deposit->id} ({$deposit->depositor_name})");
            }
        }

        if ($deposits->isEmpty()) {
            $this->info('No deposits due for pickup tomorrow.');
        }
    }
}
