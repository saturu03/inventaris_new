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
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')->constrained()->cascadeOnDelete(); // untuk menghubungkan ke tabel barang
            $table->foreignId('user_out_id')->constrained('users'); // untuk menghubungkan ke tabel user dan mendata user siapa yang meminjamkan
            $table->foreignId('user_in_id')->nullable()->constrained('users'); // untuk menghubungkan ke tabel user dan mendata user siapa yang mengembalikan
            $table->foreignId('student_id')->nullable()->constrained()->onDelete('set null'); // untuk menghubukan ke tabel siswa boleh kosong
            $table->string('borrower_name'); // field name untuk nama peminjam
            $table->string('borrower_role')->default('student'); // field name untuk role peminjam
            $table->string('collateral_type')->default('Kartu Pelajar'); // field name untuk jaminan yang digunakan oleh peminjam
            $table->dateTime('borrower_date'); // field name untuk tanggal dan jam peminjaman
            $table->dateTime('returned')->nullable(); // field name untuk tanggal dan jam setelah peminjaman di kembalikan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
