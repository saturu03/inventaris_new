<?php

namespace App\Http\Controllers;

use App\Models\Deposit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepositController extends Controller
{
    public function index(Request $request)
    {
        $filter = $request->query('filter', 'all');

        $deposits = Deposit::with(['items', 'user'])
            ->when($filter === 'deposited', fn ($q) => $q->where('status', 'deposited'))
            ->when($filter === 'picked_up', fn ($q) => $q->where('status', 'picked_up'))
            ->latest()
            ->get();

        return Inertia::render('Deposits/Index', [
            'deposits' => $deposits,
            'filter' => $filter,
        ]);
    }

    public function create()
    {
        return Inertia::render('Deposits/Create');
    }

    public function store(Request $request)
    {
        $request->merge([
            'estimated_pickup_date' => $request->estimated_pickup_date ?: null,
        ]);

        $request->validate([
            'depositor_name' => 'required|string|max:255',
            'depositor_phone' => 'nullable|string|max:20',
            'deposit_date' => 'required|date',
            'estimated_pickup_date' => 'nullable|date|after_or_equal:deposit_date',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.item_name' => 'required|string|max:255',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.notes' => 'nullable|string|max:255',
        ]);

        $deposit = Deposit::create([
            'depositor_name' => $request->depositor_name,
            'depositor_phone' => $request->depositor_phone,
            'deposit_date' => $request->deposit_date,
            'estimated_pickup_date' => $request->estimated_pickup_date,
            'notes' => $request->notes,
            'user_id' => $request->user()->id,
            'status' => 'deposited',
        ]);

        foreach ($request->items as $item) {
            $deposit->items()->create([
                'item_name' => $item['item_name'],
                'quantity' => $item['quantity'],
                'notes' => $item['notes'] ?? null,
            ]);
        }

        return redirect()->route('deposits.index')->with('success', 'Deposit created successfully.');
    }

    public function edit(Deposit $deposit)
    {
        $deposit->load(['items', 'user']);

        return Inertia::render('Deposits/Edit', [
            'deposit' => $deposit,
        ]);
    }

    public function update(Request $request, Deposit $deposit)
    {
        $request->merge([
            'estimated_pickup_date' => $request->estimated_pickup_date ?: null,
        ]);

        $request->validate([
            'depositor_name' => 'required|string|max:255',
            'depositor_phone' => 'nullable|string|max:20',
            'deposit_date' => 'required|date',
            'estimated_pickup_date' => 'nullable|date|after_or_equal:deposit_date',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.item_name' => 'required|string|max:255',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.notes' => 'nullable|string|max:255',
        ]);

        $deposit->update([
            'depositor_name' => $request->depositor_name,
            'depositor_phone' => $request->depositor_phone,
            'deposit_date' => $request->deposit_date,
            'estimated_pickup_date' => $request->estimated_pickup_date,
            'notes' => $request->notes,
        ]);

        $deposit->items()->delete();

        foreach ($request->items as $item) {
            $deposit->items()->create([
                'item_name' => $item['item_name'],
                'quantity' => $item['quantity'],
                'notes' => $item['notes'] ?? null,
            ]);
        }

        return redirect()->route('deposits.index')->with('success', 'Deposit updated successfully.');
    }

    public function destroy(Deposit $deposit)
    {
        $deposit->delete();

        return redirect()->route('deposits.index')->with('success', 'Deposit deleted successfully.');
    }

    public function pickup(Deposit $deposit)
    {
        $deposit->update([
            'status' => 'picked_up',
            'pickup_date' => now(),
        ]);

        return redirect()->route('deposits.index')->with('success', 'Items picked up successfully.');
    }
}
