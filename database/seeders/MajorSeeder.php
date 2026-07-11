<?php

namespace Database\Seeders;

use App\Models\Major;
use Illuminate\Database\Seeder;

class MajorSeeder extends Seeder
{
    public function run(): void
    {
        Major::create([
            'full_name' => 'Pengembangan Perangkat Lunak dan Gim',
            'alias' => 'PPLG1',
        ]);

        Major::create([
            'full_name' => 'Pengembangan Perangkat Lunak dan Gim',
            'alias' => 'PPLG2',
        ]);

        Major::create([
            'full_name' => 'Teknik Kendaraan Ringan Otomotif',
            'alias' => 'TKRO',
        ]);

        Major::create([
            'full_name' => 'Teknik Bisnis Sepeda Motor',
            'alias' => 'TBSM',
        ]);

        Major::create([
            'full_name' => 'Manajemen Perkantoran dan Layanan Bisnis',
            'alias' => 'MPLB1',
        ]);

        Major::create([
            'full_name' => 'Manajemen Perkantoran dan Layanan Bisnis',
            'alias' => 'MPLB2',
        ]);
    }
}
