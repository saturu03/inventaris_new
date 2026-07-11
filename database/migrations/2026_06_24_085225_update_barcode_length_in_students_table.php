<?php

use App\Models\Student;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Student::whereRaw('LENGTH(barcode) > 8')->each(function (Student $student) {
            do {
                $barcode = Str::random(8);
            } while (Student::where('barcode', $barcode)->where('id', '!=', $student->id)->exists());

            $student->updateQuietly(['barcode' => $barcode]);
        });

        Schema::table('students', function (Blueprint $table) {
            $table->string('barcode', 8)->change();
        });
    }

    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->string('barcode', 255)->change();
        });
    }
};
