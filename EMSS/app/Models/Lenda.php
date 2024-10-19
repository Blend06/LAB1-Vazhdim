<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lenda extends Model
{
    use HasFactory;
    protected $table = 'lenda';

    // Define the fillable fields
    protected $fillable = [
        'emri', 'viti'
    ];
}
