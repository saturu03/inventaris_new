<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HomeroomTeacher extends Model
{
    protected $fillable = [
        'name',
        'major_id',
        'class_id',
        'phone',
    ];

    public function major(): BelongsTo
    {
        return $this->belongsTo(Major::class);
    }

    public function class(): BelongsTo
    {
        return $this->belongsTo(Classlevel::class);
    }
}
