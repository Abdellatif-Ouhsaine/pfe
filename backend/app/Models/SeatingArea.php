<?php

// app/Models/SeatingArea.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SeatingArea extends Model
{
    use HasFactory;

    protected $fillable = [
        'restaurant_id',
        'name',
        'image_url',
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function seatingPositions()
    {
        return $this->hasMany(SeatingPosition::class);
    }
}

