<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MemberRegistration>
 */
class MemberRegistrationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'full_name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'class' => fake()->randomElement(['X RPL 1', 'X RPL 2', 'X TKJ 1', 'X MM 1', 'X TKRO 1']),
            'student_id' => fake()->unique()->numerify('########'),
            'motivation' => fake()->paragraph(),
            'preferred_division' => fake()->randomElement(['Akademik', 'Olahraga', 'Seni', 'Sosial', 'Keamanan']),
            'skills' => fake()->randomElements(['Komunikasi', 'Organisasi', 'Teknologi', 'Desain', 'Kepemimpinan', 'Public Speaking'], fake()->numberBetween(2, 4)),
            'status' => fake()->randomElement(['pending', 'reviewed', 'accepted', 'rejected']),
            'notes' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the registration is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'notes' => null,
        ]);
    }
}