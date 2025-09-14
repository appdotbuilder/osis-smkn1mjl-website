<?php

namespace App\Http\Controllers;

use App\Models\WorkProgram;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkProgramController extends Controller
{
    /**
     * Display a listing of work programs.
     */
    public function index(Request $request)
    {
        $query = WorkProgram::query();

        if ($request->has('year') && $request->year) {
            $query->byYear($request->year);
        } else {
            $query->byYear('2024/2025'); // Default to current year
        }

        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        if ($request->has('status') && $request->status) {
            $query->byStatus($request->status);
        }

        $programs = $query->latest('start_date')->paginate(12);

        $availableYears = WorkProgram::distinct()->pluck('academic_year')->sort()->values();

        return Inertia::render('work-programs/index', [
            'programs' => $programs,
            'availableYears' => $availableYears,
            'filters' => [
                'year' => $request->year ?: '2024/2025',
                'category' => $request->category,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Display the specified work program.
     */
    public function show(WorkProgram $workProgram)
    {
        $relatedPrograms = WorkProgram::where('id', '!=', $workProgram->id)
            ->where('academic_year', $workProgram->academic_year)
            ->where('category', $workProgram->category)
            ->latest('start_date')
            ->take(3)
            ->get();

        return Inertia::render('work-programs/show', [
            'program' => $workProgram,
            'relatedPrograms' => $relatedPrograms,
        ]);
    }
}