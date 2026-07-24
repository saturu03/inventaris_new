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
        Schema::table('loans', function (Blueprint $table) {
            $table->enum('approval_status', ['none', 'pending', 'approved', 'rejected'])->default('none')->after('estimated_return_date');
            $table->text('approval_note')->nullable()->after('approval_status');
            $table->foreignId('approved_by')->nullable()->after('approval_note')->constrained('users')->nullOnDelete();
            $table->timestamp('approved_at')->nullable()->after('approved_by');
        });
    }

    public function down(): void
    {
        Schema::table('loans', function (Blueprint $table) {
            $table->dropForeign(['approved_by']);
            $table->dropColumn(['approval_status', 'approval_note', 'approved_by', 'approved_at']);
        });
    }
};
