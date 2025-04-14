<?php

use App\Http\Controllers\Api\ChatController;
use Illuminate\Support\Facades\Route;

Route::prefix('chat')->group(function () {
    Route::post('/', [ChatController::class, 'chat']);
});
