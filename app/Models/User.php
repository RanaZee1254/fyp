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
        'image',
        'contact_number',
        'address',
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
    return $this->hasOne(SchoolProfile::class);
}

public function parentProfile()
{
    return $this->hasOne(ParentProfile::class);
}

public function shopProfile()
{
    return $this->hasOne(ShopProfile::class);
}

}
