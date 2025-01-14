<?php

use App\Http\Controllers\AdminAreaController;
use App\Http\Controllers\AdminCategoryController;
use App\Http\Controllers\AdminDeveloperController;
use App\Http\Controllers\AdminLocationController;
use App\Http\Controllers\AdminPropertyController;
use App\Http\Controllers\AdminBannerController;
use App\Http\Controllers\AdminTestimonyController;
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
        return Inertia::render("Admin/Dashboards/AdminDashboardPage");
    })->name('dashboard');

    // Route::get('/property', function () {
    //     return Inertia::render("Admin/Properties/AdminPropertyPage");
    // })->name('dashboard.property');

    Route::get('/property', [AdminPropertyController::class, 'index'])->name('dashboard.property');
    Route::get('/property/create', [AdminPropertyController::class, 'create'])->name('dashboard.property.create');
    Route::post('/property', [AdminPropertyController::class, 'store'])->name('dashboard.property.store');
    Route::get('/property/{id}', [AdminPropertyController::class, 'edit'])->name('dashboard.property.edit');
    Route::put('/property/{id}', [AdminPropertyController::class, 'update'])->name('dashboard.property.update');
    Route::delete('/property/{id}', [AdminPropertyController::class, 'delete'])->name('dashboard.property.delete');

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
            'locations' => \App\Models\Location::with('area')->paginate(8)
        ]);
    })->name('dashboard.location');
    Route::post("/location", [AdminLocationController::class, "store"])->name("location.store");
    Route::put("/location/{id}", [AdminLocationController::class, "update"])->name("location.update");
    Route::delete("/location/{id}", [AdminLocationController::class, "destroy"])->name("location.destroy");

    Route::get('/category', function () {
        return Inertia::render("Admin/Categories/AdminCategoryPage", [
            'categories' => \App\Models\Category::paginate(8)
        ]);
    })->name('dashboard.category');

    Route::post("/category", [AdminCategoryController::class, "store"])->name("category.store");
    Route::put("/category/{id}", [AdminCategoryController::class, "update"])->name("category.update");
    Route::delete("/category/{id}", [AdminCategoryController::class, "destroy"])->name("category.destroy");

    // Route::resource("/category", AdminCategoryController::class);

    Route::get('/developer', function () {
        return Inertia::render("Admin/Developers/AdminDeveloperPage", [
            'developers' => \App\Models\Developer::paginate(8),
        ]);
    })->name('dashboard.developer');
    Route::post("/developer", [AdminDeveloperController::class, "store"])->name('developer.store');
    Route::put("/developer/{id}", [AdminDeveloperController::class, "update"])->name('developer.update');
    Route::delete("/developer/{id}", [AdminDeveloperController::class, "destroy"])->name('developer.destroy');


    Route::get('/banner', function () {
        return Inertia::render("Admin/Banner/AdminBannerPage", [
            'banners' => \App\Models\Banner::paginate(8)
        ]);
    })->name('dashboard.banner');

    Route::post("/banner", [AdminBannerController::class, "store"])->name("banner.store");
    Route::put("/banner/{id}", [AdminBannerController::class, "update"])->name("banner.update");
    Route::delete("/banner/{id}", [AdminBannerController::class, "destroy"])->name("banner.destroy");

    Route::get('/testimony', function () {
        return Inertia::render("Admin/Testimonies/AdminTestimonyPage", [
            'testimonies' => \App\Models\Testimony::paginate(8)
        ]);
    })->name('dashboard.testimony');

    Route::post("/testimony", [AdminTestimonyController::class, "store"])->name("testimony.store");
    Route::put("/testimony/{id}", [AdminTestimonyController::class, "update"])->name("testimony.update");
    Route::delete("/testimony/{id}", [AdminTestimonyController::class, "destroy"])->name("testimony.destroy");

    //Web Pref
    Route::get('/web-preferences', function () {
        return Inertia::render("Admin/WebPreferences/WebPreferences");
    })->name('dashboard.web-preferences');

    //AGENT
    Route::get('/agent', function () {
        return Inertia::render("Admin/AdminPageOne");
    })->name('dashboard.agent');

    Route::get('/customer', function () {
        return Inertia::render("Admin/AdminPageOne");
    })->name('dashboard.customer');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Web Pref
Route::get('web-preferences/{key}', [WebPreferencesController::class, 'getWebPreference'])->name('web-preferences.get');
Route::post('web-preferences', [WebPreferencesController::class, 'updateWebPreference'])->name("web-preferences.post");


