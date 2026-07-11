<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Loan;
use App\Models\Student;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class LoanSeeder extends Seeder
{
    public function run(): void
    {
        $staff = User::where('role', 'staff')->first() ?? User::factory()->create(['role' => 'staff']);
        $students = Student::all();

        if ($students->isEmpty()) {
            return;
        }

        $inavailableItems = Item::where('status', 'inavailable')->get();
        $availableItems = Item::where('status', 'available')->get();

        $loansData = [];

        if ($inavailableItems->isNotEmpty()) {
            foreach ($inavailableItems as $item) {
                $student = $students->random();
                $loansData[] = [
                    'item_id' => $item->id,
                    'user_out_id' => $staff->id,
                    'user_in_id' => null,
                    'student_id' => $student->id,
                    'borrower_name' => $student->name,
                    'borrower_role' => 'student',
                    'collateral_type' => 'Kartu Pelajar',
                    'borrower_date' => Carbon::now()->subDays(rand(1, 5)),
                    'estimated_return_date' => Carbon::now()->addDays(rand(1, 7)),
                    'returned' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        if ($availableItems->isNotEmpty()) {
            $returnedCount = min(3, $availableItems->count());
            $itemsForReturned = $availableItems->random($returnedCount);

            foreach ($itemsForReturned as $item) {
                $student = $students->random();
                $item->update(['status' => 'inavailable']);

                $loansData[] = [
                    'item_id' => $item->id,
                    'user_out_id' => $staff->id,
                    'user_in_id' => $staff->id,
                    'student_id' => $student->id,
                    'borrower_name' => $student->name,
                    'borrower_role' => 'student',
                    'collateral_type' => 'Kartu Pelajar',
                    'borrower_date' => Carbon::now()->subDays(rand(3, 10)),
                    'estimated_return_date' => Carbon::now()->subDays(rand(1, 3)),
                    'returned' => Carbon::now()->subDay(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        if (! empty($loansData)) {
            Loan::insert($loansData);
        }
    }
}
