<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    /**
     * Display a listing of feedback.
     */
    public function index(Request $request)
    {
        $query = Feedback::query();

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('subject', 'like', '%' . $request->search . '%')
                  ->orWhere('message', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        $feedback = $query->latest()->paginate(20);

        return Inertia::render('admin/feedback/index', [
            'feedback' => $feedback,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Display the specified feedback.
     */
    public function show(Feedback $feedback)
    {
        return Inertia::render('admin/feedback/show', [
            'feedback' => $feedback,
        ]);
    }

    /**
     * Show the form for editing the specified feedback.
     */
    public function edit(Feedback $feedback)
    {
        return Inertia::render('admin/feedback/edit', [
            'feedback' => $feedback,
        ]);
    }

    /**
     * Update the specified feedback (for admin response/status).
     */
    public function update(Request $request, Feedback $feedback)
    {
        $request->validate([
            'response' => 'nullable|string|max:2000',
            'status' => 'nullable|string|in:unread,read,responded,resolved',
        ]);

        $feedback->update([
            'response' => $request->response,
            'status' => $request->status,
            'responded_at' => $request->response ? now() : null,
        ]);

        return redirect()->route('admin.feedback.index')
            ->with('success', 'Feedback berhasil diperbarui.');
    }

    /**
     * Remove the specified feedback.
     */
    public function destroy(Feedback $feedback)
    {
        $feedback->delete();

        return redirect()->route('admin.feedback.index')
            ->with('success', 'Feedback berhasil dihapus.');
    }
}