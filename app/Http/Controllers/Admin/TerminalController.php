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

            // 1. Eksekusi Perintah GIT (git pull, git status, git log, git:connect, dll)
            if (preg_match('/^git(\s+.*)?$/i', $rawCommand) || $command === 'git:connect' || $command === 'git:init') {
                $gitDir = base_path('.git');
                $repoUrl = 'https://github.com/zysrnh/PiaudV2_Project.git';
                $basePath = escapeshellarg(base_path());
                $cdPrefix = (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') ? "cd /d {$basePath}" : "cd {$basePath}";

                // Jika folder .git belum ada, lakukan auto-inisialisasi & koneksi ke GitHub
                if (!is_dir($gitDir) || $command === 'git:connect' || $command === 'git:init') {
                    $ver = $this->runShellCommand("git --version 2>&1");
                    if (str_contains($ver, '❌ Error:') || str_contains($ver, 'not found') || str_contains($ver, 'is not recognized')) {
                        $elapsed = number_format(microtime(true) - $startTime, 2) . 's';
                        return response()->json([
                            'success' => false,
                            'command' => $rawCommand,
                            'output' => "❌ Error: Binary Git tidak tersedia atau dinonaktifkan di server hosting ini.\n" .
                                        "Detail: {$ver}\n\n" .
                                        "💡 Solusi Cepat: Upload folder 'public/build' lalu klik tombol 'sync:build' untuk deploy langsung.",
                            'execution_time' => $elapsed,
                            'exit_code' => 1,
                        ]);
                    }

                    $log = [];
                    $log[] = "=================================================";
                    $log[] = " 🔗 AUTO-CONNECT: MENGHUBUNGKAN SERVER KE GITHUB";
                    $log[] = "=================================================";
                    $log[] = "✅ Binary Git: " . trim($ver);
                    $log[] = "📡 Repository: {$repoUrl}\n";

                    $setupSteps = [
                        'git init',
                        'git config user.name "PIAUD Auto Deploy"',
                        'git config user.email "server@iaipibandung.ac.id"',
                        'git remote remove origin 2>&1',
                        "git remote add origin {$repoUrl}",
                        'git branch -M main',
                        'git fetch origin main 2>&1',
                        'git reset --hard origin/main 2>&1',
                        'git branch --set-upstream-to=origin/main main 2>&1'
                    ];

                    foreach ($setupSteps as $step) {
                        $res = trim($this->runShellCommand("{$cdPrefix} && {$step}"));
                        if (!empty($res) && !str_contains($res, 'No such remote')) {
                            $log[] = "> {$step}\n{$res}";
                        }
                    }

                    $log[] = "\n🎉 BERHASIL! Server hosting sekarang sudah resmi terhubung ke Git Repository.";
                    $log[] = "Seluruh file terbaru (termasuk aset build) telah ditarik ke server.";

                    try {
                        Artisan::call('sync:build');
                        $log[] = "\n" . trim(Artisan::output());
                    } catch (Throwable $e) {}

                    $elapsed = number_format(microtime(true) - $startTime, 2) . 's';

                    return response()->json([
                        'success' => true,
                        'command' => $rawCommand,
                        'output' => implode("\n", $log),
                        'execution_time' => $elapsed,
                        'exit_code' => 0,
                    ]);
                }

                // Jika folder .git sudah ada, jalankan perintah git normal
                $fullCommand = "{$cdPrefix} && {$rawCommand} 2>&1";
                $output = $this->runShellCommand($fullCommand);
                $elapsed = number_format(microtime(true) - $startTime, 2) . 's';

                if (str_contains($rawCommand, 'pull') && !str_contains($output, 'fatal:')) {
                    try {
                        Artisan::call('sync:build');
                        $output .= "\n\n" . trim(Artisan::output());
                    } catch (Throwable $e) {}
                }

                $isSuccess = !str_contains($output, '❌ Error:') && !str_contains($output, 'fatal:');

                return response()->json([
                    'success' => $isSuccess,
                    'command' => $rawCommand,
                    'output' => trim($output),
                    'execution_time' => $elapsed,
                    'exit_code' => $isSuccess ? 0 : 1,
                ]);
            }

            // 2. Eksekusi 1-Klik Full Deploy (git pull + sync:build + optimize:clear)
            if ($command === 'deploy:full' || $command === 'full:deploy') {
                $log = [];
                $log[] = "=================================================";
                $log[] = " 🚀 MEMULAI PROSES 1-KLIK FULL DEPLOY PRODUKSI";
                $log[] = "=================================================";

                // Tahap 1: Git Pull / Auto-Connect
                $log[] = "\n[1/3] Menjalankan git pull dari GitHub...";
                $gitRes = $this->execute(new Request(['command' => 'git pull']))->getData(true);
                $log[] = $gitRes['output'] ?? 'Git pull selesai.';

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
     * Eksekusi shell command dengan fallback berjenjang (shell_exec, exec, proc_open, passthru)
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

            if (function_exists('proc_open') && !in_array('proc_open', $disabled)) {
                $descriptors = [
                    0 => ['pipe', 'r'],
                    1 => ['pipe', 'w'],
                    2 => ['pipe', 'w'],
                ];
                $process = @proc_open($cmd, $descriptors, $pipes);
                if (is_resource($process)) {
                    if (isset($pipes[0])) fclose($pipes[0]);
                    $out = stream_get_contents($pipes[1]) . stream_get_contents($pipes[2]);
                    if (isset($pipes[1])) fclose($pipes[1]);
                    if (isset($pipes[2])) fclose($pipes[2]);
                    proc_close($process);
                    if (!empty(trim((string) $out))) return (string) $out;
                }
            }

            if (function_exists('passthru') && !in_array('passthru', $disabled)) {
                ob_start();
                @passthru($cmd);
                $out = ob_get_clean();
                if (!empty($out)) return (string) $out;
            }
        } catch (Throwable $e) {
            return "❌ Shell Error: " . $e->getMessage();
        }

        return "❌ Error: Fungsi eksekusi shell (shell_exec, exec, proc_open) dinonaktifkan di server hosting ini (disable_functions di php.ini).";
    }
}
