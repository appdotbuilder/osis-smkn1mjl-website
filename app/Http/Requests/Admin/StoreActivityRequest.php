<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreActivityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|in:academic,social,sports,arts,volunteer,competition',
            'gallery_images' => 'nullable|array|max:10',
            'gallery_images.*' => 'file|image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB max per image
            'video_url' => 'nullable|url|max:500',
            'activity_date' => 'required|date',
            'is_featured' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul kegiatan wajib diisi.',
            'title.max' => 'Judul kegiatan maksimal 255 karakter.',
            'description.required' => 'Deskripsi kegiatan wajib diisi.',
            'category.required' => 'Kategori kegiatan wajib dipilih.',
            'category.in' => 'Kategori kegiatan tidak valid.',
            'gallery_images.max' => 'Maksimal 10 gambar galeri.',
            'gallery_images.*.file' => 'File galeri harus berupa gambar.',
            'gallery_images.*.image' => 'File galeri harus berupa gambar.',
            'gallery_images.*.mimes' => 'Format gambar galeri harus jpeg, png, jpg, atau webp.',
            'gallery_images.*.max' => 'Ukuran gambar galeri maksimal 5MB.',
            'video_url.url' => 'URL video tidak valid.',
            'activity_date.required' => 'Tanggal kegiatan wajib diisi.',
            'activity_date.date' => 'Format tanggal kegiatan tidak valid.',
        ];
    }
}