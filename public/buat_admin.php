<?php

/**
 * Script 1-Klik Buat Akun Developer & Admin PIAUD
 * Bisa diakses via BROWSER: https://domain-kamu.com/buat_admin.php
 * Atau via TERMINAL CLI: php public/buat_admin.php
 */

$isCli = (php_sapi_name() === 'cli');

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

// 1. Auto Migrate jika tabel belum siap
$migrationLog = '';
if (!Schema::hasTable('users') || !Schema::hasColumn('users', 'role')) {
    try {
        Artisan::call('migrate', ['--force' => true]);
        $migrationLog = Artisan::output();
    } catch (\Throwable $e) {
        $migrationLog = 'Gagal migrate: ' . $e->getMessage();
    }
}

// 2. Buat Akun 1: Developer (Akses Penuh + Terminal)
$devUser = User::updateOrCreate(
    ['email' => 'dev@piaud.iaipibandung.ac.id'],
    [
        'name' => 'Admin Developer',
        'password' => Hash::make('admin123'),
        'role' => 'dev',
    ]
);

// 3. Buat Akun 2: Admin Konten (Kelola Konten)
$adminUser = User::updateOrCreate(
    ['email' => 'admin@piaud.iaipibandung.ac.id'],
    [
        'name' => 'Admin Konten',
        'password' => Hash::make('admin123'),
        'role' => 'admin',
    ]
);

if ($isCli) {
    echo "\n=========================================\n";
    echo " ✅ AKUN DEV & ADMIN BERHASIL DIBUAT!\n";
    echo "=========================================\n";
    echo " 1. AKUN DEVELOPER:\n";
    echo "    Email    : {$devUser->email}\n";
    echo "    Password : admin123\n";
    echo "    Role     : {$devUser->role} (Akses Terminal)\n\n";
    echo " 2. AKUN ADMIN KONTEN:\n";
    echo "    Email    : {$adminUser->email}\n";
    echo "    Password : admin123\n";
    echo "    Role     : {$adminUser->role}\n";
    echo "=========================================\n";
    echo " Silakan login di: /login\n\n";
    exit;
}

// Tampilan Cantik Jika Dibuka via Browser
header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Setup Akun Admin PIAUD</title>
    <style>
        * { box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAF6EC; color: #1B2A2F; margin: 0; padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .card { max-width: 520px; width: 100%; background: #FFFFFF; border: 1px solid #E3DAC7; border-radius: 8px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        .badge { display: inline-block; padding: 4px 10px; background: #0F4C3A; color: #FAF6EC; border-radius: 4px; font-size: 0.75rem; font-weight: bold; margin-bottom: 1rem; }
        h1 { margin: 0 0 0.5rem 0; font-size: 1.35rem; color: #0F4C3A; }
        p { color: #5C6B73; font-size: 0.9rem; margin-top: 0; }
        .info-box { background: #F2ECE0; border: 1px solid #E3DAC7; border-radius: 6px; padding: 1rem; margin: 1rem 0; font-size: 0.88rem; }
        .box-title { font-weight: bold; color: #0F4C3A; margin-bottom: 0.5rem; font-size: 0.85rem; text-transform: uppercase; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 0.4rem; }
        .info-row:last-child { margin-bottom: 0; }
        .label { color: #7B8A90; }
        .val { font-weight: bold; color: #1B2A2F; font-family: monospace; font-size: 0.95rem; }
        .btn { display: block; text-align: center; background: #C2613A; color: #FFFFFF; padding: 0.8rem; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 1.5rem; }
        .btn:hover { background: #A64F2D; }
        .note { font-size: 0.75rem; color: #8C3917; margin-top: 1rem; text-align: center; }
    </style>
</head>
<body>
    <div class="card">
        <span class="badge">PIAUD SETUP UTILITY</span>
        <h1>✅ Akun Admin & Dev Berhasil Dibuat!</h1>
        <p>Database sudah dimigrasikan dan kedua akun siap digunakan.</p>

        <div class="info-box">
            <div class="box-title">1. Akun Developer (Akses Terminal)</div>
            <div class="info-row"><span class="label">Email:</span> <span class="val"><?= htmlspecialchars($devUser->email) ?></span></div>
            <div class="info-row"><span class="label">Password:</span> <span class="val">admin123</span></div>
            <div class="info-row"><span class="label">Role:</span> <span class="val"><?= htmlspecialchars($devUser->role) ?></span></div>
        </div>

        <div class="info-box">
            <div class="box-title">2. Akun Admin Konten</div>
            <div class="info-row"><span class="label">Email:</span> <span class="val"><?= htmlspecialchars($adminUser->email) ?></span></div>
            <div class="info-row"><span class="label">Password:</span> <span class="val">admin123</span></div>
            <div class="info-row"><span class="label">Role:</span> <span class="val"><?= htmlspecialchars($adminUser->role) ?></span></div>
        </div>

        <a href="/login" class="btn">🚀 Buka Halaman Login Sekarang</a>

        <div class="note">
            ⚠️ <strong>Saran:</strong> Setelah login berhasil, hapus file <code>public/buat_admin.php</code> dari hosting demi keamanan.
        </div>
    </div>
</body>
</html>
