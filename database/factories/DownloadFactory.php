<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Download>
 */
class DownloadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fileTypes = ['pdf', 'docx', 'pptx'];
        $fileType = fake()->randomElement($fileTypes);
        
        return [
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'file_path' => 'downloads/' . fake()->slug() . '.' . $fileType,
            'file_type' => $fileType,
            'file_size' => fake()->randomFloat(1, 0.5, 10.0) . ' MB',
            'category' => fake()->randomElement(['forms', 'reports', 'presentations', 'brochures']),
            'download_count' => fake()->numberBetween(0, 500),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the download is a form.
     */
    public function form(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'forms',
            'title' => fake()->randomElement([
                'Formulir Pendaftaran Anggota OSIS',
                'Form Pengajuan Kegiatan',
                'Formulir Proposal Event',
            ]),
        ]);
    }
}