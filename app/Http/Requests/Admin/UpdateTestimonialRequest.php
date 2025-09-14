<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTestimonialRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:100',
            'content' => 'required|string|max:1000',
            'photo' => 'nullable|file|image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB max
            'remove_photo' => 'boolean',
            'rating' => 'required|integer|min:1|max:5',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
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
            'name.required' => 'Nama pemberi testimoni wajib diisi.',
            'name.max' => 'Nama pemberi testimoni maksimal 255 karakter.',
            'role.required' => 'Peran/jabatan pemberi testimoni wajib diisi.',
            'role.max' => 'Peran/jabatan maksimal 100 karakter.',
            'content.required' => 'Konten testimoni wajib diisi.',
            'content.max' => 'Konten testimoni maksimal 1000 karakter.',
            'photo.file' => 'File foto harus berupa file.',
            'photo.image' => 'File foto harus berupa gambar.',
            'photo.mimes' => 'Format foto harus jpeg, png, jpg, atau webp.',
            'photo.max' => 'Ukuran foto maksimal 5MB.',
            'rating.required' => 'Rating wajib diisi.',
            'rating.integer' => 'Rating harus berupa angka.',
            'rating.min' => 'Rating minimal 1.',
            'rating.max' => 'Rating maksimal 5.',
        ];
    }
}