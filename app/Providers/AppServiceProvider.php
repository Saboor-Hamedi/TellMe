<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Model::unguard();
        Model::automaticallyEagerLoadRelationships();
        Model::shouldBeStrict(! app()->isProduction());

        // change the name of the route parameter to be case insensitive.
        Route::bind('user', function ($value) {
            return User::whereRaw('LOWER(name) = ?', [strtolower($value)])->firstOrFail();
        });
        Inertia::share([
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error' => session('error'),
                    'errors' => session('errors'),
                ];
            },
        ]);
    }
}
