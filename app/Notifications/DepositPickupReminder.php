<?php

namespace App\Notifications;

use App\Models\Deposit;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class DepositPickupReminder extends Notification
{
    use Queueable;

    public Deposit $deposit;

    public function __construct(Deposit $deposit)
    {
        $this->deposit = $deposit;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'deposit_id' => $this->deposit->id,
            'title' => 'Pickup Reminder',
            'message' => "Items from {$this->deposit->depositor_name} are due for pickup tomorrow.",
            'depositor_name' => $this->deposit->depositor_name,
            'estimated_pickup_date' => $this->deposit->estimated_pickup_date?->format('d M Y'),
        ];
    }
}
