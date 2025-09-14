<?php

namespace App\Http\Controllers;

use App\Models\Download;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DownloadController extends Controller
{
    /**
     * Display a listing of downloads.
     */
    public function index(Request $request)
    {
        $query = Download::active();

        if ($request->has('category') && $request->category) {
            $query->byCategory($request->category);
        }

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $downloads = $query->latest()->paginate(12);

        return Inertia::render('downloads/index', [
            'downloads' => $downloads,
            'filters' => [
                'category' => $request->category,
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Display the specified download (handles file serving).
     */
    public function show(Download $download)
    {
        if (!$download->is_active) {
            abort(404);
        }

        // Increment download count
        $download->incrementDownloadCount();

        // In a real application, you would serve the actual file
        // For now, we'll just redirect back with a message
        return redirect()->back()->with('success', 'Download dimulai: ' . $download->title);
    }
}