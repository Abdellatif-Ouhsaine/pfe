<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model {
    use HasFactory;

    protected $fillable = ['nom', 'localisation', 'capacite', 'proprietaire_id'];

    public function proprietaire() {
        return $this->belongsTo(Proprietaire::class);
    }

    public function menus() {
        return $this->hasMany(Menu::class);
    }

    public function plats() {
        return $this->hasMany(Plat::class);
    }

    public function avis() {
        return $this->hasMany(Avis::class);
    }

    public function reservations() {
        return $this->hasMany(Reservation::class);
    }
}