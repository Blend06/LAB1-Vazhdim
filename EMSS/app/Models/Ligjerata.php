<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ligjerata extends Model
{
    use HasFactory;
    protected $table = 'ligjerata';

    // Define the fillable fields
    protected $fillable = [
        'path','Lenda', 'Emri'
    ];
}
