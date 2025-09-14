<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MemberRegistration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberRegistrationController extends Controller
{
    /**
     * Display a listing of member registrations.
     */
    public function index(Request $request)
    {
        $query = MemberRegistration::query();

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('full_name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('phone', 'like', '%' . $request->search . '%')
                  ->orWhere('class', 'like', '%' . $request->search . '%')
                  ->orWhere('student_id', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('class') && $request->class) {
            $query->where('class', 'like', '%' . $request->class . '%');
        }

        if ($request->has('preferred_division') && $request->preferred_division) {
            $query->where('preferred_division', 'like', '%' . $request->preferred_division . '%');
        }

        $registrations = $query->latest()->paginate(20);

        return Inertia::render('admin/member-registrations/index', [
            'registrations' => $registrations,
            'filters' => [
                'search' => $request->search,
                'class' => $request->class,
                'preferred_division' => $request->preferred_division,
            ],
        ]);
    }

    /**
     * Display the specified member registration.
     */
    public function show(MemberRegistration $memberRegistration)
    {
        return Inertia::render('admin/member-registrations/show', [
            'registration' => $memberRegistration,
        ]);
    }

    /**
     * Show the form for editing the specified member registration.
     */
    public function edit(MemberRegistration $memberRegistration)
    {
        return Inertia::render('admin/member-registrations/edit', [
            'registration' => $memberRegistration,
        ]);
    }

    /**
     * Update the specified member registration (for admin notes/status).
     */
    public function update(Request $request, MemberRegistration $memberRegistration)
    {
        $request->validate([
            'notes' => 'nullable|string|max:1000',
            'status' => 'nullable|string|in:pending,reviewed,accepted,rejected',
        ]);

        $memberRegistration->update([
            'notes' => $request->notes,
            'status' => $request->status,
        ]);

        return redirect()->route('admin.member-registrations.index')
            ->with('success', 'Pendaftaran anggota berhasil diperbarui.');
    }

    /**
     * Remove the specified member registration.
     */
    public function destroy(MemberRegistration $memberRegistration)
    {
        $memberRegistration->delete();

        return redirect()->route('admin.member-registrations.index')
            ->with('success', 'Pendaftaran anggota berhasil dihapus.');
    }
}