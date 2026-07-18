<?php

namespace App\Http\Controllers;

use App\Models\Classlevel;
use App\Models\HomeroomTeacher;
use App\Models\Major;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeroomTeacherController extends Controller
{
    public function index(Request $request)
    {
        $homeroomTeachers = HomeroomTeacher::with(['major', 'class'])->latest()->get();

        return Inertia::render('HomeroomTeachers/Index', [
            'homeroomTeachers' => $homeroomTeachers,
        ]);
    }

    public function create()
    {
        return Inertia::render('HomeroomTeachers/Create', [
            'classLevels' => Classlevel::all(['id', 'level']),
            'majors' => Major::all(['id', 'alias', 'full_name']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'major_id' => 'required|exists:majors,id',
            'class_id' => 'required|exists:classes,id',
            'phone' => 'required|string|max:20',
        ]);

        HomeroomTeacher::create($request->all());

        return redirect()->route('homeroom-teachers.index')->with('success', 'Homeroom teacher created successfully.');
    }

    public function edit(HomeroomTeacher $homeroomTeacher)
    {
        $homeroomTeacher->load(['major', 'class']);

        return Inertia::render('HomeroomTeachers/Edit', [
            'homeroomTeacher' => $homeroomTeacher,
            'classLevels' => Classlevel::all(['id', 'level']),
            'majors' => Major::all(['id', 'alias', 'full_name']),
        ]);
    }

    public function update(Request $request, HomeroomTeacher $homeroomTeacher)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'major_id' => 'required|exists:majors,id',
            'class_id' => 'required|exists:classes,id',
            'phone' => 'required|string|max:20',
        ]);

        $homeroomTeacher->update($request->all());

        return redirect()->route('homeroom-teachers.index')->with('success', 'Homeroom teacher updated successfully.');
    }

    public function destroy(HomeroomTeacher $homeroomTeacher)
    {
        $homeroomTeacher->delete();

        return redirect()->route('homeroom-teachers.index')->with('success', 'Homeroom teacher deleted successfully.');
    }
}
