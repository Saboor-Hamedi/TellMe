<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Post\FrontController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\profile\ProfileController;
use App\Http\Controllers\scrape\ScrapeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [FrontController::class, 'index'])->name('home');
Route::get('/front/{post}', [FrontController::class, 'show'])->name('front.show');
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::get('/post/index', [PostController::class, 'index'])->name('post.index');
    Route::get('/post/create', [PostController::class, 'create'])->name('post.create');
    Route::post('/post', [PostController::class, 'store'])->name('post.store');
    Route::delete('/post/{post}', [PostController::class, 'destroy'])->name('post.destroy');
    Route::get('/post/{post}/show', [PostController::class, 'show'])->name('post.show');
    Route::get('/post/{post}/edit', [PostController::class, 'edit'])->name('post.edit');
    Route::put('/post/{post}', [PostController::class, 'update'])->name('post.update');
    Route::patch('/post/{post}/visibility', [PostController::class, 'postVisibility'])->name('post.PostVisibility');
});

// public profile
Route::get('/profile/{user:name}', [ProfileController::class, 'profile'])->name('profile');
Route::post('/profile/uploadBGImage', [ProfileController::class, 'uploadBGImage']);
Route::post('/profile/uploadProfilePicture', [ProfileController::class, 'uploadProfilePicture']);

// scraps
Route::get('/scrape', [ScrapeController::class, 'index'])->name('scrape.index');
Route::post('/scrape/process', [ScrapeController::class, 'process'])->name('scrape.process');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
