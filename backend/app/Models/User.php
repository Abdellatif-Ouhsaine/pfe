<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Utilisateur extends Model {
    use HasFactory;

    protected $fillable = ['nom', 'email', 'password', 'role'];
    protected $hidden = ['password'];

    public function client() {
        return $this->hasOne(Client::class);
    }

    public function livreur() {
        return $this->hasOne(Livreur::class);
    }

    public function proprietaire() {
        return $this->hasOne(Proprietaire::class);
    }
}
