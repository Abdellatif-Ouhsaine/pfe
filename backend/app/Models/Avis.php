<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avis extends Model {
    use HasFactory;

    protected $fillable = ['client_id', 'restaurant_id', 'note', 'commentaire'];

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }
}
