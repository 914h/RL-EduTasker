<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class devoir extends Model
{
    use HasFactory , SoftDeletes;
    protected $fillable = [
        'title',
        'description',
        'file_path',
        'teacher_id',
        'class_id',
        'module_id',
    ];
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function class()
    {
        return $this->belongsTo(classe::class);
    }

    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
