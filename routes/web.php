<?php

use App\Http\Controllers\PostController;
use App\Livewire\Counter;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    
    Route::get('/post/create', [PostController::class, 'index'])->name('post.create');
    Route::post('/post', [PostController::class, 'store'])->name('post.store');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
