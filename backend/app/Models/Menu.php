<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'category',
        'discount',
        'image',
        'restaurant_id',
        'type'
    ];

    /**
     * Relation avec le modèle Restaurant
     */
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}