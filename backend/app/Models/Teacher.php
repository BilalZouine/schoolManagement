<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Teacher extends Authenticable
{
    use HasApiTokens, HasFactory, Notifiable,SoftDeletes;
    

    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at',
        'deleted_at',
    ];
    protected $appends = ['role'];

    public function getRoleAttribute()
    {
        return 'teacher';
    }
}
