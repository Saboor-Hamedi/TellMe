<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Inertia\Inertia;

class FrontController extends Controller
{
    public function home()
    {
        return Inertia::render('/');
    }

    public function index()
    {
        $posts = Post::with('user')->latest()->get();

        return Inertia::render('welcome', [
            'posts' => [
                'data' => $posts, // Wrap $posts in an object with a data property
            ],
        ]);
    }

    public function show(Post $post)
    {
        $post = $post->load('user');

        return Inertia::render('front/Show', [
            'post' => $post,
        ]);
    }
}
