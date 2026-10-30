<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Throwable;

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
        if (!auth()->check() || !auth()->user()->isDev()) {
            return response()->json([
                'success' => false,
                'output' => "⛔ Akses Ditolak: Anda login sebagai Admin Konten biasa. Hanya akun Admin Developer yang memiliki izin eksekusi terminal.",
                'execution_time' => '0.00s',
                'exit_code' => 403,
            ], 403);
        }

        $rawCommand = trim((string) $request->input('command', ''));

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

        // Command khusus: clear (di-handle di frontend tapi amankan jika dikirim)
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
  git status           Cek status branch dan perubahan git
  sync:build           Salin aset build ke public_html/.../build & Uploads/build
  deploy:full          Otomatis 1-klik: git pull + sync:build + optimize:clear
  migrate              Jalankan migrasi database
  migrate:status       Cek status berkas migrasi
  migrate:rollback     Batalkan migrasi terakhir
  db:seed              Jalankan database seeder
  storage:link         Buat symlink storage/public ke public/storage
  optimize:clear       Hapus seluruh cache (config, route, view)
  config:clear         Hapus cache konfigurasi .env
  route:list           Tampilkan daftar seluruh rute aktif
  cache:clear          Hapus cache aplikasi
  view:clear           Hapus cache kompilasi Blade
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

        // 1. Eksekusi Perintah GIT (git pull, git status, git log, dll)
        if (preg_match('/^git(\s+.*)?$/i', $rawCommand)) {
            $startTime = microtime(true);
            $basePath = escapeshellarg(base_path());

            if (!function_exists('shell_exec') && !function_exists('exec')) {
                return response()->json([
                    'success' => false,
                    'command' => $rawCommand,
                    'output' => "❌ Error: Fungsi shell_exec / exec dinonaktifkan di konfigurasi PHP hosting ini.",
                    'execution_time' => '0.00s',
                    'exit_code' => 1,
                ]);
            }

            $cdPrefix = (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') ? "cd /d {$basePath}" : "cd {$basePath}";
            $fullCommand = "{$cdPrefix} && {$rawCommand} 2>&1";

            $output = @shell_exec($fullCommand);
            $elapsed = number_format(microtime(true) - $startTime, 2) . 's';

            if (empty(trim((string) $output))) {
                $output = "✅ Perintah '{$rawCommand}' berhasil dieksekusi tanpa pesan balik.";
            }

            return response()->json([
                'success' => true,
                'command' => $rawCommand,
                'output' => trim((string) $output),
                'execution_time' => $elapsed,
                'exit_code' => 0,
            ]);
        }

        // 2. Eksekusi 1-Klik Full Deploy (git pull + sync:build + optimize:clear)
        if ($command === 'deploy:full' || $command === 'full:deploy') {
            $startTime = microtime(true);
            $log = [];

            $log[] = "=================================================";
            $log[] = " 🚀 MEMULAI PROSES 1-KLIK FULL DEPLOY PRODUKSI";
            $log[] = "=================================================";

            // Tahap 1: Git Pull
            $log[] = "\n[1/3] Menjalankan git pull dari GitHub...";
            $basePath = escapeshellarg(base_path());
            $cdPrefix = (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') ? "cd /d {$basePath}" : "cd {$basePath}";
            $gitOutput = @shell_exec("{$cdPrefix} && git pull 2>&1");
            $log[] = trim((string) $gitOutput) ?: "✅ Git pull selesai.";

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

        // 3. Penanganan khusus storage:link dengan fallback symlink PHP native
        if ($command === 'storage:link') {
            $startTime = microtime(true);
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

        // 4. Eksekusi Artisan Command Standar
        $startTime = microtime(true);
        try {
            // Pecah perintah dan argumen
            $parts = explode(' ', $command);
            $mainCommand = array_shift($parts);
            $params = [];

            // Tambahkan otomatis --force untuk perintah migrate / db:seed jika belum ada
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
}
