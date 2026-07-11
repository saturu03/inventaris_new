<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ClassSeeder::class,
            MajorSeeder::class,
            CategorySeeder::class,
            LocationSeeder::class,
            UserSeeder::class,
            ItemSeeder::class,
        ]);

        Student::factory(200)->create();

        $this->call([
            LoanSeeder::class,
            DepositSeeder::class,
        ]);
    }
}
