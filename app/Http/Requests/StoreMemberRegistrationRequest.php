<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMemberRegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'class' => 'required|string|max:50',
            'student_id' => 'required|string|max:20',
            'motivation' => 'required|string|min:50',
            'preferred_division' => 'nullable|string|max:100',
            'skills' => 'nullable|array',
            'skills.*' => 'string|max:100',
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
            'full_name.required' => 'Nama lengkap wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'phone.required' => 'Nomor telepon wajib diisi.',
            'class.required' => 'Kelas wajib diisi.',
            'student_id.required' => 'NIS wajib diisi.',
            'motivation.required' => 'Motivasi bergabung wajib diisi.',
            'motivation.min' => 'Motivasi minimal 50 karakter.',
        ];
    }
}