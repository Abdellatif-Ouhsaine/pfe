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
       Schema::create('deliveries', function (Blueprint $table) {
    $table->id();
    $table->foreignId('driver_id')->constrained();
    $table->string('restaurant_name');
    $table->text('pickup_address');
    $table->string('customer_name');
    $table->text('delivery_address');
    $table->string('contact_number');
    $table->json('items');
    $table->text('instructions')->nullable();
    $table->string('status')->default('pending');
    $table->decimal('delivery_fee', 8, 2);
    $table->decimal('driver_earning', 8, 2);
    $table->string('payment_status')->default('pending');
    $table->timestamp('estimated_delivery')->nullable();
    $table->timestamp('delivered_at')->nullable();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deliveries');
    }
};
