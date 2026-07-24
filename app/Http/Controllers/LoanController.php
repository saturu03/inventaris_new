<?php

namespace App\Http\Controllers;

use App\Models\HomeroomTeacher;
use App\Models\Item;
use App\Models\Loan;
use App\Models\Student;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanController extends Controller
{
    private function groupByPeriod($loans, string $period, string $dateField = 'borrower_date'): array
    {
        $groups = [];

        foreach ($loans as $loan) {
            $date = $loan->$dateField ? Carbon::parse($loan->$dateField) : null;

            if (! $date) {
                continue;
            }

            $key = match ($period) {
                'week' => $date->startOfWeek()->format('Y-m-d'),
                'month' => $date->format('Y-m'),
                'year' => $date->format('Y'),
                default => $date->format('Y-m-d'),
            };

            $label = match ($period) {
                'week' => $date->startOfWeek()->format('d M').' - '.$date->copy()->endOfWeek()->format('d M Y'),
                'month' => $date->format('F Y'),
                'year' => $date->format('Y'),
                default => $date->format('l, d F Y'),
            };

            if (! isset($groups[$key])) {
                $groups[$key] = ['label' => $label, 'loans' => []];
            }

            $groups[$key]['loans'][] = $loan;
        }

        krsort($groups);

        return array_values($groups);
    }

    public function index(Request $request)
    {
        $filter = $request->query('filter', 'all');
        $period = $request->query('period', 'day');

        $loans = Loan::with(['item', 'student', 'userOut', 'userIn'])
            ->when($filter === 'borrowed', fn ($q) => $q->whereNull('returned'))
            ->when($filter === 'returned', fn ($q) => $q->whereNotNull('returned'))
            ->get();

        $groups = $this->groupByPeriod($loans, $period, 'borrower_date');

        return Inertia::render('Loans/Index', [
            'groups' => $groups,
            'filter' => $filter,
            'period' => $period,
        ]);
    }

    public function returned()
    {
        $period = request()->query('period', 'day');

        $loans = Loan::with(['item', 'student', 'userOut', 'userIn'])
            ->whereNotNull('returned')
            ->get();

        $groups = $this->groupByPeriod($loans, $period, 'returned');

        return Inertia::render('Loans/Returned', [
            'groups' => $groups,
            'period' => $period,
        ]);
    }

    public function create()
    {
        $items = Item::all();
        $students = Student::all();

        return Inertia::render('Loans/Create', [
            'items' => $items,
            'students' => $students,
        ]);
    }

    public function store(Request $request)
    {
        $request->merge([
            'estimated_return_date' => $request->estimated_return_date ?: null,
        ]);

        $borrowerDate = Carbon::parse($request->borrower_date);
        if ($borrowerDate->hour >= 18) {
            return redirect()->back()->withErrors([
                'borrower_date' => 'Peminjaman tidak bisa dilakukan setelah jam 18:00.',
            ])->withInput();
        }

        $request->validate([
            'entries' => 'required|array|min:1',
            'entries.*.student_id' => 'nullable|exists:students,id',
            'entries.*.borrower_name' => 'required|string|max:255',
            'entries.*.item_ids' => 'required|array|min:1',
            'entries.*.item_ids.*' => 'exists:items,id',
            'borrower_role' => 'required|string|max:255',
            'collateral_type' => 'required|string|max:255',
            'borrower_date' => 'required|date',
            'estimated_return_date' => 'nullable|date',
        ]);

        // Auto-calculate estimated_return_date based on borrower_role
        $borrowerRole = $request->borrower_role;
        $borrowerCarbon = Carbon::parse($request->borrower_date);

        if ($borrowerRole === 'student') {
            // Student: deadline jam 17:00 hari yang sama
            $estimatedReturn = $borrowerCarbon->copy()->setTime(17, 0, 0);
        } else {
            // Non-student: gunakan input dari user (bebas)
            $estimatedReturn = $request->estimated_return_date
                ? Carbon::parse($request->estimated_return_date)
                : $borrowerCarbon->copy()->addDays(3);
        }

        $allItemIds = collect($request->entries)->pluck('item_ids')->flatten()->unique();
        $inavailable = Item::whereIn('id', $allItemIds)->where('status', '!=', 'available')->pluck('id');

        if ($inavailable->isNotEmpty()) {
            $items = Item::whereIn('id', $inavailable)->pluck('name', 'id');

            return redirect()->back()->withErrors([
                'items_unavailable' => 'Some items are not available: '.$items->implode(', '),
            ])->withInput();
        }

        $now = now();
        $itemIds = [];
        $loans = [];

        $limitedItemIds = Item::whereIn('id', $allItemIds)->where('is_limited', true)->pluck('id')->toArray();

        foreach ($request->entries as $entry) {
            foreach ($entry['item_ids'] as $itemId) {
                $isLimited = in_array($itemId, $limitedItemIds);
                $loans[] = [
                    'item_id' => $itemId,
                    'user_out_id' => $request->user()->id,
                    'student_id' => $entry['student_id'] ?: null,
                    'borrower_name' => $entry['borrower_name'],
                    'borrower_role' => $request->borrower_role,
                    'collateral_type' => $request->collateral_type,
                    'borrower_date' => $request->borrower_date,
                    'estimated_return_date' => $estimatedReturn->format('Y-m-d H:i:s'),
                    'approval_status' => $isLimited ? 'pending' : 'none',
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
                $itemIds[] = $itemId;
            }
        }

        Loan::insert($loans);

        $nonLimitedIds = array_diff($itemIds, $limitedItemIds);
        Item::whereIn('id', $nonLimitedIds)->where('status', 'available')->update(['status' => 'inavailable']);

        $message = 'Loan(s) created successfully.';
        if (! empty($limitedItemIds)) {
            $message = 'Loan(s) created. Limited items are pending approval.';
        }

        return redirect()->route('loans.index')->with('success', $message);
    }

    public function edit(Loan $loan)
    {
        $items = Item::all();
        $students = Student::all();

        return Inertia::render('Loans/Edit', [
            'loan' => $loan->load(['item', 'student', 'userOut', 'userIn']),
            'items' => $items,
            'students' => $students,
        ]);
    }

    public function update(Request $request, Loan $loan)
    {
        $request->merge([
            'estimated_return_date' => $request->estimated_return_date ?: null,
        ]);

        $request->validate([
            'item_id' => 'required|exists:items,id',
            'student_id' => 'nullable|exists:students,id',
            'borrower_name' => 'required|string|max:255',
            'borrower_role' => 'required|string|max:255',
            'collateral_type' => 'required|string|max:255',
            'borrower_date' => 'required|date',
            'estimated_return_date' => 'nullable|date|after_or_equal:borrower_date',
        ]);

        $loan->update([
            'item_id' => $request->item_id,
            'student_id' => $request->student_id,
            'borrower_name' => $request->borrower_name,
            'borrower_role' => $request->borrower_role,
            'collateral_type' => $request->collateral_type,
            'borrower_date' => $request->borrower_date,
            'estimated_return_date' => $request->estimated_return_date,
        ]);

        return redirect()->route('loans.index')->with('success', 'Loan updated successfully.');
    }

    public function destroy(Loan $loan)
    {
        Item::where('id', $loan->item_id)->where('status', 'inavailable')->update(['status' => 'available']);
        $loan->delete();

        return redirect()->route('loans.index')->with('success', 'Loan deleted successfully.');
    }

    public function return(Loan $loan)
    {
        $loan->update([
            'returned' => now(),
            'user_in_id' => request()->user()->id,
        ]);

        Item::where('id', $loan->item_id)->update(['status' => 'available']);

        return redirect()->route('loans.index')->with('success', 'Item returned successfully.');
    }

    public function exportPdf(Request $request)
    {
        $period = $request->query('period', 'day');

        $borrowed = Loan::with(['item', 'student.class', 'student.major', 'userOut', 'userIn'])
            ->whereNull('returned')
            ->get();

        $returned = Loan::with(['item', 'student.class', 'student.major', 'userOut', 'userIn'])
            ->whereNotNull('returned')
            ->get();

        $borrowedGroups = $this->groupByPeriod($borrowed, $period, 'borrower_date');
        $returnedGroups = $this->groupByPeriod($returned, $period, 'returned');

        $pdf = Pdf::loadView('pdfs.loans', [
            'borrowedGroups' => $borrowedGroups,
            'returnedGroups' => $returnedGroups,
            'period' => $period,
        ]);

        return $pdf->download('all-loans.pdf');
    }

    public function overdueLetter()
    {
        $overdueLoans = Loan::with(['item', 'student.class', 'student.major', 'userOut'])
            ->whereNull('returned')
            ->whereNotNull('estimated_return_date')
            ->whereDate('estimated_return_date', '<', now()->format('Y-m-d'))
            ->get();

        $homeroomTeachers = HomeroomTeacher::with(['major', 'class'])->get();

        $grouped = $overdueLoans->groupBy(function ($loan) {
            $majorAlias = $loan->student?->major?->alias ?? 'Lainnya';
            $classLevel = $loan->student?->class?->level ?? '';

            return $majorAlias.'|'.$classLevel;
        });

        $sections = $grouped->mapWithKeys(function ($loans, $key) use ($homeroomTeachers) {
            [$major, $classLevel] = explode('|', $key);
            $label = $major.' Kelas '.$classLevel;

            $teacher = $homeroomTeachers->first(
                fn ($t) => $t->major?->alias === $major && $t->class?->level === $classLevel
            );

            return [$label => [
                'major' => $major,
                'classLevel' => $classLevel,
                'homeroomTeacher' => $teacher,
                'loans' => $loans,
            ]];
        })->filter(fn ($section) => $section['loans']->isNotEmpty());

        $pdf = Pdf::loadView('pdfs.overdue-letter', [
            'sections' => $sections,
            'date' => now()->format('d F Y'),
            'userName' => auth()->user()?->name,
        ]);

        return $pdf->download('surat-panggilan-overdue.pdf');
    }
}
