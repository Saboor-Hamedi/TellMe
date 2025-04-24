<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    // User Profile
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
