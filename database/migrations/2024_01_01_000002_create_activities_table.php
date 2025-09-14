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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('category')->default('general'); // academic, sports, arts, social
            $table->json('gallery_images')->nullable(); // Array of image paths
            $table->string('video_url')->nullable();
            $table->date('activity_date');
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
            
            $table->index('activity_date');
            $table->index('category');
            $table->index('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};