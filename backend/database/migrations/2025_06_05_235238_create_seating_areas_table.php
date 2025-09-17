<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('seating_areas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_id')->constrained()->onDelete('cascade');
            $table->string('name'); // Terrasse, Salon, Bar, etc.
            $table->string('image_url')->nullable(); // URL ou chemin de l'image de la zone (optionnel)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seating_areas');
    }
};

