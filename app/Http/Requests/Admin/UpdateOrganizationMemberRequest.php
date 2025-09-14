<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrganizationMemberRequest extends FormRequest
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
            'position' => 'required|string|max:100',
            'class' => 'required|string|max:20',
            'photo' => 'nullable|file|image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB max
            'remove_photo' => 'boolean',
            'bio' => 'nullable|string|max:1000',
            'order_position' => 'required|integer|min:1',
            'is_active' => 'boolean',
            'period' => 'required|string|max:20',
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
            'name.required' => 'Nama anggota wajib diisi.',
            'name.max' => 'Nama anggota maksimal 255 karakter.',
            'position.required' => 'Jabatan wajib diisi.',
            'position.max' => 'Jabatan maksimal 100 karakter.',
            'class.required' => 'Kelas wajib diisi.',
            'class.max' => 'Kelas maksimal 20 karakter.',
            'photo.file' => 'File foto harus berupa file.',
            'photo.image' => 'File foto harus berupa gambar.',
            'photo.mimes' => 'Format foto harus jpeg, png, jpg, atau webp.',
            'photo.max' => 'Ukuran foto maksimal 5MB.',
            'bio.max' => 'Biografi maksimal 1000 karakter.',
            'order_position.required' => 'Urutan posisi wajib diisi.',
            'order_position.integer' => 'Urutan posisi harus berupa angka.',
            'order_position.min' => 'Urutan posisi minimal 1.',
            'period.required' => 'Periode wajib diisi.',
            'period.max' => 'Periode maksimal 20 karakter.',
        ];
    }
}