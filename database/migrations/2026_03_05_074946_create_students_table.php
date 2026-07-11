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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('major_id')->constrained()->cascadeOnDelete(); // untuk menghubungkan ke tabel jurusan
            $table->foreignId('class_id')->constrained()->cascadeOnDelete(); // untuk menghubungkan ke tabel kelas
            $table->string('name'); // field name untuk nama siswa
            $table->string('nis')->unique(); // field name untuk nis siswa
            $table->enum('gender', ['male', 'female']); // field name untuk jenis kelamin siswa
            $table->longText('address')->nullable(); // field name untuk alamat siswa
            $table->string('barcode')->unique(); // field name untuk barcode siswa
            $table->string('phone'); // field name untuk nomor telephon siswa
            $table->string('photo')->nullable(); // field name untuk foto siswa
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
