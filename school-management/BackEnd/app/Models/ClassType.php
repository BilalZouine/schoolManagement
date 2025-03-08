<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClassType extends Model
{
    use SoftDeletes;

    protected function classes(){
        return $this->hasMany(Classe::class);
    }
}
