<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreActivityRequest;
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Models\Activity;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ActivityController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(private FileUploadService $fileUploadService)
    {
    }
    /**
     * Display a listing of activities.
     */
    public function index(Request $request)
    {
        $query = Activity::query();

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('category') && $request->category) {
            $query->byCategory($request->category);
        }

        if ($request->has('featured')) {
            if ($request->featured === 'yes') {
                $query->featured();
            } elseif ($request->featured === 'no') {
                $query->where('is_featured', false);
            }
        }

        $activities = $query->latest()->paginate(20);

        return Inertia::render('admin/activities/index', [
            'activities' => $activities,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'featured' => $request->featured,
            ],
        ]);
    }

    /**
     * Show the form for creating a new activity.
     */
    public function create()
    {
        return Inertia::render('admin/activities/create');
    }

    /**
     * Store a newly created activity.
     */
    public function store(StoreActivityRequest $request)
    {
        $data = $request->validated();
        
        // Handle gallery images upload
        if ($request->hasFile('gallery_images')) {
            $data['gallery_images'] = $this->fileUploadService->uploadMultipleFiles(
                $request->file('gallery_images'),
                'activities/gallery'
            );
        }

        $activity = Activity::create($data);

        return redirect()->route('admin.activities.index')
            ->with('success', 'Kegiatan berhasil ditambahkan.');
    }

    /**
     * Display the specified activity.
     */
    public function show(Activity $activity)
    {
        return Inertia::render('admin/activities/show', [
            'activity' => $activity,
        ]);
    }

    /**
     * Show the form for editing the specified activity.
     */
    public function edit(Activity $activity)
    {
        return Inertia::render('admin/activities/edit', [
            'activity' => $activity,
        ]);
    }

    /**
     * Update the specified activity.
     */
    public function update(UpdateActivityRequest $request, Activity $activity)
    {
        $data = $request->validated();
        
        // Handle existing images
        $existingImages = $request->input('existing_images', []);
        
        // Handle new gallery images upload
        $allImages = $existingImages;
        if ($request->hasFile('gallery_images')) {
            $newImages = $this->fileUploadService->uploadMultipleFiles(
                $request->file('gallery_images'),
                'activities/gallery'
            );
            $allImages = array_merge($allImages, $newImages);
        }

        // Remove images that are no longer in the existing_images array
        if ($activity->gallery_images) {
            $imagesToDelete = array_diff($activity->gallery_images, $existingImages);
            if (!empty($imagesToDelete)) {
                $this->fileUploadService->deleteMultipleFiles($imagesToDelete);
            }
        }

        $data['gallery_images'] = $allImages;
        
        // Remove the existing_images field from data as it's not a model field
        unset($data['existing_images']);

        $activity->update($data);

        return redirect()->route('admin.activities.index')
            ->with('success', 'Kegiatan berhasil diperbarui.');
    }

    /**
     * Remove the specified activity.
     */
    public function destroy(Activity $activity)
    {
        // Delete associated images
        if ($activity->gallery_images) {
            $this->fileUploadService->deleteMultipleFiles($activity->gallery_images);
        }

        $activity->delete();

        return redirect()->route('admin.activities.index')
            ->with('success', 'Kegiatan berhasil dihapus.');
    }
}