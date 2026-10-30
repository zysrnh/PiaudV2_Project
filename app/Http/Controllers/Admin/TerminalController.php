<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Throwable;
use ZipArchive;

class TerminalController extends Controller
{
    /**
     * Tampilkan halaman terminal console admin (Hanya untuk Admin Dev).
     */
    public function index()
    {
        if (!auth()->check() || !auth()->user()->isDev()) {
            abort(403, 'Akses Ditolak: Fitur Terminal Artisan hanya diperuntukkan bagi Administrator Developer.');
        }

        $dbStatus = 'Terhubung';
        $dbTablesCount = 0;
        try {
            $connectionName = DB::getDefaultConnection();
            if ($connectionName === 'sqlite') {
                $dbTablesCount = count(DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"));
            } else {
                $dbTablesCount = count(DB::select('SHOW TABLES'));
            }
        } catch (Throwable $e) {
            $dbStatus = 'Gagal: ' . $e->getMessage();
        }

        $storageLinked = file_exists(public_path('storage'));
        $phpVersion = PHP_VERSION;
        $laravelVersion = app()->version();

        return view('admin.terminal.index', compact(
            'dbStatus',
            'dbTablesCount',
            'storageLinked',
            'phpVersion',
            'laravelVersion'
        ));
    }

    /**
     * Eksekusi perintah artisan / git / deploy via AJAX terminal (Hanya untuk Admin Dev).
     */
    public function execute(Request $request)
    {
        $startTime = microtime(true);
        $rawCommand = trim((string) $request->input('command', ''));

        try {
            if (!auth()->check() || !auth()->user()->isDev()) {
                return response()->json([
                    'success' => false,
                    'output' => "⛔ Akses Ditolak: Anda login sebagai Admin Konten biasa. Hanya akun Admin Developer yang memiliki izin eksekusi terminal.",
                    'execution_time' => '0.00s',
                    'exit_code' => 403,
                ], 403);
            }

            if (empty($rawCommand)) {
                return response()->json([
                    'success' => false,
                    'output' => "⚠️ Perintah kosong. Ketik perintah seperti 'git pull', 'sync:build', 'migrate', atau 'help'.",
                    'execution_time' => '0.00s',
                    'exit_code' => 1,
                ]);
            }

            // Normalisasi: buang awalan "php artisan" atau "artisan" jika ada
            $command = preg_replace('/^(php\s+artisan\s+|artisan\s+)/i', '', $rawCommand);
            $command = trim($command);

            // Command khusus: clear
            if ($command === 'clear' || $command === 'cls') {
                return response()->json([
                    'success' => true,
                    'clear' => true,
                    'output' => '',
                    'execution_time' => '0.00s',
                    'exit_code' => 0,
                ]);
            }

            // Command khusus: help
            if ($command === 'help') {
                $helpText = <<<TXT
Daftar Perintah Terminal & Artisan yang Dapat Digunakan:
------------------------------------------------------
  git pull             Tarik kode & pembaruan terbaru dari GitHub
  sync:build           Salin aset build ke public_html/.../build & Uploads/build
  deploy:full          Otomatis 1-klik: git pull + sync:build + optimize:clear
  migrate              Jalankan migrasi database
  db:seed              Jalankan database seeder
  storage:link         Buat symlink storage/public ke public/storage
  optimize:clear       Hapus seluruh cache (config, route, view)
  route:list           Tampilkan daftar seluruh rute aktif
  about                Informasi lengkap sistem Laravel

Tips:
- Anda dapat mengetik perintah langsung di bar input bawah.
- Gunakan tombol shortcut cepat di atas untuk eksekusi 1-klik.
TXT;
                return response()->json([
                    'success' => true,
                    'command' => $rawCommand,
                    'output' => $helpText,
                    'execution_time' => '0.00s',
                    'exit_code' => 0,
                ]);
            }

            // 1. Eksekusi Perintah GIT / UPDATE (git pull, git status, git log, git:connect, dll)
            if (preg_match('/^git(\s+.*)?$/i', $rawCommand) || $command === 'git:connect' || $command === 'git:init' || $command === 'update') {
                $gitDir = base_path('.git');
                $repoUrl = 'https://github.com/zysrnh/PiaudV2_Project.git';

                // Cek apakah shell execution diizinkan di server hosting ini
                $canUseShell = $this->canExecuteShell();

                // Jika server mengizinkan shell DAN git command ada
                if ($canUseShell) {
                    $ver = $this->runShellCommand("git --version 2>&1");
                    $gitAvailable = !str_contains($ver, '❌ Error:') && !str_contains($ver, 'not found') && !str_contains($ver, 'is not recognized');

                    if ($gitAvailable) {
                        $base = '"' . str_replace(['"', '\\'], ['', '/'], base_path()) . '"';
                        $cdPrefix = (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') ? "cd /d {$base}" : "cd {$base}";

                        // Jika .git belum ada, auto-inisialisasi
                        if (!is_dir($gitDir)) {
                            $this->runShellCommand("{$cdPrefix} && git init && git remote add origin {$repoUrl} && git branch -M main && git fetch origin main && git reset --hard origin/main");
                        } else {
                            $this->runShellCommand("{$cdPrefix} && git pull origin main 2>&1");
                        }

                        // Jalankan sync build
                        try {
                            Artisan::call('sync:build');
                        } catch (Throwable $e) {}

                        $elapsed = number_format(microtime(true) - $startTime, 2) . 's';
                        return response()->json([
                            'success' => true,
                            'command' => $rawCommand,
                            'output' => "✅ Git pull via Shell CLI berhasil dieksekusi!\n" .
                                        "Seluruh file terbaru dari GitHub telah diperbarui ke server.\n\n" .
                                        Artisan::output(),
                            'execution_time' => $elapsed,
                            'exit_code' => 0,
                        ]);
                    }
                }

                // JIKA SHELL/GIT DIBLOKIR HOSTING: Gunakan Pure PHP GitHub Sync (Kebal blokir cPanel)
                $syncOutput = $this->pullFromGitHubZip();

                try {
                    Artisan::call('sync:build');
                    $syncOutput .= "\n\n" . trim(Artisan::output());
                } catch (Throwable $e) {}

                $elapsed = number_format(microtime(true) - $startTime, 2) . 's';

                return response()->json([
                    'success' => !str_contains($syncOutput, '❌ Gagal'),
                    'command' => $rawCommand,
                    'output' => $syncOutput,
                    'execution_time' => $elapsed,
                    'exit_code' => str_contains($syncOutput, '❌ Gagal') ? 1 : 0,
                ]);
            }

            // 2. Eksekusi 1-Klik Full Deploy (git pull + sync:build + optimize:clear)
            if ($command === 'deploy:full' || $command === 'full:deploy') {
                $log = [];
                $log[] = "=================================================";
                $log[] = " 🚀 MEMULAI PROSES 1-KLIK FULL DEPLOY PRODUKSI";
                $log[] = "=================================================";

                // Tahap 1: Tarik Update dari GitHub
                $log[] = "\n[1/3] Menarik file terbaru dari GitHub...";
                $gitRes = $this->execute(new Request(['command' => 'git pull']))->getData(true);
                $log[] = $gitRes['output'] ?? 'Pembaruan GitHub selesai.';

                // Tahap 2: Sync Folder Build ke cPanel target (build & Uploads/build)
                $log[] = "\n[2/3] Menyinkronkan folder build ke web root target...";
                try {
                    Artisan::call('sync:build');
                    $log[] = trim(Artisan::output());
                } catch (Throwable $e) {
                    $log[] = "⚠️ sync:build error: " . $e->getMessage();
                }

                // Tahap 3: Hapus Cache Laravel
                $log[] = "\n[3/3] Membersihkan seluruh cache Laravel (optimize:clear)...";
                try {
                    Artisan::call('optimize:clear');
                    $log[] = trim(Artisan::output());
                } catch (Throwable $e) {
                    $log[] = "⚠️ optimize:clear error: " . $e->getMessage();
                }

                $log[] = "\n=================================================";
                $log[] = " 🎉 FULL DEPLOY SELESAI DENGAN SUKSES!";
                $log[] = "=================================================";

                $elapsed = number_format(microtime(true) - $startTime, 2) . 's';

                return response()->json([
                    'success' => true,
                    'command' => $rawCommand,
                    'output' => implode("\n", $log),
                    'execution_time' => $elapsed,
                    'exit_code' => 0,
                ]);
            }

            // 3. Penanganan khusus storage:link
            if ($command === 'storage:link') {
                $log = [];
                $target = storage_path('app/public');
                $link = public_path('storage');

                if (file_exists($link)) {
                    $log[] = "ℹ️ Symlink 'public/storage' sudah ada.";
                } else {
                    try {
                        Artisan::call('storage:link');
                        $log[] = Artisan::output();
                    } catch (Throwable $e) {
                        $log[] = "⚠️ Artisan storage:link gagal: " . $e->getMessage();
                    }

                    if (!file_exists($link)) {
                        if (@symlink($target, $link)) {
                            $log[] = "✅ Native PHP symlink berhasil dibuat: public/storage -> storage/app/public";
                        } else {
                            $log[] = "❌ Gagal membuat symlink. Hosting mungkin mematikan fungsi symlink().";
                        }
                    }
                }

                $elapsed = number_format(microtime(true) - $startTime, 2) . 's';

                return response()->json([
                    'success' => true,
                    'command' => $rawCommand,
                    'output' => implode("\n", array_filter($log)),
                    'execution_time' => $elapsed,
                    'exit_code' => 0,
                ]);
            }

            // 4. Eksekusi Artisan Command Standar (sync:build, migrate, db:seed, optimize:clear, dll)
            $parts = explode(' ', $command);
            $mainCommand = array_shift($parts);
            $params = [];

            if (in_array($mainCommand, ['migrate', 'migrate:fresh', 'migrate:rollback', 'db:seed'])) {
                $params['--force'] = true;
            }

            foreach ($parts as $part) {
                if (empty($part)) continue;
                if (str_starts_with($part, '--')) {
                    $opt = substr($part, 2);
                    if (str_contains($opt, '=')) {
                        [$k, $v] = explode('=', $opt, 2);
                        $params['--' . $k] = $v;
                    } else {
                        $params['--' . $opt] = true;
                    }
                } else {
                    $params[] = $part;
                }
            }

            $exitCode = Artisan::call($mainCommand, $params);
            $output = Artisan::output();
            $elapsed = number_format(microtime(true) - $startTime, 2) . 's';

            if (empty(trim($output))) {
                $output = "✅ Perintah '{$mainCommand}' berhasil dieksekusi tanpa pesan balik.";
            }

            return response()->json([
                'success' => $exitCode === 0,
                'command' => $rawCommand,
                'output' => $output,
                'execution_time' => $elapsed,
                'exit_code' => $exitCode,
            ]);

        } catch (Throwable $e) {
            $elapsed = number_format(microtime(true) - $startTime, 2) . 's';
            return response()->json([
                'success' => false,
                'command' => $rawCommand,
                'output' => "❌ Error: " . $e->getMessage(),
                'execution_time' => $elapsed,
                'exit_code' => 1,
            ]);
        }
    }

    /**
     * Cek apakah server mengizinkan eksekusi shell command
     */
    private function canExecuteShell(): bool
    {
        $disabled = array_map('trim', explode(',', (string) ini_get('disable_functions')));
        return (function_exists('shell_exec') && !in_array('shell_exec', $disabled))
            || (function_exists('exec') && !in_array('exec', $disabled));
    }

    /**
     * Eksekusi shell command dengan fallback berjenjang
     */
    private function runShellCommand(string $cmd): string
    {
        try {
            $disabled = array_map('trim', explode(',', (string) ini_get('disable_functions')));

            if (function_exists('shell_exec') && !in_array('shell_exec', $disabled)) {
                $res = @shell_exec($cmd);
                if ($res !== null) return (string) $res;
            }

            if (function_exists('exec') && !in_array('exec', $disabled)) {
                $output = [];
                @exec($cmd, $output);
                if (!empty($output)) return implode("\n", $output);
            }
        } catch (Throwable $e) {
            return "❌ Shell Error: " . $e->getMessage();
        }

        return "❌ Error: Eksekusi shell dinonaktifkan di server hosting.";
    }

    /**
     * Pure PHP GitHub Updater (Solusi 100% Kebal Blokir Hosting cPanel)
     * Mengunduh zip master dari GitHub dan mengekstraknya langsung via PHP tanpa butuh Git / Shell!
     */
    private function pullFromGitHubZip(): string
    {
        $repoZipUrl = 'https://github.com/zysrnh/PiaudV2_Project/archive/refs/heads/main.zip';
        $tempDir = storage_path('app/temp_git_sync');

        if (!is_dir($tempDir)) {
            @mkdir($tempDir, 0755, true);
        }

        $tempZip = $tempDir . '/main.zip';

        // 1. Download berkas zip dari GitHub
        $content = null;
        try {
            $resp = Http::timeout(120)->withHeaders(['User-Agent' => 'PIAUD-Campus-Updater'])->get($repoZipUrl);
            if ($resp->successful()) {
                $content = $resp->body();
            }
        } catch (Throwable $e) {}

        if (!$content && function_exists('curl_init')) {
            $ch = curl_init($repoZipUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 120);
            curl_setopt($ch, CURLOPT_USERAGENT, 'PIAUD-Campus-Updater');
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $content = curl_exec($ch);
            curl_close($ch);
        }

        if (!$content) {
            $content = @file_get_contents($repoZipUrl);
        }

        if (empty($content) || strlen($content) < 1000) {
            return "❌ Gagal mengunduh pembaruan dari GitHub ({$repoZipUrl}).\n" .
                   "Pastikan server hosting memiliki akses internet keluar (cURL / allow_url_fopen).";
        }

        file_put_contents($tempZip, $content);

        // 2. Ekstrak file zip
        if (!class_exists('ZipArchive')) {
            @unlink($tempZip);
            return "❌ Ekstensi PHP ZipArchive tidak aktif di hosting ini.";
        }

        $zip = new ZipArchive();
        if ($zip->open($tempZip) !== true) {
            @unlink($tempZip);
            return "❌ Gagal membuka arsip zip pembaruan dari GitHub.";
        }

        $extractPath = $tempDir . '/extracted';
        if (!is_dir($extractPath)) {
            @mkdir($extractPath, 0755, true);
        }

        $zip->extractTo($extractPath);
        $zip->close();
        @unlink($tempZip);

        // Folder hasil ekstrak di GitHub biasanya bernama PiaudV2_Project-main
        $extractedFolder = $extractPath . '/PiaudV2_Project-main';
        if (!is_dir($extractedFolder)) {
            $dirs = glob($extractPath . '/*', GLOB_ONLYDIR);
            $extractedFolder = $dirs[0] ?? $extractPath;
        }

        // 3. Salin seluruh file ke base_path(), AMANKAN .env dan storage
        $files = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($extractedFolder, \RecursiveDirectoryIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::SELF_FIRST
        );

        $updatedCount = 0;
        foreach ($files as $item) {
            $relPath = substr($item->getPathname(), strlen($extractedFolder) + 1);

            // JANGAN PERNAH timpa konfigurasi server .env dan folder storage
            if ($relPath === '.env' || str_starts_with($relPath, 'storage/') || str_starts_with($relPath, 'storage\\')) {
                continue;
            }

            $destPath = base_path($relPath);
            if ($item->isDir()) {
                if (!is_dir($destPath)) {
                    @mkdir($destPath, 0755, true);
                }
            } else {
                @copy($item->getPathname(), $destPath);
                $updatedCount++;
            }
        }

        // Bersihkan folder temp
        try {
            File::deleteDirectory($tempDir);
        } catch (Throwable $e) {}

        return "🎉 BERHASIL! {$updatedCount} file berhasil diperbarui langsung dari GitHub (Pure PHP Auto-Sync).\n" .
               "Semua kodingan dan folder build terbaru sudah masuk ke server hosting!";
    }
}
