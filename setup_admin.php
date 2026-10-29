<?php

/**
 * Script Cepat Buat / Reset Akun Admin & Dev PIAUD
 * Cara pakai di terminal:
 *   php setup_admin.php
 *   atau custom: php setup_admin.php user@email.com password role
 */

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

$email = $argv[1] ?? 'dev@piaud.iaipibandung.ac.id';
$password = $argv[2] ?? 'admin123';
$role = $argv[3] ?? 'dev';

// Buat atau update akun Dev
$devUser = User::updateOrCreate(
    ['email' => $email],
    [
        'name' => ($role === 'dev' ? 'Admin Developer' : 'Admin Konten'),
        'password' => Hash::make($password),
        'role' => $role,
    ]
);

// Sekalian pastikan akun admin konten juga ada
$adminUser = User::updateOrCreate(
    ['email' => 'admin@piaud.iaipibandung.ac.id'],
    [
        'name' => 'Admin Konten',
        'password' => Hash::make('admin123'),
        'role' => 'admin',
    ]
);

echo "\n=======================================================\n";
echo " ✅ SUKSES: Akun Admin & Dev Siap Digunakan!\n";
echo "=======================================================\n";
echo " 1. AKUN DEVELOPER (Akses Penuh + Terminal):\n";
echo "    - Email    : {$devUser->email}\n";
echo "    - Password : {$password}\n";
echo "    - Role     : {$devUser->role}\n\n";
echo " 2. AKUN ADMIN KONTEN:\n";
echo "    - Email    : {$adminUser->email}\n";
echo "    - Password : admin123\n";
echo "    - Role     : {$adminUser->role}\n";
echo "=======================================================\n";
echo " Silakan login sekarang di: http://localhost:8000/login\n\n";
