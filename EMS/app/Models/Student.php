<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class student extends Model
{
    use HasFactory;

    protected $table = 'table_student';

    // Define the fillable fields
    protected $fillable = [
        'name', 'mbiemri', 'email', 'password', 'roli'
    ];

}
