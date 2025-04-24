<?php

namespace App\Http\Controllers\profile;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User;
use App\Services\PreviousURL;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function profile(User $user)
    {
        // $user->load(['profile','posts'  => function ($query) {
        //     $query->select('id', 'user_id', 'title', 'content', 'image', 'is_public', 'created_at')
        //         ->latest();
        // }]);

        $user = User::query()
        ->with(['profile', 'posts' => function ($query) {
                $query->select('id', 'user_id', 'title', 'content', 'image', 'is_public', 'created_at')
                    ->with('user')
                    ->latest();
            }])
            ->where('id', $user->id)
            ->first();

        // previous url for back button
        $backUrl = PreviousURL::toPreviousURL('previousURL');

        return Inertia::render('profile/Profile', [
            'user' => $user,
            'backUrl' => $backUrl, ]);
    }
}
