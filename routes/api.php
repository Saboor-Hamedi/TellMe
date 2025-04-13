<?php
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ChatController;
Route::prefix('chat')->group(function () {
    Route::post('/', [ChatController::class, 'chat']);
});
