<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes (Portal Mahasiswa & Publik S1 PIAUD)
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/profil', function () {
    return Inertia::render('Public/Profile');
})->name('profile');

Route::get('/akademik', function () {
    return Inertia::render('Public/Academic');
})->name('academic');

Route::get('/dosen', function () {
    return Inertia::render('Public/Lecturers');
})->name('lecturers');

Route::get('/artikel', function () {
    return Inertia::render('Public/Articles');
})->name('articles');

Route::get('/galeri', function () {
    return Inertia::render('Public/Gallery');
})->name('gallery');

Route::get('/kontak', function () {
    return Inertia::render('Public/Contact');
})->name('contact');

/*
|--------------------------------------------------------------------------
| Authenticated / Admin Panel Routes
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
