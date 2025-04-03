<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        $posts = Post::orderBy('created_at', 'desc')->paginate(3);

        return Inertia::render('post/Index', ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('post/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Post::class);
        $validateData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $validateData['user_id'] = Auth::user()->id;
        // $validateData['is_public'] = $request->has('is_public');
        $validateData['is_public'] = $request->boolean('is_public');

        $post = Post::create($validateData);
        if ($post) {
            return redirect()->route('post.create');

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('post/Edit', ['post' => $post]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {

        $this->authorize('update', $post);

        $validate = $request->validate([
            'title' => 'required|string|min:1|max:255',
            'content' => 'required|string|min:1',
            'is_public' => 'sometimes|boolean', 
        ]);

        $validate['user_id'] = Auth::user()->id;
        $validate['is_public'] = $request->boolean('is_public');

        $post->update($validate);
        return redirect()->route('post.index')->with('success', 'Post updated successfully!');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();

        return redirect()->route('post.index');
    }
}
