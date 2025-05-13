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
        $user = $this->loadProfileData($user);

        return Inertia::render('profile/Profile', [
            'user' => $user,
            'backUrl' => PreviousURL::toPreviousURL('previousURL')]);
    }

    public function backgroundImage(Request $request)
    {
        $user = auth()->user();
        $this->authorize('update', $user->profile);
        $this->validateService->validateImage($request, 'background');

        return $this->handleUploadImages(
            $user, $request,
            'background',
            'cover_image',
            'backgroundImages',
        );
    }

    public function profileImage(Request $request)
    {
        $user = auth()->user();
        $this->authorize('update', $user->profile);
        $this->validateService->validateImage($request, 'profile_image');

        return $this->handleUploadImages(
            $user, $request,
            'profile_image',
            'profile_image',
            'profileImages',
        );
    }

    public function handleUploadImages(User $user, Request $request, string $inputName, string $dbField, string $storageFolder)
    {

        try {
            $this->validateService->validateImage($request, $inputName);
            if ($request->hasFile($inputName)) {
                $file = $request->file($inputName);
                $path = $file->store($storageFolder, 'public');

                $oldPath = $user->profile ? $user->profile->$dbField : null;
                $user->profile()->updateOrCreate(
                    ['user_id' => $user->id],
                    [$dbField => $path]
                );
                // Delete the old file if it exists
                if ($oldPath) {
                    Storage::disk('public')->delete($oldPath);
                }
                $message = $inputName === 'profile_image' ? 'Profile updated' : 'Background updated';

                return back()->with(['success' => $message]);
            }

            return back()->with(['error' => 'No file uploaded']);

        } catch (\Exception  $e) {
            return back()->with(['error' => 'Upload failed']);

        }
    }

    public function loadProfileData(User $user)
    {
        return User::query()
            ->with([
                'profile',
                'posts' => function ($query) {
                    $query->select('id', 'user_id', 'title', 'content', 'image', 'is_public', 'created_at')
                        ->with('user')
                        ->latest();
                }])
            ->where('id', $user->id)
            ->first();
    }
}
