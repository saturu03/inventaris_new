<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Loan extends Model
{
    /** @use HasFactory<\Database\Factories\LoanFactory> */
    use HasFactory;

    protected $fillable = [
        'item_id',
        'user_out_id',
        'user_in_id',
        'student_id',
        'borrower_name',
        'borrower_role',
        'collateral_type',
        'borrower_date',
        'estimated_return_date',
        'returned',
        'approval_status',
        'approval_note',
        'approved_by',
        'approved_at',
    ];

    protected function casts(): array
    {
        return [
            'borrower_date' => 'datetime',
            'estimated_return_date' => 'datetime',
            'returned' => 'datetime',
            'approved_at' => 'datetime',
        ];
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    public function userOut(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_out_id');
    }

    public function userIn(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_in_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
