<?php

namespace Database\Seeders;

use App\Models\Classlevel;
use Illuminate\Database\Seeder;

class ClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // menambahkan kelas otomatis saat menjalankan seeder
        Classlevel::create(['level' => 10]);
        Classlevel::create(['level' => 11]);
        Classlevel::create(['level' => 12]);
    }
}
