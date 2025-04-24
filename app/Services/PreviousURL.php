<?php

namespace App\Services;

class PreviousURL
{
    public static function toPreviousURL($url = 'home')
    {
        // Always update the return URL when coming from a different page
        if (url()->previous() !== url()->current()) {
            session([$url => url()->previous()]);
        }
        $backURL = url()->previous() !== url()->current()
            ? url()->previous()
            : session($url, route('home'));

        return $backURL;

    }
}
