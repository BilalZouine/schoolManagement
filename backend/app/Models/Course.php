<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
class Course extends Model
{
    use HasFactory, Notifiable,SoftDeletes;

    
    protected function classes(){
        return $this->hasMany(Classe::class);
    }
}
