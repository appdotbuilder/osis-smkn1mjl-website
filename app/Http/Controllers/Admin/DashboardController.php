<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Announcement;
use App\Models\WorkProgram;
use App\Models\OrganizationMember;
use App\Models\Testimonial;
use App\Models\Download;
use App\Models\MemberRegistration;
use App\Models\Feedback;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $stats = [
            'activities' => Activity::count(),
            'announcements' => Announcement::count(),
            'workPrograms' => WorkProgram::count(),
            'organizationMembers' => OrganizationMember::count(),
            'testimonials' => Testimonial::count(),
            'downloads' => Download::count(),
            'memberRegistrations' => MemberRegistration::count(),
            'feedback' => Feedback::count(),
        ];

        $recentActivities = Activity::latest()->take(5)->get();
        $recentAnnouncements = Announcement::latest()->take(5)->get();
        $recentRegistrations = MemberRegistration::latest()->take(5)->get();
        $recentFeedback = Feedback::latest()->take(5)->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentActivities' => $recentActivities,
            'recentAnnouncements' => $recentAnnouncements,
            'recentRegistrations' => $recentRegistrations,
            'recentFeedback' => $recentFeedback,
        ]);
    }
}