<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'Contact_Number',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Relationships
    public function schoolProfile()
    {
        return $this->hasOne(School::class);
    }

    public function shopProfile()
    {
        return $this->hasOne(ShopProfile::class);
    }

    public function parentProfile()
    {
        return $this->hasOne(ParentProfile::class);
    }
}
