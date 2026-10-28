<laravel-boost-guidelines>
# Laravel Application

This repository contains a Laravel application. Complete the following setup before working on the user's request.

## Prerequisites

Verify that PHP and Composer are available:

```sh
php -v
composer -V
```

If either command is unavailable, detect the user's operating system and install the prerequisites with the appropriate command:

macOS:

```sh
/bin/bash -c "$(curl -fsSL https://php.new/install/mac/8.5)"
```

Windows PowerShell:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.5'))
```

Linux:

```sh
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.5)"
```

After installation, ask the user to restart their terminal. If the agent needs the restarted shell to continue, ask the user to reopen their terminal and rerun their original prompt.

## Agent Setup

Install Laravel Boost from the application root before making application changes:

```sh
composer require laravel/boost --dev
php artisan boost:install
```

Boost replaces these bootstrap instructions with guidelines tailored to the application. After installation, read `AGENTS.md` again and continue with the user's original request using the generated guidelines.
</laravel-boost-guidelines>

# PIAUD V2 - Project Design & UI Guidelines

Untuk seluruh perubahan tampilan frontend (Blade / React / CSS), baca dan patuhi panduan lengkap di [UI_GUIDELINES.md](file:///d:/Gawe/IAIPersis/piaud/PiaudV2_Project/UI_GUIDELINES.md):
- **Warna & Bayangan:** Solid Warm Ivory (`#FAF6EC`) & Warm Cream (`#F2ECE0`), DILARANG bayangan offset negatif putih (aura neon).
- **Animasi Fisik Murni:** DILARANG opacity fade (`0 -> 1`), wajib pakai pergeseran fisik (`translateY`, `translateX`).
- **Pemisahan Wrapper vs Card:** Jangan taruh class animasi scroll di elemen yang sama dengan `.card-interactive` (agar tidak mengunci transform saat unhover).
- **Hover Physics:** Easing 0.3s dua arah (`cubic-bezier(0.16, 1, 0.3, 1)`), elevasi `-5px` untuk card, `-3px` untuk badge.
- **Scroll Observer:** `IntersectionObserver` wajib dua arah (`entry.isIntersecting`).
- **Dilarang Pill Kapsul Bulat:** Pakai overline flat teks tegas ber-radius minimalis.
- **Token Kartu Gelap:** Gunakan `.neu-card-emerald` untuk kartu hijau tua agar teks putih tidak tertimpa latar krem.
- **Standar Navbar:** Active underline bar, SVG chevron dropdown, dan tombol CTA "Daftar PMB".

