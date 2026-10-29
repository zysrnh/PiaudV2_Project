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
    $lecturers = \App\Models\Lecturer::where('is_active', true)->orderBy('order')->get()->map(function ($l) {
        return [
            'id' => $l->id,
            'name' => $l->name,
            'nip' => $l->nip ?: ($l->nidn ?: '-'),
            'role' => $l->role,
            'expertise' => $l->expertise,
            'photoUrl' => $l->photo_url ?: '/images/piaud/team-1.jpg',
        ];
    });

    $articles = \App\Models\Article::with('category')->latest()->get()->map(function ($a) {
        return [
            'id' => (string) $a->id,
            'title' => $a->title,
            'slug' => $a->slug,
            'category' => $a->category->name ?? 'Umum',
            'publishedAt' => $a->published_at ? $a->published_at->format('d M Y') : $a->created_at->format('d M Y'),
            'readTime' => $a->read_time ?? '5 menit baca',
            'excerpt' => $a->excerpt,
            'content' => $a->content,
            'photoUrl' => $a->photo_url ?: '/images/piaud/Foto-Kegiatan-1.jpg',
            'isFeatured' => (bool) $a->is_featured,
        ];
    });

    $galleries = \App\Models\Gallery::with('category')->orderBy('order')->latest()->get()->map(function ($g) {
        return [
            'id' => $g->id,
            'title' => $g->title,
            'photoUrl' => $g->photo_url ?: '/images/piaud/Foto-Kegiatan-1.jpg',
            'category' => $g->category->name ?? 'Praktikum APE',
            'date' => $g->date ?? 'Oktober 2026',
            'description' => $g->description ?? '',
        ];
    });

    return Inertia::render('Welcome', [
        'dbLecturers' => $lecturers,
        'dbArticles' => $articles,
        'dbGalleries' => $galleries,
    ]);
})->name('home');

Route::get('/profil', function () {
    return Inertia::render('Public/Profile');
})->name('profile');

Route::get('/sambutan-kaprodi', function () {
    return Inertia::render('Public/SambutanKaprodi');
})->name('sambutan.kaprodi');

Route::get('/akademik', function () {
    return Inertia::render('Public/Academic');
})->name('academic');

Route::get('/profil-lulusan', function () {
    return Inertia::render('Public/GraduateProfile');
})->name('graduate.profile');

Route::get('/laboratorium-ape', function () {
    return Inertia::render('Public/LaboratoriumApe');
})->name('lab.ape');

Route::get('/dosen', function () {
    $lecturers = \App\Models\Lecturer::where('is_active', true)->orderBy('order')->get()->map(function ($l) {
        return [
            'id' => $l->id,
            'name' => $l->name,
            'nip' => $l->nip ?: ($l->nidn ?: '-'),
            'role' => $l->role,
            'expertise' => $l->expertise,
            'photoUrl' => $l->photo_url ?: '/images/piaud/team-1.jpg',
        ];
    });

    return Inertia::render('Public/Lecturers', [
        'dbLecturers' => $lecturers,
    ]);
})->name('lecturers');

Route::get('/artikel', function () {
    $articles = \App\Models\Article::with('category')->latest()->get()->map(function ($a) {
        return [
            'id' => (string) $a->id,
            'title' => $a->title,
            'slug' => $a->slug,
            'category' => $a->category->name ?? 'Umum',
            'publishedAt' => $a->published_at ? $a->published_at->format('d M Y') : $a->created_at->format('d M Y'),
            'readTime' => $a->read_time ?? '5 menit baca',
            'excerpt' => $a->excerpt,
            'content' => $a->content,
            'photoUrl' => $a->photo_url ?: '/images/piaud/Foto-Kegiatan-1.jpg',
            'isFeatured' => (bool) $a->is_featured,
        ];
    });

    return Inertia::render('Public/Articles', [
        'dbArticles' => $articles,
    ]);
})->name('articles');

Route::get('/galeri', function () {
    $galleries = \App\Models\Gallery::with('category')->orderBy('order')->latest()->get()->map(function ($g) {
        return [
            'id' => $g->id,
            'title' => $g->title,
            'photoUrl' => $g->photo_url ?: '/images/piaud/Foto-Kegiatan-1.jpg',
            'category' => $g->category->name ?? 'Praktikum APE',
            'date' => $g->date ?? 'Oktober 2026',
            'description' => $g->description ?? '',
        ];
    });

    return Inertia::render('Public/Gallery', [
        'dbGalleries' => $galleries,
    ]);
})->name('gallery');

Route::get('/kontak', function () {
    return Inertia::render('Public/Contact');
})->name('contact');
Route::post('/kontak', [\App\Http\Controllers\PublicContactController::class, 'store'])->name('contact.store');

/*
|--------------------------------------------------------------------------
| Authenticated / Admin Panel Routes
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::prefix('admin')->middleware(['auth'])->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    // Contacts / Pesan Masuk
    Route::get('contacts', [\App\Http\Controllers\Admin\ContactController::class, 'index'])->name('contacts.index');
    Route::patch('contacts/{contact}/read', [\App\Http\Controllers\Admin\ContactController::class, 'markAsRead'])->name('contacts.read');
    Route::delete('contacts/{contact}', [\App\Http\Controllers\Admin\ContactController::class, 'destroy'])->name('contacts.destroy');

    // Lecturers
    Route::resource('lecturers', \App\Http\Controllers\Admin\LecturerController::class)->except(['show']);

    // Articles
    Route::resource('articles', \App\Http\Controllers\Admin\ArticleController::class)->except(['show']);

    // Gallery & Banners
    Route::get('gallery', [\App\Http\Controllers\Admin\GalleryController::class, 'index'])->name('gallery.index');
    Route::post('gallery', [\App\Http\Controllers\Admin\GalleryController::class, 'storeGallery'])->name('gallery.store');
    Route::delete('gallery/{gallery}', [\App\Http\Controllers\Admin\GalleryController::class, 'destroyGallery'])->name('gallery.destroy');
    Route::post('banners', [\App\Http\Controllers\Admin\GalleryController::class, 'storeBanner'])->name('banner.store');
    Route::delete('banners/{banner}', [\App\Http\Controllers\Admin\GalleryController::class, 'destroyBanner'])->name('banner.destroy');

    // Pages
    Route::get('pages', [\App\Http\Controllers\Admin\PageController::class, 'index'])->name('pages.index');
    Route::get('pages/{page}/edit', [\App\Http\Controllers\Admin\PageController::class, 'edit'])->name('pages.edit');
    Route::put('pages/{page}', [\App\Http\Controllers\Admin\PageController::class, 'update'])->name('pages.update');

    // Settings
    Route::get('settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::put('settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');

    // Terminal Artisan Console
    Route::get('terminal', [\App\Http\Controllers\Admin\TerminalController::class, 'index'])->name('terminal.index');
    Route::post('terminal/execute', [\App\Http\Controllers\Admin\TerminalController::class, 'execute'])->name('terminal.execute');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Shared Hosting Deploy Helper (cPanel No-Terminal Utility)
|--------------------------------------------------------------------------
*/
Route::get('/deploy-helper/{secret}', function ($secret) {
    $expectedKey = env('DEPLOY_HELPER_KEY', 'piaud2026persis');
    if ($secret !== $expectedKey) {
        abort(403, 'Akses Ditolak: Secret token tidak cocok.');
    }

    $action = request('action', 'status');
    $log = [];

    $doMigrate = function () use (&$log) {
        try {
            \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
            $log[] = "✅ [MIGRATE SUCCESS]\n" . \Illuminate\Support\Facades\Artisan::output();
        } catch (\Throwable $e) {
            $log[] = "❌ [MIGRATE ERROR] " . $e->getMessage();
        }
    };

    $doSeed = function () use (&$log) {
        try {
            \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
            $log[] = "✅ [SEED SUCCESS]\n" . \Illuminate\Support\Facades\Artisan::output();
        } catch (\Throwable $e) {
            $log[] = "❌ [SEED ERROR] " . $e->getMessage();
        }
    };

    $doStorageLink = function () use (&$log) {
        $target = storage_path('app/public');
        $link = public_path('storage');

        if (file_exists($link)) {
            $log[] = "ℹ️ [STORAGE LINK] Symlink 'public/storage' sudah ada.";
            return;
        }

        try {
            \Illuminate\Support\Facades\Artisan::call('storage:link');
            $log[] = "✅ [STORAGE LINK ARTISAN]\n" . \Illuminate\Support\Facades\Artisan::output();
        } catch (\Throwable $e) {
            $log[] = "⚠️ [STORAGE LINK ARTISAN FAILED, TRYING NATIVE PHP]: " . $e->getMessage();
        }

        if (!file_exists($link)) {
            if (@symlink($target, $link)) {
                $log[] = "✅ [STORAGE LINK NATIVE PHP] Berhasil membuat symlink.";
            } else {
                $log[] = "❌ [STORAGE LINK NATIVE PHP FAILED] Hosting mematikan fungsi symlink().";
            }
        }
    };

    $doOptimize = function () use (&$log) {
        try {
            \Illuminate\Support\Facades\Artisan::call('optimize:clear');
            $log[] = "✅ [OPTIMIZE CLEAR]\n" . \Illuminate\Support\Facades\Artisan::output();
        } catch (\Throwable $e) {
            $log[] = "❌ [OPTIMIZE ERROR] " . $e->getMessage();
        }
    };

    switch ($action) {
        case 'migrate':
            $doMigrate();
            break;
        case 'seed':
            $doSeed();
            break;
        case 'storage-link':
            $doStorageLink();
            break;
        case 'optimize':
            $doOptimize();
            break;
        case 'all':
            $doMigrate();
            $doSeed();
            $doStorageLink();
            $doOptimize();
            break;
        case 'status':
        default:
            $log[] = "ℹ️ [INFO] Sistem siap. Silakan klik salah satu tombol tindakan di bawah.";
            break;
    }

    $dbStatus = 'Terhubung';
    $dbTablesCount = 0;
    try {
        $connectionName = \Illuminate\Support\Facades\DB::getDefaultConnection();
        if ($connectionName === 'sqlite') {
            $dbTablesCount = count(\Illuminate\Support\Facades\DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"));
        } else {
            $dbTablesCount = count(\Illuminate\Support\Facades\DB::select('SHOW TABLES'));
        }
    } catch (\Throwable $e) {
        $dbStatus = 'Gagal terhubung: ' . $e->getMessage();
    }

    $storageStatus = file_exists(public_path('storage')) ? 'Aktif (Linked)' : 'Belum Dibuat';
    $outputLog = implode("\n\n", $log);

    $html = <<<HTML
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PIAUD Deployment Helper (cPanel No-Terminal)</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAF6EC; color: #1B2A2F; margin: 0; padding: 2rem; }
            .container { max-width: 800px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E3DAC7; border-radius: 8px; padding: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
            h1 { color: #0F4C3A; margin-top: 0; font-size: 1.5rem; }
            .status-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0; }
            .status-card { background: #F2ECE0; padding: 1rem; border-radius: 6px; border: 1px solid #E3DAC7; font-size: 0.875rem; }
            .btn-group { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1.5rem 0; }
            .btn { display: inline-block; padding: 0.6rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.875rem; font-weight: 600; cursor: pointer; border: none; }
            .btn-primary { background: #C2613A; color: #FFFFFF; }
            .btn-primary:hover { background: #A64F2D; }
            .btn-secondary { background: #0F4C3A; color: #FFFFFF; }
            .btn-secondary:hover { background: #0A3427; }
            .btn-outline { background: #F2ECE0; color: #1B2A2F; border: 1px solid #E3DAC7; }
            .btn-outline:hover { background: #E3DAC7; }
            pre { background: #1B2A2F; color: #FAF6EC; padding: 1rem; border-radius: 6px; overflow-x: auto; font-size: 0.8rem; line-height: 1.5; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 PIAUD Deploy Helper (cPanel Utility)</h1>
            <p style="font-size: 0.875rem; color: #5C6B73;">Tool ini digunakan untuk menjalankan migrasi database, storage symlink, dan cache clearing di shared hosting tanpa terminal SSH.</p>

            <div class="status-grid">
                <div class="status-card">
                    <strong>Status Database:</strong><br>
                    <span>{$dbStatus} ({$dbTablesCount} tabel)</span>
                </div>
                <div class="status-card">
                    <strong>Storage Link:</strong><br>
                    <span>{$storageStatus}</span>
                </div>
            </div>

            <div class="btn-group">
                <a href="?action=all" class="btn btn-primary" onclick="return confirm('Jalankan semua setup (Migrate + Seed + Storage Link + Clear Cache)?')">⚡ Jalankan SEMUA (All-in-One)</a>
                <a href="?action=migrate" class="btn btn-secondary">1. Migrate Database</a>
                <a href="?action=seed" class="btn btn-secondary">2. Seed Data Awal</a>
                <a href="?action=storage-link" class="btn btn-secondary">3. Buat Storage Link</a>
                <a href="?action=optimize" class="btn btn-outline">4. Clear Cache</a>
                <a href="?action=status" class="btn btn-outline">Cek Status</a>
            </div>

            <h3>Log Eksekusi:</h3>
            <pre>{$outputLog}</pre>

            <p style="font-size: 0.75rem; color: #8C3917; margin-top: 1.5rem;">
                🔒 <strong>Penting:</strong> Setelah website berjalan normal di hosting, ubah <code>DEPLOY_HELPER_KEY</code> di <code>.env</code> atau hapus rute ini demi keamanan.
            </p>
        </div>
    </body>
    </html>
    HTML;

    return response($html);
});

require __DIR__.'/auth.php';
