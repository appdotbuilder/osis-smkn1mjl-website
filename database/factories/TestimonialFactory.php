<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Testimonial>
 */
class TestimonialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'role' => fake()->randomElement([
                'Alumni OSIS 2023',
                'Alumni OSIS 2022',
                'Siswa Kelas XII',
                'Siswa Kelas XI',
                'Guru Pembina OSIS',
                'Kepala Sekolah'
            ]),
            'content' => fake()->paragraph(),
            'photo_path' => null,
            'rating' => fake()->numberBetween(4, 5),
            'is_featured' => fake()->boolean(30),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the testimonial is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
            'rating' => 5,
        ]);
    }
}