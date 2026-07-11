<?php

namespace App\Http\Controllers;

use App\Models\HomeroomTeacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeroomTeacherController extends Controller
{
    public function index(Request $request)
    {
        $homeroomTeachers = HomeroomTeacher::latest()->get();

        return Inertia::render('HomeroomTeachers/Index', [
            'homeroomTeachers' => $homeroomTeachers,
        ]);
    }

    public function create()
    {
        return Inertia::render('HomeroomTeachers/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'class_level' => 'required|in:10,11,12',
            'major' => 'required|in:PPLG1,PPLG2,TKR1,TKR2,TBSM1,TBSM2,MPLB1,MPLB2',
            'phone' => 'required|string|max:20',
        ]);

        HomeroomTeacher::create($request->all());

        return redirect()->route('homeroom-teachers.index')->with('success', 'Homeroom teacher created successfully.');
    }

    public function edit(HomeroomTeacher $homeroomTeacher)
    {
        return Inertia::render('HomeroomTeachers/Edit', [
            'homeroomTeacher' => $homeroomTeacher,
        ]);
    }

    public function update(Request $request, HomeroomTeacher $homeroomTeacher)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'class_level' => 'required|in:10,11,12',
            'major' => 'required|in:PPLG1,PPLG2,TKR1,TKR2,TBSM1,TBSM2,MPLB1,MPLB2',
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
