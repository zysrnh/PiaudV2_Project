@extends('layouts.admin')

@section('title', 'Terminal Artisan')
@section('header', 'Terminal & Artisan Console')
@section('subheader', 'Eksekusi perintah database migration, seeder, storage symlink, dan cache clearing langsung dari web admin')

@section('content')
<div class="space-y-6">

    <!-- 1. SERVER & ENVIRONMENT METRICS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Metric 1: Database -->
        <div class="neu-card p-5 flex items-center justify-between">
            <div class="space-y-1">
                <p class="text-[11px] font-bold text-[#5C6B73] uppercase tracking-wider">Koneksi Database</p>
                <h3 class="font-serif text-lg font-bold text-[#0F4C3A]">{{ $dbStatus }}</h3>
                <span class="text-[11px] text-[#5C6B73]">{{ $dbTablesCount }} Tabel Terdeteksi</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#FAF6EC] border border-[#E3DAC7] flex items-center justify-center text-[#0F4C3A] text-lg">
                <i class="fa-solid fa-database"></i>
            </div>
        </div>

        <!-- Metric 2: Storage Link -->
        <div class="neu-card p-5 flex items-center justify-between">
            <div class="space-y-1">
                <p class="text-[11px] font-bold text-[#5C6B73] uppercase tracking-wider">Storage Symlink</p>
                <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full {{ $storageLinked ? 'bg-emerald-500' : 'bg-amber-500' }}"></span>
                    <h3 class="font-serif text-lg font-bold text-[#1B2A2F]">{{ $storageLinked ? 'Aktif (Linked)' : 'Belum Dibuat' }}</h3>
                </div>
                <span class="text-[11px] text-[#5C6B73]">public/storage</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#FAF6EC] border border-[#E3DAC7] flex items-center justify-center text-[#C2613A] text-lg">
                <i class="fa-solid fa-link"></i>
            </div>
        </div>

        <!-- Metric 3: PHP & Laravel -->
        <div class="neu-card p-5 flex items-center justify-between">
            <div class="space-y-1">
                <p class="text-[11px] font-bold text-[#5C6B73] uppercase tracking-wider">Runtime Environment</p>
                <h3 class="font-serif text-lg font-bold text-[#0F4C3A]">PHP {{ $phpVersion }}</h3>
                <span class="text-[11px] text-[#5C6B73]">Laravel v{{ $laravelVersion }}</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#FAF6EC] border border-[#E3DAC7] flex items-center justify-center text-[#0F4C3A] text-lg">
                <i class="fa-brands fa-php"></i>
            </div>
        </div>

        <!-- Metric 4: App Mode -->
        <div class="neu-card p-5 flex items-center justify-between">
            <div class="space-y-1">
                <p class="text-[11px] font-bold text-[#5C6B73] uppercase tracking-wider">Environment Mode</p>
                <h3 class="font-serif text-lg font-bold text-[#C2613A] uppercase">{{ app()->environment() }}</h3>
                <span class="text-[11px] text-[#5C6B73]">Security: Dev Role Only</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#FAF6EC] border border-[#E3DAC7] flex items-center justify-center text-[#C2613A] text-lg">
                <i class="fa-solid fa-shield-halved"></i>
            </div>
        </div>
    </div>

    <!-- 2. QUICK-ACTION CHIPS -->
    <div class="neu-card p-4 border border-[#E3DAC7] space-y-2.5">
        <div class="flex items-center justify-between flex-wrap gap-2">
            <span class="text-xs font-bold text-[#1B2A2F] uppercase tracking-wider flex items-center gap-2">
                <i class="fa-solid fa-bolt text-[#C2613A]"></i>
                Shortcut Perintah Cepat (1-Klik):
            </span>
            <span class="text-[11px] text-[#5C6B73]">Klik tombol untuk langsung mengeksekusi di terminal</span>
        </div>
        <div class="flex flex-wrap gap-2 pt-1">
            <button type="button" onclick="runCommandQuick('deploy:full')" class="neu-btn px-3.5 py-1.5 text-xs font-bold bg-[#0F4C3A] text-white hover:bg-[#15664F] flex items-center gap-1.5 cursor-pointer shadow-sm">
                <i class="fa-solid fa-rocket text-[11px] text-[#F59E0B]"></i>
                <span>⚡ 1-Klik Full Deploy</span>
            </button>
            <button type="button" onclick="runCommandQuick('git pull')" class="neu-btn px-3 py-1.5 text-xs font-bold text-[#0F4C3A] hover:bg-white flex items-center gap-1.5 cursor-pointer">
                <i class="fa-solid fa-code-pull-request text-[11px]"></i>
                <span>git pull</span>
            </button>
            <button type="button" onclick="runCommandQuick('php artisan sync:build')" class="neu-btn px-3 py-1.5 text-xs font-bold text-[#0F4C3A] hover:bg-white flex items-center gap-1.5 cursor-pointer">
                <i class="fa-solid fa-boxes-packing text-[11px]"></i>
                <span>sync:build</span>
            </button>
            <button type="button" onclick="runCommandQuick('php artisan migrate')" class="neu-btn px-3 py-1.5 text-xs font-bold text-[#0F4C3A] hover:bg-white flex items-center gap-1.5 cursor-pointer">
                <i class="fa-solid fa-database text-[11px]"></i>
                <span>migrate</span>
            </button>
            <button type="button" onclick="runCommandQuick('php artisan db:seed')" class="neu-btn px-3 py-1.5 text-xs font-bold text-[#0F4C3A] hover:bg-white flex items-center gap-1.5 cursor-pointer">
                <i class="fa-solid fa-seedling text-[11px]"></i>
                <span>db:seed</span>
            </button>
            <button type="button" onclick="runCommandQuick('php artisan storage:link')" class="neu-btn px-3 py-1.5 text-xs font-bold text-[#0F4C3A] hover:bg-white flex items-center gap-1.5 cursor-pointer">
                <i class="fa-solid fa-link text-[11px]"></i>
                <span>storage:link</span>
            </button>
            <button type="button" onclick="runCommandQuick('php artisan optimize:clear')" class="neu-btn px-3 py-1.5 text-xs font-bold text-[#C2613A] hover:bg-white flex items-center gap-1.5 cursor-pointer">
                <i class="fa-solid fa-broom text-[11px]"></i>
                <span>optimize:clear</span>
            </button>
            <button type="button" onclick="runCommandQuick('php artisan route:list')" class="neu-btn px-3 py-1.5 text-xs font-bold text-[#1B2A2F] hover:bg-white flex items-center gap-1.5 cursor-pointer">
                <i class="fa-solid fa-list-check text-[11px]"></i>
                <span>route:list</span>
            </button>
            <button type="button" onclick="runCommandQuick('help')" class="neu-btn px-3 py-1.5 text-xs font-bold text-[#5C6B73] hover:bg-white flex items-center gap-1.5 cursor-pointer">
                <i class="fa-solid fa-circle-question text-[11px]"></i>
                <span>help</span>
            </button>
        </div>
    </div>

    <!-- 3. MACOS-INSPIRED EMERALD TERMINAL WINDOW -->
    <div class="rounded-2xl overflow-hidden border border-[#0A3427] shadow-[0_12px_32px_rgba(10,52,39,0.3)] bg-[#071E17] font-mono text-xs sm:text-sm">
        <!-- Terminal Top Bar -->
        <div class="bg-[#0A2920] px-4 py-3 border-b border-[#0E3E30] flex items-center justify-between select-none">
            <!-- Window Control Buttons (Red, Yellow, Green) -->
            <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#EF4444] inline-block shadow-sm"></span>
                <span class="w-3 h-3 rounded-full bg-[#F59E0B] inline-block shadow-sm"></span>
                <span class="w-3 h-3 rounded-full bg-[#10B981] inline-block shadow-sm"></span>
                <span class="ml-2 text-[11px] text-[#A7C2B8] font-mono tracking-tight hidden sm:inline">bash — piaud@iaipersis:~/project</span>
            </div>

            <!-- Terminal Actions -->
            <div class="flex items-center gap-2">
                <button type="button" onclick="clearTerminal()" class="px-2.5 py-1 rounded bg-[#071E17] hover:bg-[#0E3E30] text-[#A7C2B8] hover:text-white text-[11px] transition-colors border border-[#0E3E30] flex items-center gap-1.5 cursor-pointer">
                    <i class="fa-solid fa-trash-can text-[10px]"></i>
                    <span>Clear</span>
                </button>
                <button type="button" onclick="copyTerminalOutput()" class="px-2.5 py-1 rounded bg-[#071E17] hover:bg-[#0E3E30] text-[#A7C2B8] hover:text-white text-[11px] transition-colors border border-[#0E3E30] flex items-center gap-1.5 cursor-pointer">
                    <i class="fa-solid fa-copy text-[10px]"></i>
                    <span>Copy</span>
                </button>
            </div>
        </div>

        <!-- Terminal Console Output Screen -->
        <div id="terminal-body" class="p-4 sm:p-6 overflow-y-auto max-h-[500px] min-h-[340px] space-y-4 text-[#FAF6EC] leading-relaxed scrollbar-thin scrollbar-thumb-[#0E3E30] scrollbar-track-[#071E17]">
            <!-- Welcome Banner -->
            <div class="text-[#A7C2B8] text-xs pb-3 border-b border-[#0E3E30]/70 select-none">
                <p class="text-[#10B981] font-bold">╔═══════════════════════════════════════════════════════════════════════╗</p>
                <p class="text-[#10B981] font-bold">║  PIAUD IAI PERSIS BANDUNG — WEB ARTISAN TERMINAL CONSOLE v2.0         ║</p>
                <p class="text-[#10B981] font-bold">╚═══════════════════════════════════════════════════════════════════════╝</p>
                <p class="mt-1">Environment: <span class="text-[#F59E0B]">{{ app()->environment() }}</span> | PHP: <span class="text-[#10B981]">{{ $phpVersion }}</span> | Database: <span class="text-[#10B981]">{{ $dbStatus }}</span></p>
                <p class="text-[11px] text-[#A7C2B8]/80 mt-1">Ketik <span class="text-[#F59E0B] font-bold">help</span> untuk panduan perintah atau klik tombol shortcut di atas.</p>
            </div>

            <!-- Dynamic Output Container -->
            <div id="terminal-output" class="space-y-4"></div>

            <!-- Active Loading Indicator (Hidden by default) -->
            <div id="terminal-loading" class="hidden flex items-center gap-2 text-[#F59E0B] text-xs pt-1">
                <i class="fa-solid fa-circle-notch fa-spin"></i>
                <span id="loading-text">Mengeksekusi perintah...</span>
            </div>
        </div>

        <!-- Terminal Command Input Bar -->
        <form id="terminal-form" onsubmit="handleFormSubmit(event)" class="bg-[#051812] px-4 py-3 border-t border-[#0E3E30] flex items-center gap-2">
            @csrf
            <div class="flex items-center gap-1.5 shrink-0 text-[#10B981] font-bold select-none text-xs sm:text-sm">
                <span>piaud@iaipersis:~$</span>
            </div>
            <input 
                type="text" 
                id="command-input" 
                name="command" 
                autocomplete="off" 
                spellcheck="false" 
                placeholder="Ketik perintah (contoh: migrate, db:seed, optimize:clear)..." 
                class="flex-1 bg-transparent border-0 outline-none text-[#FAF6EC] font-mono text-xs sm:text-sm placeholder-[#A7C2B8]/40 focus:ring-0 px-2 py-1"
                autofocus
            />
            <button 
                type="submit" 
                id="btn-submit"
                class="px-3.5 py-1.5 rounded-lg bg-[#0F4C3A] hover:bg-[#135E48] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-[#166F55] active:scale-95"
            >
                <span>Run</span>
                <i class="fa-solid fa-arrow-turn-down text-[10px]"></i>
            </button>
        </form>
    </div>

    <!-- 4. PANDUAN PENGGUNAAN AMAN -->
    <div class="neu-card p-5 border border-[#E3DAC7] space-y-2 bg-[#F2ECE0]/60">
        <h4 class="font-serif font-bold text-xs text-[#0F4C3A] uppercase tracking-wider flex items-center gap-2">
            <i class="fa-solid fa-shield-halved"></i>
            Catatan Keamanan & Praktik Terbaik:
        </h4>
        <ul class="text-xs text-[#5C6B73] space-y-1 list-disc list-inside leading-relaxed">
            <li>Perintah <code class="bg-[#FAF6EC] px-1.5 py-0.5 rounded border border-[#E3DAC7] text-[#0F4C3A] font-mono">migrate</code> dan <code class="bg-[#FAF6EC] px-1.5 py-0.5 rounded border border-[#E3DAC7] text-[#0F4C3A] font-mono">db:seed</code> secara otomatis menyertakan flag <code class="text-[#C2613A]">--force</code> agar tidak terhalang konfirmasi terminal di mode produksi.</li>
            <li>Perintah <code class="bg-[#FAF6EC] px-1.5 py-0.5 rounded border border-[#E3DAC7] text-[#0F4C3A] font-mono">storage:link</code> memiliki fallback native PHP jika server hosting mematikan eksekusi symlink bawaan Symfony.</li>
            <li>Gunakan tombol panah <strong>Atas (↑)</strong> dan <strong>Bawah (↓)</strong> pada keyboard untuk memanggil kembali riwayat perintah yang pernah diketik sebelumnya.</li>
        </ul>
    </div>

</div>

<!-- SCRIPT TERMINAL INTERAKTIF -->
<script>
    const history = [];
    let historyIndex = -1;
    const terminalOutput = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');
    const commandInput = document.getElementById('command-input');
    const terminalLoading = document.getElementById('terminal-loading');
    const loadingText = document.getElementById('loading-text');
    const btnSubmit = document.getElementById('btn-submit');

    // Auto-focus input on click anywhere inside terminal body
    terminalBody.addEventListener('click', () => {
        commandInput.focus();
    });

    // History navigation with Arrow Up & Down
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0 && historyIndex < history.length - 1) {
                historyIndex++;
                commandInput.value = history[history.length - 1 - historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = history[history.length - 1 - historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                commandInput.value = '';
            }
        }
    });

    function handleFormSubmit(e) {
        e.preventDefault();
        const cmd = commandInput.value.trim();
        if (!cmd) return;
        executeCommand(cmd);
    }

    function runCommandQuick(cmd) {
        commandInput.value = cmd;
        executeCommand(cmd);
    }

    function executeCommand(cmd) {
        // Handle client-side clear
        if (cmd.toLowerCase() === 'clear' || cmd.toLowerCase() === 'cls') {
            clearTerminal();
            commandInput.value = '';
            return;
        }

        // Save to history
        history.push(cmd);
        historyIndex = -1;

        // Show loading
        terminalLoading.classList.remove('hidden');
        loadingText.textContent = `Menjalankan: ${cmd}...`;
        btnSubmit.disabled = true;
        btnSubmit.classList.add('opacity-50');

        const now = new Date();
        const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        fetch("{{ route('admin.terminal.execute') }}", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token() }}',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ command: cmd })
        })
        .then(async response => {
            let data = null;
            try {
                data = await response.json();
        } catch (e) {
                const text = await response.text();
                data = { output: text || `HTTP ${response.status}: ${response.statusText}`, success: false };
            }
            return { ok: response.ok, data };
        })
        .then(({ ok, data }) => {
            const output = data.output ?? data.message ?? (typeof data === 'string' ? data : JSON.stringify(data, null, 2));
            const isSuccess = ok && (data.success !== false);
            const execTime = data.execution_time ?? (isSuccess ? "0.01s" : "0.00s");
            appendCommandResult(cmd, output, isSuccess, execTime, timeStr);
        })
        .catch(err => {
            appendCommandResult(cmd, "❌ Koneksi Gagal: " + err.message, false, "0.00s", timeStr);
        })
        .finally(() => {
            terminalLoading.classList.add('hidden');
            btnSubmit.disabled = false;
            btnSubmit.classList.remove('opacity-50');
            commandInput.value = '';
            commandInput.focus();
            scrollToBottom();
        });
    }

    function appendCommandResult(cmd, output, isSuccess, executionTime, timeStr) {
        const item = document.createElement('div');
        item.className = 'space-y-1.5 pt-2 border-t border-[#0E3E30]/50';

        const header = document.createElement('div');
        header.className = 'flex items-center justify-between text-xs font-mono';
        header.innerHTML = `
            <div>
                <span class="text-[#10B981] font-bold">piaud@iaipersis</span>:<span class="text-[#60A5FA]">~/project</span>$ 
                <span class="text-white font-bold">${escapeHtml(cmd)}</span>
            </div>
            <div class="text-[11px] text-[#A7C2B8]/70 flex items-center gap-2">
                <span>⏱️ ${executionTime}</span>
                <span>[${timeStr}]</span>
            </div>
        `;

        const pre = document.createElement('pre');
        pre.className = `p-3 rounded-lg text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono ${
            isSuccess 
                ? 'bg-[#051812] text-[#D1FAE5] border border-[#0E3E30]' 
                : 'bg-[#250808] text-[#FCA5A5] border border-[#501313]'
        }`;
        pre.textContent = output;

        item.appendChild(header);
        item.appendChild(pre);
        terminalOutput.appendChild(item);
    }

    function clearTerminal() {
        terminalOutput.innerHTML = '';
        commandInput.value = '';
        commandInput.focus();
    }

    function copyTerminalOutput() {
        const text = terminalOutput.innerText;
        if (!text) {
            alert('Layar terminal masih kosong.');
            return;
        }
        navigator.clipboard.writeText(text).then(() => {
            alert('Isi terminal berhasil disalin ke clipboard!');
        });
    }

    function scrollToBottom() {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
</script>
@endsection
