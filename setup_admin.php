<?php

/**
 * Script 1-Klik Buat 1 Akun Admin Developer PIAUD
 * Cara pakai di terminal:
 *   php setup_admin.php
 *   atau custom: php setup_admin.php email password
 */

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

// Auto-migrate jika tabel users atau kolom role belum ada
if (!Schema::hasTable('users') || !Schema::hasColumn('users', 'role')) {
    echo "⚙️ Menjalankan migrasi database...\n";
    Artisan::call('migrate', ['--force' => true]);
    echo Artisan::output();
}

$email = $argv[1] ?? 'dev@piaud.iaipibandung.ac.id';
$password = $argv[2] ?? 'admin123';

$user = User::updateOrCreate(
    ['email' => $email],
    [
        'name' => 'Admin Developer',
        'password' => Hash::make($password),
        'role' => 'dev',
    ]
);

echo "\n=========================================\n";
echo " ✅ 1 AKUN ADMIN DEVELOPER BERHASIL DIBUAT!\n";
echo "=========================================\n";
echo " Name     : {$user->name}\n";
echo " Email    : {$user->email}\n";
echo " Password : {$password}\n";
echo " Role     : {$user->role} (Akses Penuh + Terminal)\n";
echo "=========================================\n";
echo " Silakan login sekarang di: /login\n\n";
