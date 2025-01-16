<?php

use App\Http\Controllers\AdminAreaController;
use App\Http\Controllers\AdminCategoryController;
use App\Http\Controllers\AdminDeveloperController;
use App\Http\Controllers\AdminLocationController;
use App\Http\Controllers\AdminPropertyController;
use App\Http\Controllers\AdminBannerController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminTestimonyController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebPreferencesController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
require __DIR__.'/auth.php';

Route::get("/", [HomeController::class, 'index'])->name('homepage');
Route::get('/property/{id}', [PropertyController::class, 'show'])->name('property.show');
Route::get('/search', function () {
    return Inertia::render("Search/Search");
});

// PROFILE
Route::get('/dashboard/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/dashboard/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/dashboard/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

Route::prefix('/dashboard')->middleware(['auth', 'verified', 'role:admin|agent'])->group(function (){
    Route::get('users/export/', [UserController::class, 'export'])->middleware('role:admin');
    // DASHBOARD
    Route::get('', [AdminDashboardController::class, 'index'])->middleware('role:admin')->name('dashboard');

    // PROPERTI
    Route::get('/property', [AdminPropertyController::class, 'index'])->middleware('role:admin|agent')->name('dashboard.property');
    Route::get('/property/create', [AdminPropertyController::class, 'create'])->middleware('role:admin|agent')->name('dashboard.property.create');
    Route::get('/property/{id}', [AdminPropertyController::class, 'detail'])->middleware('role:admin|agent')->name('dashboard.property.detail');
    Route::post('/property', [AdminPropertyController::class, 'store'])->middleware('role:admin|agent')->name('dashboard.property.store');
    Route::get('/property/{id}/edit', [AdminPropertyController::class, 'edit'])->middleware('role:admin|agent')->name('dashboard.property.edit');
    Route::put('/property/{id}', [AdminPropertyController::class, 'update'])->middleware('role:admin|agent')->name('dashboard.property.update');
    Route::delete('/property/{id}', [AdminPropertyController::class, 'delete'])->middleware('role:admin|agent')->name('dashboard.property.delete');
    Route::get('/property/file/exports', [AdminPropertyController::class, 'export'])->middleware('role:admin|agent')->name('dashboard.property.export');

    // AREA
    Route::get('/area', function () {
        return Inertia::render("Admin/Areas/AdminAreaPage", [
            'areas' => \App\Models\Area::paginate(8)
        ]);
    })->middleware('role:admin')->name('dashboard.area');
    Route::post("/area", [AdminAreaController::class, "store"])->middleware('role:admin')->name("area.store");
    Route::put("/area/{id}", [AdminAreaController::class, "update"])->middleware('role:admin')->name("area.update");
    Route::delete("/area/{id}", [AdminAreaController::class, "destroy"])->middleware('role:admin')->name("area.destroy");

    // LOCATION
    Route::get('/location', function () {
        return Inertia::render("Admin/Locations/AdminLocationPage", [
            'areas' => \App\Models\Area::all(),
            'locations' => \App\Models\Location::with('area')->paginate(8)
        ]);
    })->middleware('role:admin')->name('dashboard.location');
    Route::post("/location", [AdminLocationController::class, "store"])->middleware('role:admin')->name("location.store");
    Route::put("/location/{id}", [AdminLocationController::class, "update"])->middleware('role:admin')->name("location.update");
    Route::delete("/location/{id}", [AdminLocationController::class, "destroy"])->middleware('role:admin')->name("location.destroy");

    // CATEGORY
    Route::get('/category', function () {
        return Inertia::render("Admin/Categories/AdminCategoryPage", [
            'categories' => \App\Models\Category::paginate(8)
        ]);
    })->middleware('role:admin')->name('dashboard.category');
    Route::post("/category", [AdminCategoryController::class, "store"])->middleware('role:admin')->name("category.store");
    Route::put("/category/{id}", [AdminCategoryController::class, "update"])->middleware('role:admin')->name("category.update");
    Route::delete("/category/{id}", [AdminCategoryController::class, "destroy"])->middleware('role:admin')->name("category.destroy");

    //DEVELOPER
    Route::get('/developer', function () {
        return Inertia::render("Admin/Developers/AdminDeveloperPage", [
            'developers' => \App\Models\Developer::paginate(8),
        ]);
    })->middleware('role:admin')->name('dashboard.developer');
    Route::post("/developer", [AdminDeveloperController::class, "store"])->middleware('role:admin')->name('developer.store');
    Route::put("/developer/{id}", [AdminDeveloperController::class, "update"])->middleware('role:admin')->name('developer.update');
    Route::delete("/developer/{id}", [AdminDeveloperController::class, "destroy"])->middleware('role:admin')->name('developer.destroy');

    // BANNER
    Route::get('/banner', function () {
        return Inertia::render("Admin/Banner/AdminBannerPage", [
            'banners' => \App\Models\Banner::paginate(8)
        ]);
    })->middleware('role:admin')->name('dashboard.banner');
    Route::post("/banner", [AdminBannerController::class, "store"])->middleware('role:admin')->name("banner.store");
    Route::put("/banner/{id}", [AdminBannerController::class, "update"])->middleware('role:admin')->name("banner.update");
    Route::delete("/banner/{id}", [AdminBannerController::class, "destroy"])->middleware('role:admin')->name("banner.destroy");

    //TESTIMONY
    Route::get('/testimony', function () {
        return Inertia::render("Admin/Testimonies/AdminTestimonyPage", [
            'testimonies' => \App\Models\Testimony::paginate(8)
        ]);
    })->middleware('role:admin')->name('dashboard.testimony');
    Route::post("/testimony", [AdminTestimonyController::class, "store"])->middleware('role:admin')->name("testimony.store");
    Route::put("/testimony/{id}", [AdminTestimonyController::class, "update"])->middleware('role:admin')->name("testimony.update");
    Route::delete("/testimony/{id}", [AdminTestimonyController::class, "destroy"])->middleware('role:admin')->name("testimony.destroy");

    //Web Pref
    Route::get('/web-preferences', function () {
        return Inertia::render("Admin/WebPreferences/WebPreferences");
    })->middleware('role:admin')->name('dashboard.web-preferences');
Route::post('web-preferences', [WebPreferencesController::class, 'updateWebPreference'])->name("web-preferences.post");


    //AGENT
    Route::get('/agent', [AgentController::class, "index"])->middleware('role:admin')->name('dashboard.agent');
    Route::post('/agent', [AgentController::class, "store"])->middleware('role:admin')->name('dashboard.agent.store');
    Route::put('/agent/{id}', [AgentController::class, "update"])->middleware('role:admin')->name('dashboard.agent.update');

    //CUSTOMER
    Route::get('/customer', function () {
        return Inertia::render("Admin/Customer/AdminCustomerPage", [
            'customers' => User::role('customer')->with('roles')->paginate(8)
        ]);
    })->middleware('role:admin')->name('dashboard.customer');
});

//Web Pref
Route::get('web-preferences/{key}', [WebPreferencesController::class, 'getWebPreference'])->name('web-preferences.get');


