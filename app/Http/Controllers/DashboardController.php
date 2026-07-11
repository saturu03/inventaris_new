<?php

namespace App\Http\Controllers;

use App\Models\Deposit;
use App\Models\Item;
use App\Models\Loan;
use App\Models\Student;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalItems = Item::count();
        $availableItems = Item::where('status', 'available')->count();
        $borrowedItems = Item::where('status', 'inavailable')->count();

        $totalStudents = Student::count();

        $activeLoans = Loan::whereNull('returned')->count();
        $returnedLoans = Loan::whereNotNull('returned')->count();
        $overdueLoans = Loan::whereNull('returned')
            ->where('estimated_return_date', '<', now())
            ->count();

        $activeDeposits = Deposit::where('status', 'deposited')->count();
        $pickedUpDeposits = Deposit::where('status', 'picked_up')->count();

        $recentLoans = Loan::with(['item', 'student'])
            ->latest('borrower_date')
            ->take(5)
            ->get()
            ->map(fn ($loan) => [
                'id' => $loan->id,
                'item_name' => $loan->item->name,
                'borrower_name' => $loan->borrower_name,
                'student_name' => $loan->student?->name,
                'borrower_date' => $loan->borrower_date->format('d M Y H:i'),
                'estimated_return_date' => $loan->estimated_return_date?->format('d M Y'),
                'returned' => $loan->returned?->format('d M Y H:i'),
                'is_overdue' => $loan->estimated_return_date && $loan->estimated_return_date->isPast() && ! $loan->returned,
            ]);

        return Inertia::render('dashboard', [
            'stats' => [
                'items' => [
                    'total' => $totalItems,
                    'available' => $availableItems,
                    'borrowed' => $borrowedItems,
                ],
                'students' => $totalStudents,
                'loans' => [
                    'active' => $activeLoans,
                    'returned' => $returnedLoans,
                    'overdue' => $overdueLoans,
                ],
                'deposits' => [
                    'active' => $activeDeposits,
                    'picked_up' => $pickedUpDeposits,
                ],
            ],
            'recentLoans' => $recentLoans,
        ]);
    }
}
