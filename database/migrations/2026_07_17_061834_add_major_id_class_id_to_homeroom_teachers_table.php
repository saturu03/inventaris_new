<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('homeroom_teachers', function (Blueprint $table) {
            $table->foreignId('major_id')->nullable()->after('name');
            $table->foreignId('class_id')->nullable()->after('major_id');
        });

        // Migrate existing data
        $teachers = DB::table('homeroom_teachers')->get();
        $majors = DB::table('majors')->get()->keyBy('alias');
        $classes = DB::table('classes')->get()->keyBy('level');

        foreach ($teachers as $teacher) {
            $major = $majors->get($teacher->major);
            $class = $classes->get($teacher->class_level);

            DB::table('homeroom_teachers')
                ->where('id', $teacher->id)
                ->update([
                    'major_id' => $major?->id,
                    'class_id' => $class?->id,
                ]);
        }

        Schema::table('homeroom_teachers', function (Blueprint $table) {
            $table->dropColumn(['major', 'class_level']);
        });
    }

    public function down(): void
    {
        Schema::table('homeroom_teachers', function (Blueprint $table) {
            $table->string('major')->nullable()->after('name');
            $table->string('class_level')->nullable()->after('major');
        });

        // Migrate data back
        $teachers = DB::table('homeroom_teachers')->get();
        $majors = DB::table('majors')->get()->keyBy('id');
        $classes = DB::table('classes')->get()->keyBy('id');

        foreach ($teachers as $teacher) {
            $major = $majors->get($teacher->major_id);
            $class = $classes->get($teacher->class_id);

            DB::table('homeroom_teachers')
                ->where('id', $teacher->id)
                ->update([
                    'major' => $major?->alias,
                    'class_level' => $class?->level,
                ]);
        }

        Schema::table('homeroom_teachers', function (Blueprint $table) {
            $table->dropForeign(['major_id', 'class_id']);
            $table->dropColumn(['major_id', 'class_id']);
        });
    }
};
