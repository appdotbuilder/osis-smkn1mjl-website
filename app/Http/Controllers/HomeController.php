<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Activity;
use App\Models\WorkProgram;
use App\Models\OrganizationMember;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        $featuredAnnouncements = Announcement::active()
            ->published()
            ->featured()
            ->latest('published_at')
            ->take(3)
            ->get();

        $latestAnnouncements = Announcement::active()
            ->published()
            ->latest('published_at')
            ->take(5)
            ->get();

        $featuredActivities = Activity::featured()
            ->latest('activity_date')
            ->take(6)
            ->get();

        $currentPrograms = WorkProgram::byYear('2024/2025')
            ->byStatus('ongoing')
            ->featured()
            ->take(4)
            ->get();

        $testimonials = Testimonial::active()
            ->featured()
            ->take(3)
            ->get();

        return Inertia::render('welcome', [
            'featuredAnnouncements' => $featuredAnnouncements,
            'latestAnnouncements' => $latestAnnouncements,
            'featuredActivities' => $featuredActivities,
            'currentPrograms' => $currentPrograms,
            'testimonials' => $testimonials,
        ]);
    }
}