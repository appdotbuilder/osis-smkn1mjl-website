<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
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
            'category' => fake()->randomElement(['academic', 'sports', 'arts', 'social']),
            'gallery_images' => fake()->randomElements([
                'activities/img1.jpg',
                'activities/img2.jpg',
                'activities/img3.jpg',
                'activities/img4.jpg',
            ], fake()->numberBetween(1, 3)),
            'video_url' => fake()->optional()->url(),
            'activity_date' => fake()->dateTimeBetween('-6 months', 'now'),
            'is_featured' => fake()->boolean(20),
        ];
    }

    /**
     * Indicate that the activity is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }
}