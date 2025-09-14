<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrganizationMember>
 */
class OrganizationMemberFactory extends Factory
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
            'position' => fake()->randomElement([
                'Ketua OSIS',
                'Wakil Ketua OSIS',
                'Sekretaris',
                'Bendahara',
                'Koordinator Bidang Akademik',
                'Koordinator Bidang Olahraga',
                'Koordinator Bidang Seni',
                'Koordinator Bidang Sosial',
                'Anggota'
            ]),
            'class' => fake()->randomElement(['X RPL 1', 'XI RPL 2', 'XII TKJ 1', 'XI MM 1', 'X TKRO 2']),
            'photo_path' => null,
            'bio' => fake()->optional()->paragraph(),
            'order_position' => fake()->numberBetween(1, 20),
            'is_active' => true,
            'period' => fake()->randomElement(['2023/2024', '2024/2025']),
        ];
    }

    /**
     * Indicate that the member is a leader.
     */
    public function leader(): static
    {
        return $this->state(fn (array $attributes) => [
            'position' => fake()->randomElement(['Ketua OSIS', 'Wakil Ketua OSIS', 'Sekretaris', 'Bendahara']),
            'order_position' => fake()->numberBetween(1, 4),
            'bio' => fake()->paragraph(),
        ]);
    }
}