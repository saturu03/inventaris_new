<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('deposits', function (Blueprint $table) {
            $table->id();
            $table->string('depositor_name');
            $table->string('depositor_phone')->nullable();
            $table->dateTime('deposit_date');
            $table->dateTime('estimated_pickup_date')->nullable();
            $table->dateTime('pickup_date')->nullable();
            $table->string('status')->default('deposited');
            $table->text('notes')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('deposits');
    }
};
