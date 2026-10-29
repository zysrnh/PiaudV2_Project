<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('piaud:admin {email=dev@piaud.iaipibandung.ac.id} {password=admin123} {--role=dev}', function ($email, $password) {
    $role = $this->option('role');
    $user = \App\Models\User::updateOrCreate(
        ['email' => $email],
        [
            'name' => ($role === 'dev' ? 'Admin Developer' : 'Admin Konten'),
            'password' => \Illuminate\Support\Facades\Hash::make($password),
            'role' => $role,
        ]
    );

    $this->info("========================================");
    $this->info(" ✅ Akun PIAUD Berhasil Dibuat / Di-reset!");
    $this->info("========================================");
    $this->line(" Email    : {$user->email}");
    $this->line(" Password : {$password}");
    $this->line(" Role     : {$user->role}");
    $this->info("========================================");
})->purpose('Buat atau reset akun admin & developer PIAUD secara instan');

