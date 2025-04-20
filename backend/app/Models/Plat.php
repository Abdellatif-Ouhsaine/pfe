<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plat extends Model {
    use HasFactory;

    protected $fillable = ['nom', 'prix', 'description', 'disponible', 'restaurant_id'];

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }

    public function menus() {
        return $this->belongsToMany(Menu::class, 'menu_plat');
    }

    public function commandes() {
        return $this->belongsToMany(Commande::class, 'commande_plat')->withPivot('quantite');
    }
}