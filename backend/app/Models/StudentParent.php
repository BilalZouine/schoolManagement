<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class StudentParent extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillabel = [
        'firstname',
        'lastname',
        'email',
        'password',
        'gender',
        'blood_type',
        'address',
        'phone',
        'date_of_birth',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at',
        'deleted_at',
    ];
}
