<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Loan>
 */
class LoanFactory extends Factory
{
    public function definition(): array
    {
        return [
            'item_id' => Item::factory(),
            'user_out_id' => User::factory(),
            'user_in_id' => null,
            'student_id' => Student::factory(),
            'borrower_name' => $this->faker->name(),
            'borrower_role' => 'student',
            'collateral_type' => 'Kartu Pelajar',
            'borrower_date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'returned' => null,
        ];
    }

    public function returned(): static
    {
        return $this->state(fn (array $attributes) => [
            'returned' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'user_in_id' => User::factory(),
        ]);
    }
}
