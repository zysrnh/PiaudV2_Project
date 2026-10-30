<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class SyncBuildCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sync:build {--target= : Path target custom untuk disalin}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Otomatis salin aset public/build dan public/images ke web root cPanel';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        // 1. Tentukan sumber aset build (Prioritaskan base_path/public/build hasil Git)
        $sourceBuild = base_path('public' . DIRECTORY_SEPARATOR . 'build');
        if (!File::isDirectory($sourceBuild)) {
            $sourceBuild = public_path('build');
        }

        if (!File::exists($sourceBuild) || !File::isDirectory($sourceBuild)) {
            $this->error("❌ Folder sumber build tidak ditemukan: {$sourceBuild}");
            return Command::FAILURE;
        }

        $sourceFiles = File::allFiles($sourceBuild);
        $totalFiles = count($sourceFiles);

        $this->info("=================================================");
        $this->info(" 📦 PIAUD SYNC ASSETS & IMAGES CONSOLE");
        $this->info("=================================================");
        $this->line("Sumber Build  : <fg=cyan>{$sourceBuild}</>");
        $this->line("Jumlah Berkas : <fg=yellow>{$totalFiles} file</>");
        $this->line("-------------------------------------------------");

        // Deteksi target web root di cPanel
        $destinations = [
            base_path('build'),
            base_path('Uploads' . DIRECTORY_SEPARATOR . 'build'),
        ];

        // Jika ada target khusus
        if ($this->option('target')) {
            $dest = rtrim($this->option('target'), '/\\') . DIRECTORY_SEPARATOR . 'build';
            $destinations[] = $dest;
        }

        // Cek jika project berada di luar public_html
        $potentialPublicHtml = [
            base_path('../public_html/piaud.iaipibandung.ac.id/build'),
            base_path('../../public_html/piaud.iaipibandung.ac.id/build'),
            base_path('../piaud.iaipibandung.ac.id/build'),
        ];
        foreach ($potentialPublicHtml as $p) {
            $dir = dirname($p);
            if (is_dir($dir)) {
                $destinations[] = $p;
            }
        }

        $destinations = array_unique($destinations);

        // Salin aset build
        $successCount = 0;
        foreach ($destinations as $dest) {
            // Hindari copy ke folder yang sama persis dengan sumber
            if (realpath($dest) === realpath($sourceBuild)) {
                continue;
            }

            try {
                if (!File::exists($dest)) {
                    File::makeDirectory($dest, 0755, true, true);
                }

                // Bersihkan file lama agar tidak bertumpuk
                File::cleanDirectory($dest);

                File::copyDirectory($sourceBuild, $dest);
                $this->info("✅ Build disalin ke: <fg=green>{$dest}</>");
                $successCount++;
            } catch (\Throwable $e) {
                $this->error("❌ Gagal menyalin ke: {$dest} ({$e->getMessage()})");
            }
        }

        // 2. Salin juga folder IMAGES (logo kampus & foto kegiatan) ke web root
        $sourceImages = base_path('public' . DIRECTORY_SEPARATOR . 'images');
        if (File::isDirectory($sourceImages)) {
            $imgDestinations = [
                base_path('images'),
                base_path('Uploads' . DIRECTORY_SEPARATOR . 'images'),
            ];

            foreach ($potentialPublicHtml as $p) {
                $dir = dirname($p);
                if (is_dir($dir)) {
                    $imgDestinations[] = $dir . DIRECTORY_SEPARATOR . 'images';
                }
            }

            $imgDestinations = array_unique($imgDestinations);

            foreach ($imgDestinations as $imgDest) {
                if (realpath($imgDest) === realpath($sourceImages)) {
                    continue;
                }

                try {
                    if (!File::exists($imgDest)) {
                        File::makeDirectory($imgDest, 0755, true, true);
                    }
                    File::copyDirectory($sourceImages, $imgDest);
                    $this->info("🖼️ Images disalin ke: <fg=green>{$imgDest}</>");
                } catch (\Throwable $e) {
                    $this->error("❌ Gagal menyalin images ke: {$imgDest} ({$e->getMessage()})");
                }
            }
        }

        $this->line("-------------------------------------------------");
        $this->info("🎉 Selesai! Seluruh aset Vite & Gambar kampus berhasil disinkronkan.");
        return Command::SUCCESS;
    }
}
