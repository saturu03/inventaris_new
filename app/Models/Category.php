<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $fillable = ['name']; // untuk mengizinkan field mana saja yang boleh di isi

    public function items(): HasMany
    {
        return $this->hasMany(Item::class); // untuk menghubungkan relasi ke model Item
    }
}
