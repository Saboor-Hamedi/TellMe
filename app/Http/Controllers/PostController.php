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
        $posts = Post::orderBy('created_at', 'desc')->paginate(3);
        $userId = Auth::id();
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
        $validateData =  $this->validateService->postValidation($request);
        $validateData['user_id'] = Auth::user()->id;
        $validateData['is_public'] = $request->boolean('is_public');
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('postImages'), $imageName);
            $validateData['image'] = $imageName;
        }
        $post = Post::create($validateData);
        if ($post) {
            return redirect()->route('post.index')->with('success', 'Post created successfully!');
        }
        return redirect()->back()->with('error', 'Post creation failed!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

  
    public function edit(Post $post)
    {
        return Inertia::render('post/Edit', ['post' => $post]);
    }

    
    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);
        $validateData =  $this->validateService->postValidation($request);
        $validateData['user_id'] = Auth::user()->id;
        $validateData['is_public'] = $request->boolean('is_public');
        if($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('postImages'), $imageName);
            $this->imageDelete->deleteImageIfExists($post->image, 'postImages');
            $validateData['image'] = $imageName;
        }else{
            $validateData['image'] = $post->image;
        }
        // dd($post);
        $post->update($validateData);
        return redirect()->route('post.index')->with('success', 'Post updated successfully!');
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
