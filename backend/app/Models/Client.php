<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model {
    use HasFactory;

    protected $fillable = ['utilisateur_id', 'adresse', 'localisation'];

    public function utilisateur() {
        return $this->belongsTo(Utilisateur::class);
    }

    public function commandes() {
        return $this->hasMany(Commande::class);
    }

    public function avis() {
        return $this->hasMany(Avis::class);
    }

    public function reservations() {
        return $this->hasMany(Reservation::class);
    }
}
