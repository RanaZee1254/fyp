<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class ParentProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'student_name',
        'student_class',
        'student_age',
        'image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
