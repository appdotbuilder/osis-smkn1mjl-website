<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreOrganizationMemberRequest;
use App\Http\Requests\Admin\UpdateOrganizationMemberRequest;
use App\Models\OrganizationMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrganizationMemberController extends Controller
{
    /**
     * Display a listing of organization members.
     */
    public function index(Request $request)
    {
        $query = OrganizationMember::query();

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('position', 'like', '%' . $request->search . '%')
                  ->orWhere('class', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('period') && $request->period) {
            $query->byPeriod($request->period);
        }

        if ($request->has('status')) {
            if ($request->status === 'active') {
                $query->active();
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        $members = $query->ordered()->paginate(20);

        return Inertia::render('admin/organization-members/index', [
            'members' => $members,
            'filters' => [
                'search' => $request->search,
                'period' => $request->period,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new organization member.
     */
    public function create()
    {
        return Inertia::render('admin/organization-members/create');
    }

    /**
     * Store a newly created organization member.
     */
    public function store(StoreOrganizationMemberRequest $request)
    {
        $data = $request->validated();
        
        // Handle photo upload
        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->store('organization-members', 'public');
        }

        // Remove the 'photo' field from data as we use 'photo_path'
        unset($data['photo']);

        $member = OrganizationMember::create($data);

        return redirect()->route('admin.organization-members.index')
            ->with('success', 'Anggota organisasi berhasil ditambahkan.');
    }

    /**
     * Display the specified organization member.
     */
    public function show(OrganizationMember $organizationMember)
    {
        return Inertia::render('admin/organization-members/show', [
            'member' => $organizationMember,
        ]);
    }

    /**
     * Show the form for editing the specified organization member.
     */
    public function edit(OrganizationMember $organizationMember)
    {
        return Inertia::render('admin/organization-members/edit', [
            'member' => $organizationMember,
        ]);
    }

    /**
     * Update the specified organization member.
     */
    public function update(UpdateOrganizationMemberRequest $request, OrganizationMember $organizationMember)
    {
        $data = $request->validated();
        
        // Handle photo upload
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($organizationMember->photo_path) {
                Storage::disk('public')->delete($organizationMember->photo_path);
            }
            $data['photo_path'] = $request->file('photo')->store('organization-members', 'public');
        } elseif ($request->boolean('remove_photo')) {
            // Remove existing photo if requested
            if ($organizationMember->photo_path) {
                Storage::disk('public')->delete($organizationMember->photo_path);
                $data['photo_path'] = null;
            }
        }

        // Remove fields that are not model attributes
        unset($data['photo'], $data['remove_photo']);

        $organizationMember->update($data);

        return redirect()->route('admin.organization-members.index')
            ->with('success', 'Anggota organisasi berhasil diperbarui.');
    }

    /**
     * Remove the specified organization member.
     */
    public function destroy(OrganizationMember $organizationMember)
    {
        // Delete associated photo
        if ($organizationMember->photo_path) {
            Storage::disk('public')->delete($organizationMember->photo_path);
        }

        $organizationMember->delete();

        return redirect()->route('admin.organization-members.index')
            ->with('success', 'Anggota organisasi berhasil dihapus.');
    }
}