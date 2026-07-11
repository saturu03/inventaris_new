<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    protected $fillable = ['school_name', 'school_address'];  // untuk mengizinkan field mana saja yang boleh di isi
}
