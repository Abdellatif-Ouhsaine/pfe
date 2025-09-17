<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::table('seating_positions', function (Blueprint $table) {
        $table->foreignId('seating_area_id')->nullable()->constrained()->onDelete('cascade');
    });
}

public function down(): void
{
    Schema::table('seating_positions', function (Blueprint $table) {
        $table->dropForeign(['seating_area_id']);
        $table->dropColumn('seating_area_id');
    });
}

};
