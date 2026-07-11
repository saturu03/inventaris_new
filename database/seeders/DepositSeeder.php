<?php

namespace Database\Seeders;

use App\Models\Deposit;
use App\Models\DepositItem;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DepositSeeder extends Seeder
{
    public function run(): void
    {
        $staff = User::where('role', 'staff')->first() ?? User::factory()->create(['role' => 'staff']);

        $deposit = Deposit::create([
            'depositor_name' => 'Budi Santoso',
            'depositor_phone' => '081234567890',
            'deposit_date' => Carbon::now()->subDays(2),
            'estimated_pickup_date' => Carbon::now()->addDays(5),
            'pickup_date' => null,
            'status' => 'deposited',
            'notes' => 'Titipan barang praktik',
            'user_id' => $staff->id,
        ]);

        DepositItem::create([
            'deposit_id' => $deposit->id,
            'item_name' => 'Laptop Asus ROG',
            'quantity' => 1,
            'notes' => 'Dalam kondisi baik',
        ]);

        DepositItem::create([
            'deposit_id' => $deposit->id,
            'item_name' => 'Charger Laptop',
            'quantity' => 1,
            'notes' => null,
        ]);

        $pickedDeposit = Deposit::create([
            'depositor_name' => 'Siti Aminah',
            'depositor_phone' => '081298765432',
            'deposit_date' => Carbon::now()->subDays(10),
            'estimated_pickup_date' => Carbon::now()->subDays(3),
            'pickup_date' => Carbon::now()->subDays(3),
            'status' => 'picked_up',
            'notes' => 'Titipan barang lomba',
            'user_id' => $staff->id,
        ]);

        DepositItem::create([
            'deposit_id' => $pickedDeposit->id,
            'item_name' => 'Kamera DSLR Canon',
            'quantity' => 1,
            'notes' => null,
        ]);

        DepositItem::create([
            'deposit_id' => $pickedDeposit->id,
            'item_name' => 'Tripod',
            'quantity' => 2,
            'notes' => 'Satu tripod kecil, satu besar',
        ]);
    }
}
