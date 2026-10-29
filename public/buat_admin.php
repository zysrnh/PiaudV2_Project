<?php

/**
 * Script 1-Klik Buat 1 Akun Admin Developer PIAUD
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

// 2. Data 1 Akun Admin Developer
$email = $_GET['email'] ?? ($argv[1] ?? 'dev@piaud.iaipibandung.ac.id');
$password = $_GET['password'] ?? ($argv[2] ?? 'admin123');
$name = 'Admin Developer';
$role = 'dev';

$user = User::updateOrCreate(
    ['email' => $email],
    [
        'name' => $name,
        'password' => Hash::make($password),
        'role' => $role,
    ]
);

if ($isCli) {
    echo "\n=========================================\n";
    echo " ✅ AKUN ADMIN DEVELOPER BERHASIL DIBUAT!\n";
    echo "=========================================\n";
    echo " Name     : {$user->name}\n";
    echo " Email    : {$user->email}\n";
    echo " Password : {$password}\n";
    echo " Role     : {$user->role} (Akses Terminal & Admin)\n";
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
    <title>Setup 1 Akun Admin PIAUD</title>
    <style>
        * { box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAF6EC; color: #1B2A2F; margin: 0; padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .card { max-width: 500px; width: 100%; background: #FFFFFF; border: 1px solid #E3DAC7; border-radius: 8px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        .badge { display: inline-block; padding: 4px 10px; background: #0F4C3A; color: #FAF6EC; border-radius: 4px; font-size: 0.75rem; font-weight: bold; margin-bottom: 1rem; }
        h1 { margin: 0 0 0.5rem 0; font-size: 1.35rem; color: #0F4C3A; }
        p { color: #5C6B73; font-size: 0.9rem; margin-top: 0; }
        .info-box { background: #F2ECE0; border: 1px solid #E3DAC7; border-radius: 6px; padding: 1.2rem; margin: 1.5rem 0; font-size: 0.9rem; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 0.6rem; border-bottom: 1px dashed #D9CFC1; padding-bottom: 0.6rem; }
        .info-row:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
        .label { color: #7B8A90; }
        .val { font-weight: bold; color: #1B2A2F; font-family: monospace; font-size: 0.95rem; }
        .btn { display: block; text-align: center; background: #C2613A; color: #FFFFFF; padding: 0.8rem; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 1rem; }
        .btn:hover { background: #A64F2D; }
        .note { font-size: 0.75rem; color: #8C3917; margin-top: 1rem; }
    </style>
</head>
<body>
    <div class="card">
        <span class="badge">PIAUD SETUP UTILITY</span>
        <h1>✅ 1 Akun Admin Berhasil Dibuat!</h1>
        <p>Database sudah otomatis dicek/dimigrasikan dan akun siap digunakan untuk login.</p>

        <div class="info-box">
            <div class="info-row">
                <span class="label">Nama:</span>
                <span class="val"><?= htmlspecialchars($user->name) ?></span>
            </div>
            <div class="info-row">
                <span class="label">Email:</span>
                <span class="val"><?= htmlspecialchars($user->email) ?></span>
            </div>
            <div class="info-row">
                <span class="label">Password:</span>
                <span class="val"><?= htmlspecialchars($password) ?></span>
            </div>
            <div class="info-row">
                <span class="label">Role:</span>
                <span class="val"><?= htmlspecialchars($user->role) ?> (Developer + Terminal)</span>
            </div>
        </div>

        <a href="/login" class="btn">🚀 Buka Halaman Login Sekarang</a>

        <div class="note">
            ⚠️ <strong>Saran Keamanan:</strong> Setelah berhasil login ke sistem, hapus file <code>public/buat_admin.php</code> ini dari hosting demi keamanan.
        </div>
    </div>
</body>
</html>
