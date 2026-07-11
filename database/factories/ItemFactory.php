<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'category_id' => Category::factory(),
            'location_id' => Location::factory(),
            'name' => $this->faker->word(),
            'status' => 'available',
            'spec' => $this->faker->sentence(),
            'condition' => $this->faker->randomElement(['functional', 'slightly_damaged', 'broken']),
            'barcode' => $this->faker->unique()->uuid(),
        ];
    }

    public function inavailable(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inavailable',
        ]);
    }
}
