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
        // Check if status column exists and update it safely for member_registrations
        if (Schema::hasColumn('member_registrations', 'status')) {
            // Add new resolved status to feedbacks if it doesn't exist
            $connection = Schema::getConnection();
            $connection->statement("UPDATE member_registrations SET status = 'pending' WHERE status NOT IN ('pending', 'reviewed', 'accepted', 'rejected')");
        }

        // Check if status column exists and update it safely for feedbacks  
        if (Schema::hasColumn('feedbacks', 'status')) {
            $connection = Schema::getConnection();
            $connection->statement("UPDATE feedbacks SET status = 'unread' WHERE status NOT IN ('unread', 'read', 'responded')");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Nothing to reverse as we're just ensuring data consistency
    }
};