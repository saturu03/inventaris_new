<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Deposit extends Model
{
    use HasFactory;

    protected $fillable = [
        'depositor_name',
        'depositor_phone',
        'deposit_date',
        'estimated_pickup_date',
        'pickup_date',
        'status',
        'notes',
        'user_id',
    ];

    protected function casts(): array
    {
        return [
            'deposit_date' => 'datetime',
            'estimated_pickup_date' => 'datetime',
            'pickup_date' => 'datetime',
        ];
    }

    public function items(): HasMany
    {
        return $this->hasMany(DepositItem::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
