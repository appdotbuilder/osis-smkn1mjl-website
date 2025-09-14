<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    /**
     * Display a listing of activities.
     */
    public function index(Request $request)
    {
        $query = Activity::query();

        if ($request->has('category') && $request->category) {
            $query->byCategory($request->category);
        }

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $activities = $query->latest('activity_date')->paginate(12);

        return Inertia::render('activities/index', [
            'activities' => $activities,
            'filters' => [
                'category' => $request->category,
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Display the specified activity.
     */
    public function show(Activity $activity)
    {
        $relatedActivities = Activity::where('id', '!=', $activity->id)
            ->where('category', $activity->category)
            ->latest('activity_date')
            ->take(3)
            ->get();

        return Inertia::render('activities/show', [
            'activity' => $activity,
            'relatedActivities' => $relatedActivities,
        ]);
    }
}