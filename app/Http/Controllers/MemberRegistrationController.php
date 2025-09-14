<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMemberRegistrationRequest;
use App\Models\MemberRegistration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberRegistrationController extends Controller
{
    /**
     * Show the form for creating a new member registration.
     */
    public function create()
    {
        return Inertia::render('forms/member-registration');
    }

    /**
     * Store a newly created member registration.
     */
    public function store(StoreMemberRegistrationRequest $request)
    {
        MemberRegistration::create($request->validated());

        return redirect()->back()->with('success', 'Pendaftaran berhasil dikirim! Tim OSIS akan menghubungi Anda dalam 2-3 hari kerja.');
    }
}