<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; 
use Illuminate\Notifications\Notifiable;

class Driver extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'phone', 'password', 
        'status', 'delivery_zone', 'rating',
        'total_deliveries', 'total_hours'
    ];

    protected $hidden = ['password'];

    public function deliveries()
    {
        return $this->hasMany(Delivery::class);
    }
}
