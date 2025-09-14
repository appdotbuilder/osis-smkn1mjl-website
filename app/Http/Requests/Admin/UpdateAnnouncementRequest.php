<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAnnouncementRequest extends FormRequest
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
            'content' => 'required|string',
            'type' => 'required|string|in:announcement,event,news,update',
            'is_featured' => 'boolean',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB max
            'remove_image' => 'boolean',
            'is_active' => 'boolean',
            'published_at' => 'nullable|date',
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
            'title.required' => 'Judul pengumuman wajib diisi.',
            'title.max' => 'Judul pengumuman maksimal 255 karakter.',
            'content.required' => 'Konten pengumuman wajib diisi.',
            'type.required' => 'Tipe pengumuman wajib dipilih.',
            'type.in' => 'Tipe pengumuman tidak valid.',
            'image.file' => 'File gambar harus berupa file.',
            'image.image' => 'File harus berupa gambar.',
            'image.mimes' => 'Format gambar harus jpeg, png, jpg, atau webp.',
            'image.max' => 'Ukuran gambar maksimal 5MB.',
            'published_at.date' => 'Format tanggal publikasi tidak valid.',
        ];
    }
}