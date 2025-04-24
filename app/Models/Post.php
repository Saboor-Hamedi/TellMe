<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $appends = ['author', 'lastname'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getAuthorAttribute()
    {
        return $this->user->name ?? 'Anonymous';
    }

    public function getLastnameAttribute()
    {
        return $this->user->profile->lastname ?? '';
    }
}
