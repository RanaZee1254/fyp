<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class SchoolProfile extends Model
{
   // protected $connection = 'schoolProfile';//
   // protected $table = 'school_profiles';
  use HasFactory;
    protected $fillable = [
        'name',
        'user_id',
        'reg_no',
        'affiliation',
        'level',
        'address',
        'image',
        'Contact_Number',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
