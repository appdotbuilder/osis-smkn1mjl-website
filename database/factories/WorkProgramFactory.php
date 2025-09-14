<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkProgram>
 */
class WorkProgramFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'description' => fake()->paragraphs(2, true),
            'academic_year' => fake()->randomElement(['2023/2024', '2024/2025', '2025/2026']),
            'category' => fake()->randomElement(['academic', 'extracurricular', 'social', 'leadership']),
            'status' => fake()->randomElement(['planned', 'ongoing', 'completed']),
            'start_date' => fake()->dateTimeBetween('-1 year', '+6 months'),
            'end_date' => fake()->optional()->dateTimeBetween('+1 month', '+1 year'),
            'objectives' => fake()->sentences(fake()->numberBetween(2, 5)),
            'outcome' => fake()->optional()->paragraph(),
            'is_featured' => fake()->boolean(25),
        ];
    }

    /**
     * Indicate that the program is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'end_date' => fake()->dateTimeBetween('-6 months', 'now'),
            'outcome' => fake()->paragraph(),
        ]);
    }
}