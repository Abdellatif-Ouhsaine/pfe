<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            $table->string('name');                
            $table->text('description')->nullable(); 
            $table->string('cuisine_type')->nullable(); 
            $table->string('address');             
            $table->string('logo')->nullable();    
            $table->string('cover_image')->nullable(); 
            $table->decimal('delivery_fee', 8, 2)->default(0); 
            $table->decimal('min_order', 8, 2)->default(0);    
            
            
            $table->string('business_license')->nullable(); // Licence commerciale (nom fichier)
            $table->boolean('agree_to_terms')->default(false); // Acceptation des termes
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending'); // Statut de la demande            
            $table->decimal('rating', 3, 2)->default(4.0);    
            
            //add cafe or resto 
            $table->enum('business_type', ['restaurant', 'cafe'])->default('restaurant');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
} ;

  

