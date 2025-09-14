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
        Schema::create('member_registrations', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->string('class');
            $table->string('student_id');
            $table->text('motivation');
            $table->string('preferred_division')->nullable(); // e.g., "Akademik", "Olahraga", "Seni"
            $table->json('skills')->nullable(); // Array of skills
            $table->enum('status', ['pending', 'reviewed', 'accepted', 'rejected'])->default('pending');
            $table->text('notes')->nullable(); // Admin notes
            $table->timestamps();
            
            $table->index('status');
            $table->index(['created_at', 'status']);
            $table->unique(['student_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('member_registrations');
    }
};