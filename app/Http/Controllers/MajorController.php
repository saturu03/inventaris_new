<?php

namespace App\Http\Controllers;

use App\Models\Major;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MajorController extends Controller
{
    public function index(Request $request)
    {
        $majors = Major::all();

        return Inertia::render('Majors/Index', [
            'majors' => $majors,
        ]);
    }

    public function create()
    {
        return Inertia::render('Majors/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'alias' => 'required|string|max:6',
        ]);

        Major::create([
            'full_name' => $request->full_name,
            'alias' => $request->alias,
        ]);

        return redirect()->route('majors.index')->with('success', 'Major created successfully.');
    }

    public function edit(Major $major)
    {
        return Inertia::render('Majors/Edit', [
            'major' => $major,
        ]);
    }

    public function update(Request $request, Major $major)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'alias' => 'required|string|max:6',
        ]);

        $major->update([
            'full_name' => $request->full_name,
            'alias' => $request->alias,
        ]);

        return redirect()->route('majors.index')->with('success', 'Major updated successfully.');
    }

    public function destroy(Major $major)
    {
        $major->delete();

        return redirect()->route('majors.index')->with('success', 'Major deleted successfully.');
    }
}
