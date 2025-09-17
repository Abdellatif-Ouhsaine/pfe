<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'cuisine_type',
        'address',
        'logo',
        'cover_image',
        'delivery_fee',
        'min_order',
        'business_type',
        'business_license',
        'agree_to_terms',
        'status',
        'admin_comment',
        'rating',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'agree_to_terms' => 'boolean',
        'delivery_fee' => 'float',
        'min_order' => 'float',
        'rating' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function menuItems()
    {
        return $this->hasMany(Menu::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function specialOffers()
    {
        return $this->hasMany(SpecialOffer::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function seatingPositions()
{
    return $this->hasMany(SeatingPosition::class);
}

}
