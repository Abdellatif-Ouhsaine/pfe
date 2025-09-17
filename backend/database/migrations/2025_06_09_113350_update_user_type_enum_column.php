<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUserTypeEnumColumn extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Changer le type enum en ajoutant de nouvelles valeurs
            $table->enum('type', ['client', 'rider', 'admin', 'admingobite'])
                  ->default('client')
                  ->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Remettre l'ancien enum
            $table->enum('type', ['client', 'rider', 'admin'])
                  ->default('client')
                  ->change();
        });
    }
}
