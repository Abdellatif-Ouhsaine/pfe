<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SpecialOffer extends Model
{
    use HasFactory;

    protected $fillable = [
        'restaurant_id', 'title', 'description', 'image',
        'discount_percentage', 'discount_amount',
        'start_date', 'end_date', 'start_time', 'end_time', 'is_active'
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
