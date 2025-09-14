<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of announcements.
     */
    public function index(Request $request)
    {
        $query = Announcement::active()->published();

        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        $announcements = $query->latest('published_at')->paginate(12);

        return Inertia::render('announcements/index', [
            'announcements' => $announcements,
            'filters' => [
                'type' => $request->type,
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Display the specified announcement.
     */
    public function show(Announcement $announcement)
    {
        if (!$announcement->is_active || !$announcement->published_at || $announcement->published_at->isFuture()) {
            abort(404);
        }

        $relatedAnnouncements = Announcement::active()
            ->published()
            ->where('id', '!=', $announcement->id)
            ->where('type', $announcement->type)
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('announcements/show', [
            'announcement' => $announcement,
            'relatedAnnouncements' => $relatedAnnouncements,
        ]);
    }
}