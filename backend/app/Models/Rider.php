<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rider extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'vehicle_type',
        'vehicle_model',
        'license_plate',
        'id_document_path',
        'driving_license_path',
        'status'
    ];

    /**
     * Get the user that owns the rider profile.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
