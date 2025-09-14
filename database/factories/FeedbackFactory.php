<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feedback>
 */
class FeedbackFactory extends Factory
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
            'email' => fake()->safeEmail(),
            'category' => fake()->randomElement(['suggestion', 'complaint', 'appreciation', 'question']),
            'subject' => fake()->sentence(),
            'message' => fake()->paragraph(),
            'status' => fake()->randomElement(['unread', 'read', 'responded']),
            'response' => fake()->optional()->paragraph(),
            'responded_at' => fake()->optional()->dateTimeBetween('-30 days', 'now'),
        ];
    }

    /**
     * Indicate that the feedback is unread.
     */
    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'unread',
            'response' => null,
            'responded_at' => null,
        ]);
    }
}