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
        Schema::create('work_programs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('academic_year'); // e.g., "2024/2025"
            $table->string('category')->default('general'); // academic, extracurricular, social, leadership
            $table->enum('status', ['planned', 'ongoing', 'completed'])->default('planned');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->json('objectives')->nullable(); // Array of objectives
            $table->text('outcome')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
            
            $table->index('academic_year');
            $table->index(['status', 'start_date']);
            $table->index('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_programs');
    }
};