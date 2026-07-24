<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Loan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApprovalController extends Controller
{
    public function index()
    {
        $loans = Loan::with(['item', 'student', 'userOut', 'approvedBy'])
            ->where('approval_status', 'pending')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Approvals/Index', [
            'loans' => $loans,
        ]);
    }

    public function approve(Request $request, Loan $loan)
    {
        $request->validate([
            'approval_note' => 'nullable|string|max:500',
        ]);

        $loan->update([
            'approval_status' => 'approved',
            'approval_note' => $request->approval_note,
            'approved_by' => $request->user()->id,
            'approved_at' => now(),
        ]);

        Item::where('id', $loan->item_id)->where('status', 'available')->update(['status' => 'inavailable']);

        return redirect()->route('approvals.index')->with('success', 'Peminjaman disetujui.');
    }

    public function reject(Request $request, Loan $loan)
    {
        $request->validate([
            'approval_note' => 'required|string|max:500',
        ]);

        $loan->update([
            'approval_status' => 'rejected',
            'approval_note' => $request->approval_note,
            'approved_by' => $request->user()->id,
            'approved_at' => now(),
        ]);

        return redirect()->route('approvals.index')->with('success', 'Peminjaman ditolak.');
    }
}
