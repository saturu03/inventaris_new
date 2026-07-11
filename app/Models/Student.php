<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'major_id', 'class_id', 'name',
        'nis', 'gender', 'address',
        'barcode', 'phone', 'photo',
    ];  // untuk mengizinkan field mana saja yang boleh di isi

    public function major(): BelongsTo
    {
        return $this->belongsTo(Major::class); // untuk menghubungkan relasi ke model Major
    }

    public function class(): BelongsTo
    {
        return $this->belongsTo(Classlevel::class); // untuk menghubungkan relasi ke model Classlevel
    }
}
