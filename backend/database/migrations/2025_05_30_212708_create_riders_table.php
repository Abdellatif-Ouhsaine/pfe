<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRidersTable extends Migration
{
    public function up()
    {
        Schema::create('riders', function (Blueprint $table) {
            $table->id();

            // Foreign key to users table
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Rider-specific fields
            $table->string('vehicle_type');
            $table->string('vehicle_model');
            $table->string('license_plate');

            // File uploads
            $table->string('id_document_path');
            $table->string('driving_license_path');

            // Status: pending, approved, or rejected
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('riders');
    }
}
