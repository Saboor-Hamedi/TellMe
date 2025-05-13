<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class ImageDelete
{
    public function deleteImageIfExists(?string $imagePath, string $directory = 'postImages')
    {
        if (!$imagePath) {
            return false;
        }

        // Handle full storage path or relative path
        $storagePath = str_starts_with($imagePath, $directory.'/') 
            ? $imagePath 
            : $directory.'/'.$imagePath;

        if (Storage::disk('public')->exists($storagePath)) {
            return Storage::disk('public')->delete($storagePath);
        }

        return false;
    }
}