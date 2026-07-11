<?php

namespace App\Http\Controllers;

use App\Models\Classlevel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClasslevelController extends Controller
{
    public function index(Request $request)
    {
        $classes = Classlevel::all();

        return Inertia::render('Classlevels/Index', [
            'classes' => $classes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Classlevels/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'level' => 'required|in:10,11,12',
        ]);

        Classlevel::create([
            'level' => $request->level,
        ]);

        return redirect()->route('classlevels.index')->with('success', 'Class created successfully.');
    }

    public function edit(Classlevel $classlevel)
    {
        return Inertia::render('Classlevels/Edit', [
            'classlevel' => $classlevel,
        ]);
    }

    public function update(Request $request, Classlevel $classlevel)
    {
        $request->validate([
            'level' => 'required|in:10,11,12',
        ]);

        $classlevel->update([
            'level' => $request->level,
        ]);

        return redirect()->route('classlevels.index')->with('success', 'Class updated successfully.');
    }

    public function destroy(Classlevel $classlevel)
    {
        $classlevel->delete();

        return redirect()->route('classlevels.index')->with('success', 'Class deleted successfully.');
    }
}
