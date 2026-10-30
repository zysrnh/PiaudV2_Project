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
    protected $description = 'Otomatis salin folder public/build ke folder web root cPanel (build & Uploads/build)';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $source = public_path('build');

        if (!File::exists($source) || !File::isDirectory($source)) {
            $this->error("❌ Folder sumber tidak ditemukan: {$source}");
            $this->warn("Silakan jalankan 'npm run build' terlebih dahulu di komputer lokal.");
            return Command::FAILURE;
        }

        $sourceFiles = File::allFiles($source);
        $totalFiles = count($sourceFiles);

        $this->info("=================================================");
        $this->info(" 📦 PIAUD SYNC ASSETS BUILD CONSOLE");
        $this->info("=================================================");
        $this->line("Sumber Aset : <fg=cyan>{$source}</>");
        $this->line("Jumlah File : <fg=yellow>{$totalFiles} berkas</>");
        $this->line("-------------------------------------------------");

        // Deteksi lokasi target cPanel
        $targetRoots = [];

        $customTarget = $this->option('target');
        if (!empty($customTarget)) {
            $targetRoots[] = rtrim($customTarget, '/\\');
        }

        // Cek path dari env jika ada
        if (env('DEPLOY_WEB_ROOT')) {
            $targetRoots[] = rtrim(env('DEPLOY_WEB_ROOT'), '/\\');
        }

        // Lokasi standar cPanel shared hosting (relatif dari root Laravel)
        $potentialRoots = [
            base_path('../public_html/piaud.iaipibandung.ac.id'),
            base_path('../../public_html/piaud.iaipibandung.ac.id'),
            base_path('../piaud.iaipibandung.ac.id'),
            base_path('public_html/piaud.iaipibandung.ac.id'),
        ];

        foreach ($potentialRoots as $potential) {
            $real = realpath($potential);
            if ($real && is_dir($real)) {
                $targetRoots[] = $real;
            }
        }

        // Jika di server cPanel folder belum ada tapi public_html ada, buat di ../public_html/piaud.iaipibandung.ac.id
        $cpanelPublicHtml = realpath(base_path('../public_html')) ?: realpath(base_path('../../public_html'));
        if ($cpanelPublicHtml && is_dir($cpanelPublicHtml)) {
            $defaultSubdomainRoot = $cpanelPublicHtml . DIRECTORY_SEPARATOR . 'piaud.iaipibandung.ac.id';
            if (!in_array($defaultSubdomainRoot, $targetRoots)) {
                $targetRoots[] = $defaultSubdomainRoot;
            }
        }

        // Jika tidak ditemukan satupun root cPanel (misal mode lokal), fallback ke ../public_html/piaud.iaipibandung.ac.id
        if (empty($targetRoots)) {
            $targetRoots[] = base_path('../public_html/piaud.iaipibandung.ac.id');
        }

        $targetRoots = array_unique($targetRoots);

        $successCount = 0;

        foreach ($targetRoots as $root) {
            // Sesuai instruksi: salin ke KEDUA lokasi (build dan Uploads/build)
            $destinations = [
                $root . DIRECTORY_SEPARATOR . 'build',
                $root . DIRECTORY_SEPARATOR . 'Uploads' . DIRECTORY_SEPARATOR . 'build',
            ];

            foreach ($destinations as $dest) {
                try {
                    if (!File::exists($dest)) {
                        File::makeDirectory($dest, 0755, true, true);
                    }

                    File::copyDirectory($source, $dest);
                    $this->info("✅ Berhasil disalin ke: <fg=green>{$dest}</>");
                    $successCount++;
                } catch (\Throwable $e) {
                    $this->error("❌ Gagal menyalin ke: {$dest}");
                    $this->line("   Pesan: " . $e->getMessage());
                }
            }
        }

        $this->line("-------------------------------------------------");
        if ($successCount > 0) {
            $this->info("🎉 Selesai! Seluruh aset Vite berhasil disinkronkan ke {$successCount} lokasi.");
            return Command::SUCCESS;
        } else {
            $this->error("⚠️ Tidak ada lokasi yang berhasil disinkronkan.");
            return Command::FAILURE;
        }
    }
}
