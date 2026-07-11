<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model
{
    /** @use HasFactory<\Database\Factories\ItemFactory> */
    use HasFactory;

    protected $fillable = [
        'category_id',
        'location_id',
        'name',
        'status',
        'spec',
        'condition',
        'barcode',
        'photo',
    ];  // untuk mengizinkan field mana saja yang boleh di isi

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class); // untuk menghubungkan relasi ke model Category
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class); // untuk menghubungkan relasi ke model Location
    }
}
