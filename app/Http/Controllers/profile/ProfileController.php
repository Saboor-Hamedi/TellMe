<?php

namespace App\Http\Controllers\profile;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\PreviousURL;
use App\Services\ValidateService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    use AuthorizesRequests;
    protected $validateService;
    public function __construct(ValidateService $validateService)
    {
        $this->validateService = $validateService;
    }
    public function profile(User $user)
    {

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

    public function uploadBGImage( User $user,Request $request)
    {
        $this->validateService->validateImage($request, 'background');
      
        $user = $user->isAuthorized();
        try {
            if ($request->hasFile('background')) {
                $file = $request->file('background');
                $path = $file->store('profileBackgrounds', 'public');

                if ($user->profile && $user->profile->cover_image) {
                    Storage::disk('public')->delete($user->profile->cover_image);
                }
                $user->profile()->updateOrCreate(
                    ['user_id' => $user->id],
                    ['cover_image' => $path]
                );
                // Reload the user with the updated profile
                $updatedUser = User::query()
                    ->with(['profile', 'posts' => function ($query) {
                        $query->select('id', 'user_id', 'title', 'content', 'image', 'is_public', 'created_at')
                            ->with('user')
                            ->latest();
                    }])
                    ->where('id', $user->id)
                    ->first();
               
            }

            return redirect()->back()->with('error', 'No file uploaded');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update background');
        }
    }
    public function uploadProfilePicture(User $user, Request $request)
    {
        $this->validateService->validateImage($request, 'profile_image');
        $user = $user->isAuthorized();
        
        try {
            if ($request->hasFile('profile_image')) {
                $file = $request->file('profile_image');
                $path = $file->store('profileImages', 'public');

                if ($user->profile && $user->profile->profile_image) {
                    Storage::disk('public')->delete($user->profile->profile_image);
                }

                $user->profile()->updateOrCreate(
                    ['user_id' => $user->id],
                    ['profile_image' => $path]
                );

                $updatedUser = User::query()
                    ->with(['profile', 'posts' => function ($query) {
                        $query->select('id', 'user_id', 'title', 'content', 'image', 'is_public', 'created_at')
                            ->with('user')
                            ->latest();
                    }])
                    ->where('id', $user->id)
                    ->first();
            }

            return redirect()->back()->with('error', 'No file uploaded');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update background');
        }
    }
}
