<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkProgramRequest extends FormRequest
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
            'academic_year' => 'required|string|max:20',
            'category' => 'required|string|in:academic,social,organizational,development',
            'status' => 'required|string|in:planned,ongoing,completed,cancelled',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'objectives' => 'nullable|array',
            'objectives.*' => 'string|max:500',
            'outcome' => 'nullable|string',
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
            'title.required' => 'Judul program kerja wajib diisi.',
            'title.max' => 'Judul program kerja maksimal 255 karakter.',
            'description.required' => 'Deskripsi program kerja wajib diisi.',
            'academic_year.required' => 'Tahun akademik wajib diisi.',
            'academic_year.max' => 'Tahun akademik maksimal 20 karakter.',
            'category.required' => 'Kategori program kerja wajib dipilih.',
            'category.in' => 'Kategori program kerja tidak valid.',
            'status.required' => 'Status program kerja wajib dipilih.',
            'status.in' => 'Status program kerja tidak valid.',
            'start_date.required' => 'Tanggal mulai wajib diisi.',
            'start_date.date' => 'Format tanggal mulai tidak valid.',
            'end_date.date' => 'Format tanggal selesai tidak valid.',
            'end_date.after' => 'Tanggal selesai harus setelah tanggal mulai.',
            'objectives.*.string' => 'Setiap tujuan harus berupa teks.',
            'objectives.*.max' => 'Setiap tujuan maksimal 500 karakter.',
        ];
    }
}