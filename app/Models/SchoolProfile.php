<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id',
        'reg_no',
        'affiliation',
        'level',
        'image',
        'contact_number',];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
