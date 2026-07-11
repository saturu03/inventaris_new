<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Item;
use App\Models\Location;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        $labKecil = Location::where('name', 'LABKOM Kecil')->first();
        $labBesar = Location::where('name', 'LABKOM Besar')->first();
        $monitor = Category::where('name', 'Monitor')->first();
        $mouse = Category::where('name', 'Mouse')->first();
        $keyboard = Category::where('name', 'Keyboard')->first();

        $items = [
            ['category_id' => $monitor->id, 'location_id' => $labBesar->id, 'name' => 'Monitor LG 22"', 'status' => 'available', 'condition' => 'functional'],
            ['category_id' => $monitor->id, 'location_id' => $labBesar->id, 'name' => 'Monitor Samsung 24"', 'status' => 'inavailable', 'condition' => 'functional'],
            ['category_id' => $monitor->id, 'location_id' => $labKecil->id, 'name' => 'Monitor Acer 21"', 'status' => 'available', 'condition' => 'slightly_damaged'],
            ['category_id' => $mouse->id, 'location_id' => $labBesar->id, 'name' => 'Mouse Logitech B100', 'status' => 'available', 'condition' => 'functional'],
            ['category_id' => $mouse->id, 'location_id' => $labBesar->id, 'name' => 'Mouse Logitech M90', 'status' => 'inavailable', 'condition' => 'functional'],
            ['category_id' => $mouse->id, 'location_id' => $labKecil->id, 'name' => 'Mouse Dell MS116', 'status' => 'available', 'condition' => 'functional'],
            ['category_id' => $mouse->id, 'location_id' => $labKecil->id, 'name' => 'Mouse HP 100', 'status' => 'available', 'condition' => 'slightly_damaged'],
            ['category_id' => $keyboard->id, 'location_id' => $labBesar->id, 'name' => 'Keyboard Logitech K120', 'status' => 'available', 'condition' => 'functional'],
            ['category_id' => $keyboard->id, 'location_id' => $labBesar->id, 'name' => 'Keyboard Dell KB216', 'status' => 'inavailable', 'condition' => 'functional'],
            ['category_id' => $keyboard->id, 'location_id' => $labKecil->id, 'name' => 'Keyboard HP K1500', 'status' => 'available', 'condition' => 'broken'],
        ];

        foreach ($items as $item) {
            Item::create(array_merge($item, [
                'spec' => 'Barang inventaris sekolah',
                'barcode' => fake()->unique()->uuid(),
            ]));
        }
    }
}
