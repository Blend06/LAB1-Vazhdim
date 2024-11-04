<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nota extends Model
{
    use HasFactory;

    protected $table = 'nota';

    // Define the fillable fields
    protected $fillable = [
        'user_id','Lenda','Nota'
    ];
}
