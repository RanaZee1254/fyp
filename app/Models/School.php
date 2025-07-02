<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'reg_no',
        'affiliation',
        'level',
        'address',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
