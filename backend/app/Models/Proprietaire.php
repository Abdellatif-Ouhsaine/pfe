<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proprietaire extends Model {
    use HasFactory;

    protected $fillable = ['utilisateur_id', 'telephone'];

    public function utilisateur() {
        return $this->belongsTo(Utilisateur::class);
    }

    public function restaurant() {
        return $this->hasOne(Restaurant::class);
    }
}
