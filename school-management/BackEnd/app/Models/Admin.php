<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;



    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'phone',
        'gender',
        'date_of_birth',
        'blode_type',
        'password',
    ];

    protected $appends = ['role'];

    public function getRoleAttribute()
    {
        return 'admin';
    }

    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at',
        'deleted_at',
    ];
}
