<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin Proktor',
            'email' => 'proktor@inventra.test',
            'role' => 'proktor',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Staff Inventaris',
            'email' => 'staff@inventra.test',
            'role' => 'staff',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);
    }
}
