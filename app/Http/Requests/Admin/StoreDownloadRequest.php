<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreDownloadRequest extends FormRequest
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
            'description' => 'required|string|max:1000',
            'file' => 'required|file|max:51200', // 50MB max
            'category' => 'required|string|in:document,form,guide,regulation,report',
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
            'title.required' => 'Judul file wajib diisi.',
            'title.max' => 'Judul file maksimal 255 karakter.',
            'description.required' => 'Deskripsi file wajib diisi.',
            'description.max' => 'Deskripsi file maksimal 1000 karakter.',
            'file.required' => 'File wajib diunggah.',
            'file.file' => 'File yang diunggah harus berupa file.',
            'file.max' => 'Ukuran file maksimal 50MB.',
            'category.required' => 'Kategori file wajib dipilih.',
            'category.in' => 'Kategori file tidak valid.',
        ];
    }
}