<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RiderStatus extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'status', 'current_lat', 'current_lng'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
