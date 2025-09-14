<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAnnouncementRequest;
use App\Http\Requests\Admin\UpdateAnnouncementRequest;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of announcements.
     */
    public function index(Request $request)
    {
        $query = Announcement::query();

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        if ($request->has('status')) {
            if ($request->status === 'active') {
                $query->active();
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        if ($request->has('featured')) {
            if ($request->featured === 'yes') {
                $query->featured();
            } elseif ($request->featured === 'no') {
                $query->where('is_featured', false);
            }
        }

        $announcements = $query->latest()->paginate(20);

        return Inertia::render('admin/announcements/index', [
            'announcements' => $announcements,
            'filters' => [
                'search' => $request->search,
                'type' => $request->type,
                'status' => $request->status,
                'featured' => $request->featured,
            ],
        ]);
    }

    /**
     * Show the form for creating a new announcement.
     */
    public function create()
    {
        return Inertia::render('admin/announcements/create');
    }

    /**
     * Store a newly created announcement.
     */
    public function store(StoreAnnouncementRequest $request)
    {
        $data = $request->validated();
        
        // Handle image upload
        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('announcements', 'public');
        }

        // Set published_at to now if not specified and is_active is true
        if ($data['is_active'] && !isset($data['published_at'])) {
            $data['published_at'] = now();
        }

        // Remove the 'image' field from data as we use 'image_path'
        unset($data['image']);

        $announcement = Announcement::create($data);

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil ditambahkan.');
    }

    /**
     * Display the specified announcement.
     */
    public function show(Announcement $announcement)
    {
        return Inertia::render('admin/announcements/show', [
            'announcement' => $announcement,
        ]);
    }

    /**
     * Show the form for editing the specified announcement.
     */
    public function edit(Announcement $announcement)
    {
        return Inertia::render('admin/announcements/edit', [
            'announcement' => $announcement,
        ]);
    }

    /**
     * Update the specified announcement.
     */
    public function update(UpdateAnnouncementRequest $request, Announcement $announcement)
    {
        $data = $request->validated();
        
        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($announcement->image_path) {
                Storage::disk('public')->delete($announcement->image_path);
            }
            $data['image_path'] = $request->file('image')->store('announcements', 'public');
        } elseif ($request->boolean('remove_image')) {
            // Remove existing image if requested
            if ($announcement->image_path) {
                Storage::disk('public')->delete($announcement->image_path);
                $data['image_path'] = null;
            }
        }

        // Remove fields that are not model attributes
        unset($data['image'], $data['remove_image']);

        $announcement->update($data);

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil diperbarui.');
    }

    /**
     * Remove the specified announcement.
     */
    public function destroy(Announcement $announcement)
    {
        // Delete associated image
        if ($announcement->image_path) {
            Storage::disk('public')->delete($announcement->image_path);
        }

        $announcement->delete();

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil dihapus.');
    }
}