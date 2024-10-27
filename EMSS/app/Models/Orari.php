<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orari extends Model
{
    use HasFactory;
    protected $table = 'orari';

    // Define the fillable fields
    protected $fillable = [
        'ora','dita','lenda', 'viti'
    ];
}
