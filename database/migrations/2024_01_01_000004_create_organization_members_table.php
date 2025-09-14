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
        Schema::create('organization_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position'); // e.g., "Ketua OSIS", "Wakil Ketua", "Sekretaris"
            $table->string('class'); // e.g., "XII RPL 1"
            $table->string('photo_path')->nullable();
            $table->text('bio')->nullable();
            $table->integer('order_position')->default(0); // For ordering members
            $table->boolean('is_active')->default(true);
            $table->string('period'); // e.g., "2024/2025"
            $table->timestamps();
            
            $table->index(['period', 'order_position']);
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organization_members');
    }
};