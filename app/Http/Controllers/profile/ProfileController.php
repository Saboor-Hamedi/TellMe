<?php

namespace App\Http\Controllers\profile;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class ProfileController extends Controller
{
     public function profile(User $user)
    {
        $user->load(['posts' => function($query) {
            $query->select('id', 'user_id', 'title', 'content', 'image', 'is_public', 'created_at')
                  ->latest();
        }]);

        return Inertia::render('profile/Profile', [
            'user' => $user]);
    }
}
