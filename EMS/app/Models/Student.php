<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;

    protected $table = 'table_student';

    // Define the fillable fields
    protected $fillable = [
        'Emri', 'Mbiemri', 'Email', 'password', 'Roli', 'Viti', 'Mesatarja'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
