<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete(); // untuk menghubungkan ke tabel kategori
            $table->foreignId('location_id')->constrained()->cascadeOnDelete(); // untuk menghubungkan ke tabel lokasi
            $table->string('name'); // field name untuk nama barang
            $table->enum('status', ['available', 'inavailable'])->default('available'); // field name untuk ketersedian barang
            $table->longText('spec')->nullable(); // field name untuk spesifikasi
            $table->enum('condition', ['functional', 'slightly_damaged', 'broken'])->default('functional'); // field name untuk kondisi barang
            $table->string('barcode')->unique(); // field name untuk barcode barang
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
