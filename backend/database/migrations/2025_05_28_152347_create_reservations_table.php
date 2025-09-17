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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('restaurant_id')->constrained()->onDelete('cascade');
            $table->foreignId('seating_position_id')->nullable()->constrained()->onDelete('cascade'); // Optional link to seat
            $table->date('reservation_date');
            $table->time('reservation_time');
            $table->integer('number_of_guests');
            $table->string('seating_preference')->nullable();
            $table->text('special_requests')->nullable();
            $table->enum('status', ['confirmed', 'pending', 'cancelled', 'completed'])->default('confirmed');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
