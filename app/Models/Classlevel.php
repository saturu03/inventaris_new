<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Classlevel extends Model
{
    protected $table = 'classes'; // untuk deklarasi tabel

    protected $fillable = ['level']; // untuk mengizinkan field mana saja yang boleh di isi

    public function students(): HasMany
    {
        return $this->hasMany(Student::class); // untuk menghubungkan relasi ke model Student
    }
}
