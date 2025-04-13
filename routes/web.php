<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Post\FrontController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FrontController::class, 'index'])->name('home');
Route::get('/front/{post}', [FrontController::class, 'show'])->name('front.show');
Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');
    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::get('/post/index', [PostController::class, 'index'])->name('post.index');
    Route::get('/post/create', [PostController::class, 'create'])->name('post.create');
    Route::post('/post', [PostController::class, 'store'])->name('post.store');
    Route::delete('/post/{post}', [PostController::class, 'destroy'])->name('post.destroy');
    Route::get('/post/{post}/edit', [PostController::class, 'edit'])->name('post.edit');
    Route::put('/post/{post}', [PostController::class, 'update'])->name('post.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
