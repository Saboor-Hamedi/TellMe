<?php

namespace App\Services;

use Illuminate\Http\Request;

class ValidateService
{
    /**
     * Validate a post creation request.
     *
     * @return array
     */
    public function postValidation(Request $request)
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_public' => 'sometimes|boolean',
        ]);
    }

    public function validateImage(Request $request, $imageName)
    {
        return $request->validate([
            $imageName => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    }
}
