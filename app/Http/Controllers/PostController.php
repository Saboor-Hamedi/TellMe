<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Services\ImageDelete;
use App\Services\ValidateService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    use AuthorizesRequests;

    protected $validateService;

    protected $imageDelete;

    public function __construct(ValidateService $validateService, ImageDelete $imageDelete)
    {
        $this->validateService = $validateService;
        $this->imageDelete = $imageDelete;
    }

    public function index()
    {
        $userId = Auth::id();
        $posts = Post::latest()
            ->where('user_id', $userId)
            ->paginate(100);

        return Inertia::render('post/Index',
            [
                'posts' => $posts,
                'user_id' => $userId,
            ]);
    }

    public function create()
    {
        return Inertia::render('post/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', Post::class);
        $validateData = $this->validateService->postValidation($request);
        $validateData['user_id'] = Auth::user()->id;
        $validateData['is_public'] = $request->boolean('is_public');

        if ($request->hasFile('image')) {
            // $image = $request->file('image');
            // $imageName = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();
            // $image->move(public_path('postImages'), $imageName);
            $path = $request->file('image')->store('postImages', 'public');
            $validateData['image'] = $path;
        }
        $post = Post::create($validateData);
        if ($post) {
            return redirect()->route('post.index')->with('success', 'Post created successfully!');
        }

        return redirect()->back()->with('error', 'Post creation failed!');
    }

    public function show(Post $post)
    {
        try {
            $this->authorize('view', $post);

            return Inertia::render('post/Show', [
                'post' => $post,
            ]);
        } catch (\Illuminate\Auth\Access\AuthorizationException $e) {
            return redirect()->route('post.index')->with('error', 'ID not found');
        }
    }

    public function edit(Post $post)
    {
        return Inertia::render('post/Edit', ['post' => $post]);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);
        $validateData = $this->validateService->postValidation($request);
        $validateData['user_id'] = Auth::user()->id;
        $validateData['is_public'] = $request->boolean('is_public');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('postImages', 'public');
            $validateData['image'] = $path;
            // Delete the old image if it exists
            if($post->image) {
                $this->imageDelete->deleteImageIfExists($post->image);
            }
        } else {
             // Keep existing image if no new one was uploaded
            $validateData['image'] = $post->image;
        }
        $post->update($validateData);

        return redirect()->route('post.index')->with('success', 'Post updated successfully!');
    }

    public function postVisibility(Request $request, Post $post)
    {
        $this->authorize('update', $post);
        $post->load('user');
        $post->update([
            'is_public' => ! $post->is_public,
        ]);

        return response()->json([
            'success' => true,
            'is_public' => $post->is_public,
            'message' => $post->is_public ? 'Post public' : 'Post private',
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();
        $this->imageDelete->deleteImageIfExists($post->image, 'postImages');

        return redirect()->route('post.index');
    }
}
