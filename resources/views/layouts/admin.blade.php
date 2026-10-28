<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin Dashboard') - PIAUD IAI Persis Bandung</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet">
    
    <!-- FontAwesome & SweetAlert2 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.tailwindcss.com"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                        serif: ['"Lora"', 'serif'],
                    },
                    colors: {
                        piaud: {
                            emerald: '#0F4C3A',
                            'emerald-dark': '#0A3427',
                            'emerald-light': '#17664F',
                            ivory: '#FAF6EC',
                            'ivory-dark': '#F2ECE0',
                            terracotta: '#C2613A',
                            slate: '#1B2A2F',
                            'slate-muted': '#5C6B73',
                            border: '#E3DAC7',
                        }
                    }
                }
            }
        }
    </script>

    <style>
        body {
            background-color: #F2ECE0;
            color: #1B2A2F;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Clean Flat UI Design Tokens (Zero Neon Halo / Zero Puffy Neumorphism) */
        .neu-card {
            background-color: #FAF6EC;
            border: 1px solid #E3DAC7;
            box-shadow: 0 1px 3px 0 rgba(31, 41, 51, 0.05);
            border-radius: 12px;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .neu-card:hover {
            border-color: #D4C7AF;
            box-shadow: 0 4px 12px -2px rgba(31, 41, 51, 0.08);
        }

        .neu-card-sm {
            background-color: #FAF6EC;
            border: 1px solid #E3DAC7;
            box-shadow: 0 1px 2px 0 rgba(31, 41, 51, 0.04);
            border-radius: 8px;
        }

        .neu-btn {
            background-color: #FAF6EC;
            border: 1px solid #E3DAC7;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.15s ease-in-out;
        }

        .neu-btn:hover {
            background-color: #FFFFFF;
            border-color: #0F4C3A;
            color: #0F4C3A;
        }

        .neu-btn:active {
            transform: scale(0.98);
        }

        .neu-btn-primary {
            background-color: #0F4C3A;
            color: #FFFFFF;
            border: 1px solid #0A3427;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.15s ease-in-out;
        }

        .neu-btn-primary:hover {
            background-color: #0A3427;
            color: #FFFFFF;
        }

        .neu-btn-primary:active {
            transform: scale(0.98);
        }

        .neu-inset {
            background-color: #FAF6EC;
            border: 1px solid #E3DAC7;
            border-radius: 8px;
        }

        .neu-input {
            background-color: #FFFFFF;
            border: 1px solid #E3DAC7;
            border-radius: 8px;
            transition: all 0.2s ease;
        }

        .neu-input:focus {
            outline: none;
            border-color: #0F4C3A;
            box-shadow: 0 0 0 2px rgba(15, 76, 58, 0.15);
        }

        .neu-sidebar-active {
            background-color: #0F4C3A !important;
            color: #FFFFFF !important;
            border-color: #0A3427 !important;
            font-weight: 700 !important;
        }

        .neu-sidebar-active i {
            color: #FFFFFF !important;
        }
    </style>
</head>
<body class="min-h-screen flex">

    <!-- 1. SIDEBAR NAVIGATION -->
    <aside class="w-64 bg-[#FAF6EC] border-r border-[#E3DAC7] flex flex-col justify-between p-6 shrink-0 min-h-screen">
        <div class="space-y-6">
            <!-- Brand Identity -->
            <div class="flex items-center gap-3 pb-5 border-b border-[#E3DAC7]">
                <div class="w-10 h-10 rounded-lg bg-[#0F4C3A] text-white flex items-center justify-center font-bold text-lg font-serif">
                    P
                </div>
                <div>
                    <h2 class="font-bold text-sm text-[#0F4C3A] tracking-tight leading-tight">PIAUD PERSIS</h2>
                    <p class="text-[10px] text-[#5C6B73] font-semibold uppercase tracking-wider">Panel Admin CMS</p>
                </div>
            </div>

            <!-- Navigation Links -->
            <nav class="space-y-1.5">
                <a href="{{ route('admin.dashboard') }}" 
                   class="neu-btn flex items-center gap-3 px-3.5 py-2.5 text-xs {{ request()->routeIs('admin.dashboard') ? 'neu-sidebar-active' : 'text-[#1B2A2F] hover:text-[#0F4C3A]' }}">
                    <i class="fa-solid fa-chart-pie w-4 text-center"></i>
                    <span>Dashboard</span>
                </a>

                <a href="{{ route('admin.lecturers.index') }}" 
                   class="neu-btn flex items-center gap-3 px-3.5 py-2.5 text-xs {{ request()->routeIs('admin.lecturers.*') ? 'neu-sidebar-active' : 'text-[#1B2A2F] hover:text-[#0F4C3A]' }}">
                    <i class="fa-solid fa-chalkboard-user w-4 text-center"></i>
                    <span>Data Dosen</span>
                </a>

                <a href="{{ route('admin.articles.index') }}" 
                   class="neu-btn flex items-center gap-3 px-3.5 py-2.5 text-xs {{ request()->routeIs('admin.articles.*') ? 'neu-sidebar-active' : 'text-[#1B2A2F] hover:text-[#0F4C3A]' }}">
                    <i class="fa-solid fa-newspaper w-4 text-center"></i>
                    <span>Artikel & Berita</span>
                </a>

                <a href="{{ route('admin.gallery.index') }}" 
                   class="neu-btn flex items-center gap-3 px-3.5 py-2.5 text-xs {{ request()->routeIs('admin.gallery.*') ? 'neu-sidebar-active' : 'text-[#1B2A2F] hover:text-[#0F4C3A]' }}">
                    <i class="fa-solid fa-images w-4 text-center"></i>
                    <span>Galeri & Slider</span>
                </a>

                <a href="{{ route('admin.pages.index') }}" 
                   class="neu-btn flex items-center gap-3 px-3.5 py-2.5 text-xs {{ request()->routeIs('admin.pages.*') ? 'neu-sidebar-active' : 'text-[#1B2A2F] hover:text-[#0F4C3A]' }}">
                    <i class="fa-solid fa-file-lines w-4 text-center"></i>
                    <span>Profil & Halaman</span>
                </a>

                <a href="{{ route('admin.settings.index') }}" 
                   class="neu-btn flex items-center gap-3 px-3.5 py-2.5 text-xs {{ request()->routeIs('admin.settings.*') ? 'neu-sidebar-active' : 'text-[#1B2A2F] hover:text-[#0F4C3A]' }}">
                    <i class="fa-solid fa-sliders w-4 text-center"></i>
                    <span>Pengaturan Web</span>
                </a>

                {{-- HANYA ADMIN DEVELOPER YANG DAPAT MELIHAT MENU TERMINAL --}}
                @if(auth()->check() && auth()->user()->isDev())
                <div class="pt-3 border-t border-[#E3DAC7]/80">
                    <span class="text-[10px] font-bold text-[#C2613A] uppercase tracking-wider block px-2 mb-1.5">
                        Developer Tools
                    </span>
                    <a href="{{ route('admin.terminal.index') }}" 
                       class="neu-btn flex items-center gap-3 px-3.5 py-2.5 text-xs {{ request()->routeIs('admin.terminal.*') ? 'neu-sidebar-active' : 'text-[#1B2A2F] hover:text-[#0F4C3A]' }}">
                        <i class="fa-solid fa-terminal w-4 text-center"></i>
                        <span>Terminal Artisan</span>
                    </a>
                </div>
                @endif
            </nav>
        </div>

        <!-- Bottom Actions -->
        <div class="space-y-3 pt-6 border-t border-[#E3DAC7]">
            <a href="{{ url('/') }}" target="_blank" class="neu-btn flex items-center justify-center gap-2 px-3 py-2 text-xs text-[#0F4C3A] hover:bg-white">
                <i class="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                <span>Lihat Web Publik</span>
            </a>

            <div class="neu-inset p-3 flex items-center justify-between">
                <div class="min-w-0 pr-2">
                    <p class="font-bold text-xs truncate text-[#1B2A2F]">{{ auth()->user()->name ?? 'Administrator' }}</p>
                    <p class="text-[10px] font-bold text-[#C2613A] uppercase tracking-wide truncate">
                        {{ (auth()->check() && auth()->user()->isDev()) ? 'Developer' : 'Admin Konten' }}
                    </p>
                </div>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="neu-btn px-2.5 py-1.5 text-xs text-red-600 hover:text-red-800 cursor-pointer" title="Keluar">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </button>
                </form>
            </div>
        </div>
    </aside>

    <!-- 2. MAIN CONTENT AREA -->
    <div class="flex-1 flex flex-col min-w-0 min-h-screen">
        <!-- Topbar -->
        <header class="bg-[#FAF6EC] border-b border-[#E3DAC7] px-8 py-4 flex items-center justify-between shrink-0">
            <div>
                <h1 class="font-serif font-bold text-xl text-[#0F4C3A]">@yield('header', 'Dashboard')</h1>
                <p class="text-xs text-[#5C6B73]">@yield('subheader', 'Kelola informasi Program Studi S1 PIAUD IAI Persis Bandung')</p>
            </div>

            <div class="flex items-center gap-3">
                @if(auth()->check() && auth()->user()->isDev())
                    <span class="text-xs font-bold text-[#C2613A] flex items-center gap-1.5 uppercase tracking-wider">
                        <i class="fa-solid fa-code text-[11px]"></i>
                        <span>Developer Mode</span>
                    </span>
                @else
                    <span class="text-xs font-bold text-[#0F4C3A] flex items-center gap-1.5 uppercase tracking-wider">
                        <i class="fa-solid fa-user-shield text-[11px]"></i>
                        <span>Admin Konten</span>
                    </span>
                @endif
            </div>
        </header>

        <!-- Page Body -->
        <main class="flex-1 p-8 overflow-y-auto">
            @yield('content')
        </main>
    </div>

    <!-- SweetAlert2 Flash Messages -->
    <script>
        @if(session('success'))
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: "{{ session('success') }}",
                timer: 2500,
                showConfirmButton: false,
                background: '#FAF6EC',
                color: '#1B2A2F',
            });
        @endif

        @if(session('error'))
            Swal.fire({
                icon: 'error',
                title: 'Perhatian!',
                text: "{{ session('error') }}",
                background: '#FAF6EC',
                color: '#1B2A2F',
            });
        @endif
    </script>
</body>
</html>
