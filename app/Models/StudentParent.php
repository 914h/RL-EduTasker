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
    use HasApiTokens, HasFactory,Notifiable, SoftDeletes;
    protected $fillable = [
        'prenom',
        'nom',
        'birthdate',
        'gender',
        'address',
        'email',
        'phone',
        'password',
    ];
    protected $hidden = [
        'password',
        'deleted_at',
        'created_at',
    ];
    protected $casts = [
        'birthdate' => 'date:Y-m-d',
    ];

    protected $appends = ['role'];


    public function getRoleAttribute(){
        return 'parent';
    }
}
