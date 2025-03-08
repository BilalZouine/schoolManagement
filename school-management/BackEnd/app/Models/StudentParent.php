<?php

namespace App\Models;



use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class StudentParent extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'password',
        'gender',
        'last_login_date',
        'blood_type',
        'address',
        'phone',
        'date_of_birth',
    ];

    
    
    protected $appends = ['role'];

    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at',
        'deleted_at',
        "last_login_date"
    ];

    public function getRoleAttribute()
    {
        return 'parent';
    }
}
