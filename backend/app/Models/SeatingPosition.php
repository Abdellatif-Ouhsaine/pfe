<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SeatingPosition extends Model
{
    use HasFactory;

    protected $fillable = [
    'restaurant_id',
    'seating_area_id',
    'label', // au lieu de 'name'
    'capacity',
    'is_available'
    ];


    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function reservations()
    {
    return $this->hasMany(Reservation::class);
    }

    public function seatingArea()
    {
    return $this->belongsTo(SeatingArea::class);
    }


}
