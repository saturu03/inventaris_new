<?php

namespace Database\Factories;

use App\Models\Classlevel;
use App\Models\Major;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'major_id' => Major::inRandomOrder()->first()->id, // untuk menghubungkan ke tabel jurusan
            'class_id' => Classlevel::inRandomOrder()->first()->id, // untuk menghubungkan ke tabel kelas
            'name' => $this->faker->name(), // untuk menghasilkan nama siswa secara acak
            'nis' => $this->faker->unique()->numerify('#####'), // untuk menghasilkan nis siswa secara acak dan unik
            'gender' => $this->faker->randomElement(['male', 'female']), // untuk menghasilkan jenis kelamin siswa secara acak
            'address' => $this->faker->address(), // untuk menghasilkan alamat siswa secara acak
            'barcode' => $this->faker->uuid(), // untuk menghasilkan barcode siswa secara acak dan unik
            'phone' => $this->faker->phoneNumber(), // untuk menghasilkan nomor telephon siswa secara acak
        ];
    }
}
