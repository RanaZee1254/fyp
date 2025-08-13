<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolProfile extends Model
{
    use HasFactory;
    protected $fillable = [
        'school_name',
        'user_id',
        'reg_no',
        'address',
        'affiliation',
        'level',
        'image',
        'contact_number',];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
