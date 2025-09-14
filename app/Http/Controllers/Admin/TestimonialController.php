<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTestimonialRequest;
use App\Http\Requests\Admin\UpdateTestimonialRequest;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    /**
     * Display a listing of testimonials.
     */
    public function index(Request $request)
    {
        $query = Testimonial::query();

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('role', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
            });
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

        if ($request->has('rating') && $request->rating) {
            $query->where('rating', $request->rating);
        }

        $testimonials = $query->latest()->paginate(20);

        return Inertia::render('admin/testimonials/index', [
            'testimonials' => $testimonials,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'featured' => $request->featured,
                'rating' => $request->rating,
            ],
        ]);
    }

    /**
     * Show the form for creating a new testimonial.
     */
    public function create()
    {
        return Inertia::render('admin/testimonials/create');
    }

    /**
     * Store a newly created testimonial.
     */
    public function store(StoreTestimonialRequest $request)
    {
        $data = $request->validated();
        
        // Handle photo upload
        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->store('testimonials', 'public');
        }

        // Remove the 'photo' field from data as we use 'photo_path'
        unset($data['photo']);

        $testimonial = Testimonial::create($data);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimoni berhasil ditambahkan.');
    }

    /**
     * Display the specified testimonial.
     */
    public function show(Testimonial $testimonial)
    {
        return Inertia::render('admin/testimonials/show', [
            'testimonial' => $testimonial,
        ]);
    }

    /**
     * Show the form for editing the specified testimonial.
     */
    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('admin/testimonials/edit', [
            'testimonial' => $testimonial,
        ]);
    }

    /**
     * Update the specified testimonial.
     */
    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial)
    {
        $data = $request->validated();
        
        // Handle photo upload
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($testimonial->photo_path) {
                Storage::disk('public')->delete($testimonial->photo_path);
            }
            $data['photo_path'] = $request->file('photo')->store('testimonials', 'public');
        } elseif ($request->boolean('remove_photo')) {
            // Remove existing photo if requested
            if ($testimonial->photo_path) {
                Storage::disk('public')->delete($testimonial->photo_path);
                $data['photo_path'] = null;
            }
        }

        // Remove fields that are not model attributes
        unset($data['photo'], $data['remove_photo']);

        $testimonial->update($data);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimoni berhasil diperbarui.');
    }

    /**
     * Remove the specified testimonial.
     */
    public function destroy(Testimonial $testimonial)
    {
        // Delete associated photo
        if ($testimonial->photo_path) {
            Storage::disk('public')->delete($testimonial->photo_path);
        }

        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimoni berhasil dihapus.');
    }
}