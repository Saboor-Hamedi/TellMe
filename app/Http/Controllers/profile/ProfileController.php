<?php

namespace App\Http\Controllers\profile;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function profile() {
        return Inertia::render('profile/Profile');
    }
}
