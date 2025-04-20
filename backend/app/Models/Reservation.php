<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model {
    use HasFactory;

    protected $fillable = ['client_id', 'restaurant_id', 'date_heure', 'nombre_personnes', 'statut', 'type'];

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }
}
