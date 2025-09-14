<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDownloadRequest;
use App\Http\Requests\Admin\UpdateDownloadRequest;
use App\Models\Download;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DownloadController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(private FileUploadService $fileUploadService)
    {
    }
    /**
     * Display a listing of downloads.
     */
    public function index(Request $request)
    {
        $query = Download::query();

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('category') && $request->category) {
            $query->byCategory($request->category);
        }

        if ($request->has('status')) {
            if ($request->status === 'active') {
                $query->active();
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        $downloads = $query->latest()->paginate(20);

        return Inertia::render('admin/downloads/index', [
            'downloads' => $downloads,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new download.
     */
    public function create()
    {
        return Inertia::render('admin/downloads/create');
    }

    /**
     * Store a newly created download.
     */
    public function store(StoreDownloadRequest $request)
    {
        $data = $request->validated();
        
        // Handle file upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->store('downloads', 'public');
            
            $data['file_path'] = $path;
            $data['file_type'] = $file->getClientMimeType();
            $data['file_size'] = $this->fileUploadService->getFileSize($file);
            $data['download_count'] = 0;
        }

        // Remove the 'file' field from data
        unset($data['file']);

        $download = Download::create($data);

        return redirect()->route('admin.downloads.index')
            ->with('success', 'File download berhasil ditambahkan.');
    }

    /**
     * Display the specified download.
     */
    public function show(Download $download)
    {
        return Inertia::render('admin/downloads/show', [
            'download' => $download,
        ]);
    }

    /**
     * Show the form for editing the specified download.
     */
    public function edit(Download $download)
    {
        return Inertia::render('admin/downloads/edit', [
            'download' => $download,
        ]);
    }

    /**
     * Update the specified download.
     */
    public function update(UpdateDownloadRequest $request, Download $download)
    {
        $data = $request->validated();
        
        // Handle file upload if new file is provided
        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($download->file_path) {
                Storage::disk('public')->delete($download->file_path);
            }
            
            $file = $request->file('file');
            $path = $file->store('downloads', 'public');
            
            $data['file_path'] = $path;
            $data['file_type'] = $file->getClientMimeType();
            $data['file_size'] = $this->fileUploadService->getFileSize($file);
        }

        // Remove the 'file' field from data
        unset($data['file']);

        $download->update($data);

        return redirect()->route('admin.downloads.index')
            ->with('success', 'File download berhasil diperbarui.');
    }

    /**
     * Remove the specified download.
     */
    public function destroy(Download $download)
    {
        // Delete associated file
        if ($download->file_path) {
            Storage::disk('public')->delete($download->file_path);
        }

        $download->delete();

        return redirect()->route('admin.downloads.index')
            ->with('success', 'File download berhasil dihapus.');
    }


}