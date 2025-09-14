<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreWorkProgramRequest;
use App\Http\Requests\Admin\UpdateWorkProgramRequest;
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

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('academic_year') && $request->academic_year) {
            $query->byYear($request->academic_year);
        }

        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        if ($request->has('status') && $request->status) {
            $query->byStatus($request->status);
        }

        if ($request->has('featured')) {
            if ($request->featured === 'yes') {
                $query->featured();
            } elseif ($request->featured === 'no') {
                $query->where('is_featured', false);
            }
        }

        $programs = $query->latest()->paginate(20);

        return Inertia::render('admin/work-programs/index', [
            'programs' => $programs,
            'filters' => [
                'search' => $request->search,
                'academic_year' => $request->academic_year,
                'category' => $request->category,
                'status' => $request->status,
                'featured' => $request->featured,
            ],
        ]);
    }

    /**
     * Show the form for creating a new work program.
     */
    public function create()
    {
        return Inertia::render('admin/work-programs/create');
    }

    /**
     * Store a newly created work program.
     */
    public function store(StoreWorkProgramRequest $request)
    {
        $data = $request->validated();
        
        $workProgram = WorkProgram::create($data);

        return redirect()->route('admin.work-programs.index')
            ->with('success', 'Program kerja berhasil ditambahkan.');
    }

    /**
     * Display the specified work program.
     */
    public function show(WorkProgram $workProgram)
    {
        return Inertia::render('admin/work-programs/show', [
            'program' => $workProgram,
        ]);
    }

    /**
     * Show the form for editing the specified work program.
     */
    public function edit(WorkProgram $workProgram)
    {
        return Inertia::render('admin/work-programs/edit', [
            'program' => $workProgram,
        ]);
    }

    /**
     * Update the specified work program.
     */
    public function update(UpdateWorkProgramRequest $request, WorkProgram $workProgram)
    {
        $data = $request->validated();
        
        $workProgram->update($data);

        return redirect()->route('admin.work-programs.index')
            ->with('success', 'Program kerja berhasil diperbarui.');
    }

    /**
     * Remove the specified work program.
     */
    public function destroy(WorkProgram $workProgram)
    {
        $workProgram->delete();

        return redirect()->route('admin.work-programs.index')
            ->with('success', 'Program kerja berhasil dihapus.');
    }
}