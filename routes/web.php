<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get("/", [HomeController::class, 'index']);

Route::get('/search', function () {
    return Inertia::render("Search/Search");
});

Route::prefix('/dashboard')->middleware(['auth', 'verified'])->group(function (){
    Route::get('', function () {
        return Inertia::render("Admin/AdminPageOne");
    })->name('dashboard');

    Route::get('/property', function () {
        return Inertia::render("Admin/AdminPageTwo");
    })->name('dashboard.property');

    Route::get('/area', function () {
        return Inertia::render("Admin/AdminPageThree");
    })->name('dashboard.area');

    Route::get('/category', function () {
        return Inertia::render("Admin/AdminPageTwo");
    })->name('dashboard.category');

    Route::get('/developer', function () {
        return Inertia::render("Admin/AdminPageThree");
    })->name('dashboard.developer');

    Route::get('/banner', function () {
        return Inertia::render("Admin/Banner");
    })->name('dashboard.banner');

    Route::get('/testimony', function () {
        return Inertia::render("Admin/AdminPageThree");
    })->name('dashboard.testimony');

    Route::get('/web-preferences', function () {
        return Inertia::render("Admin/AdminPageTwo");
    })->name('dashboard.web-preferences');

    Route::get('/agent', function () {
        return Inertia::render("Admin/AdminPageThree");
    })->name('dashboard.agent');

    Route::get('/customer', function () {
        return Inertia::render("Admin/AdminPageThree");
    })->name('dashboard.customer');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
