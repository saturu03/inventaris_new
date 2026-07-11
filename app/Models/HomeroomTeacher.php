<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeroomTeacher extends Model
{
    protected $fillable = [
        'name',
        'class_level',
        'major',
        'phone',
    ];
}
