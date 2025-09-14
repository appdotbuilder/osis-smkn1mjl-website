<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFeedbackRequest;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    /**
     * Show the form for creating feedback.
     */
    public function create()
    {
        return Inertia::render('forms/feedback');
    }

    /**
     * Store newly created feedback.
     */
    public function store(StoreFeedbackRequest $request)
    {
        Feedback::create($request->validated());

        return redirect()->back()->with('success', 'Terima kasih atas masukan Anda! Kami akan merespons dalam 2-3 hari kerja.');
    }
}