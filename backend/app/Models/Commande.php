<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model {
    use HasFactory;

    protected $fillable = ['client_id', 'livreur_id', 'total', 'statut'];

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function livreur() {
        return $this->belongsTo(Livreur::class);
    }

    public function plats() {
        return $this->belongsToMany(Plat::class, 'commande_plat')->withPivot('quantite');
    }

    public function paiement() {
        return $this->hasOne(Paiement::class);
    }
}
