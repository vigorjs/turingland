<?php

use App\Http\Controllers\AdminAreaController;
use App\Http\Controllers\AdminCategoryController;
use App\Http\Controllers\AdminDeveloperController;
use App\Http\Controllers\AdminLocationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminSettingController;
use App\Http\Controllers\WebPreferencesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
require __DIR__.'/auth.php';


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
        return Inertia::render("Admin/Areas/AdminAreaPage", [
            'areas' => \App\Models\Area::all()
        ]);
    })->name('dashboard.area');
    Route::post("/area", [AdminAreaController::class, "store"])->name("area.store");
    Route::put("/area/{id}", [AdminAreaController::class, "update"])->name("area.update");
    Route::delete("/area/{id}", [AdminAreaController::class, "destroy"])->name("area.destroy");

    Route::get('/location', function () {
        return Inertia::render("Admin/Locations/AdminLocationPage", [
            'areas' => \App\Models\Area::all(),
            'locations' => \App\Models\Location::with('area')->get()
        ]);
    })->name('dashboard.location');
    Route::post("/location", [AdminLocationController::class, "store"])->name("location.store");
    Route::put("/location/{id}", [AdminLocationController::class, "update"])->name("location.update");
    Route::delete("/location/{id}", [AdminLocationController::class, "destroy"])->name("location.destroy");

    Route::get('/category', function () {
        return Inertia::render("Admin/Categories/AdminCategoryPage", [
            'categories' => \App\Models\Category::all()
        ]);
    })->name('dashboard.category');

    Route::post("/category", [AdminCategoryController::class, "store"])->name("category.store");
    Route::put("/category/{id}", [AdminCategoryController::class, "update"])->name("category.update");
    Route::delete("/category/{id}", [AdminCategoryController::class, "destroy"])->name("category.destroy");

    // Route::resource("/category", AdminCategoryController::class);

    Route::get('/developer', function () {
        return Inertia::render("Admin/Developers/AdminDeveloperPage", [
            'developers' => \App\Models\Developer::all(),
        ]);
    })->name('dashboard.developer');
    Route::post("/developer", [AdminDeveloperController::class, "store"])->name('developer.store');
    Route::put("/developer/{id}", [AdminDeveloperController::class, "update"])->name('developer.update');
    Route::delete("/developer/{id}", [AdminDeveloperController::class, "destroy"])->name('developer.destroy');


    Route::get('/banner', function () {
        return Inertia::render("Admin/AdminPageTwo");
    })->name('dashboard.banner');

    Route::get('/testimony', function () {
        return Inertia::render("Admin/AdminPageThree");
    })->name('dashboard.testimony');

    //Web Pref
    Route::get('/web-preferences', function () {
        return Inertia::render("Admin/AdminSetting");
    })->name('dashboard.web-preferences');

    //AGENT
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

Route::get('web-preferences/{key}', [WebPreferencesController::class, 'getWebPreference'])->name('web-preferences.get');
Route::post('web-preferences', [WebPreferencesController::class, 'updateWebPreference'])->name("web-preferences.post");


