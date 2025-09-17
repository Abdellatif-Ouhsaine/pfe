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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('restaurant_id')->constrained()->onDelete('cascade');
            $table->foreignId('rider_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('order_number')->unique();
            $table->enum('status', ['pending', 'processing', 'out_for_delivery', 'delivered', 'cancelled'])->default('pending');
            $table->text('delivery_address');
            $table->string('contact_number');
            $table->text('special_instructions')->nullable();
            $table->decimal('subtotal', 8, 2);
            $table->decimal('delivery_fee', 8, 2);
            $table->decimal('total', 8, 2);
            $table->enum('payment_method', ['cash', 'credit_card', 'mobile_payment']);
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending');
            $table->timestamp('delivered_at')->nullable();
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
