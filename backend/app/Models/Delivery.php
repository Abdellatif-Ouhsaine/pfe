<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    protected $fillable = [
        'driver_id', 'restaurant_name', 'pickup_address',
        'customer_name', 'delivery_address', 'contact_number',
        'items', 'instructions', 'status', 'delivery_fee',
        'driver_earning', 'payment_status', 'estimated_delivery'
    ];

    protected $casts = [
        'items' => 'array',
        'estimated_delivery' => 'datetime'
    ];
}