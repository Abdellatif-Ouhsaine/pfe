<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livreur extends Model {
    use HasFactory;

    protected $fillable = ['utilisateur_id', 'disponibilite', 'vehicule'];

    public function utilisateur() {
        return $this->belongsTo(Utilisateur::class);
    }

    public function commandes() {
        return $this->hasMany(Commande::class);
    }
}
