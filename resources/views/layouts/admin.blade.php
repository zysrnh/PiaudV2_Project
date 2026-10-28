<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin Dashboard') - PIAUD IAI Persis Bandung</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&display=swap" rel="stylesheet">
    
    <!-- FontAwesome & SweetAlert2 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.tailwindcss.com"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Public Sans"', 'sans-serif'],
                        serif: ['"Source Serif 4"', 'serif'],
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
        :root {
            --bg-base: #F2ECE0;
            --shadow-light: #FFFFFF;
            --shadow-dark: #D4CCC0;
        }

        body {
            background-color: var(--bg-base);
            color: #1B2A2F;
            font-family: 'Public Sans', sans-serif;
        }

        /* Neumorphic Tokens */
        .neu-card {
            background-color: #FAF6EC;
            border: 1px solid rgba(227, 218, 199, 0.45);
            box-shadow: 6px 6px 14px var(--shadow-dark), -6px -6px 14px var(--shadow-light);
            border-radius: 12px;
        }

        .neu-card-sm {
            background-color: #FAF6EC;
            border: 1px solid rgba(227, 218, 199, 0.4);
            box-shadow: 4px 4px 10px var(--shadow-dark), -4px -4px 10px var(--shadow-light);
            border-radius: 10px;
        }

        .neu-btn {
            background-color: #FAF6EC;
            border: 1px solid rgba(227, 218, 199, 0.6);
            box-shadow: 4px 4px 10px var(--shadow-dark), -4px -4px 10px var(--shadow-light);
            transition: all 0.15s ease-in-out;
            border-radius: 8px;
            font-weight: 600;
        }

        .neu-btn:hover {
            box-shadow: 6px 6px 14px #c8bfb2, -6px -6px 14px var(--shadow-light);
            transform: translateY(-1px);
        }

        .neu-btn:active, .neu-btn.active {
            box-shadow: inset 3px 3px 6px var(--shadow-dark), inset -3px -3px 6px var(--shadow-light);
            transform: translateY(1px);
        }

        .neu-btn-primary {
            background-color: #0F4C3A;
            color: #FFFFFF;
            border: 1px solid #0A3427;
            box-shadow: 5px 5px 12px rgba(10, 52, 39, 0.4), -3px -3px 8px rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.15s ease-in-out;
        }

        .neu-btn-primary:hover {
            background-color: #0A3427;
            box-shadow: 7px 7px 15px rgba(10, 52, 39, 0.5), -4px -4px 10px rgba(255, 255, 255, 0.4);
            transform: translateY(-1px);
        }

        .neu-btn-primary:active {
            box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.5), inset -2px -2px 4px rgba(255, 255, 255, 0.1);
            transform: translateY(1px);
        }

        .neu-inset {
            background-color: #F2ECE0;
            box-shadow: inset 3px 3px 7px var(--shadow-dark), inset -3px -3px 7px var(--shadow-light);
            border: 1px solid rgba(227, 218, 199, 0.6);
            border-radius: 10px;
        }

        .neu-input {
            background-color: #FAF6EC;
            border: 1px solid #E3DAC7;
            box-shadow: inset 2px 2px 5px var(--shadow-dark), inset -2px -2px 5px var(--shadow-light);
            border-radius: 8px;
            transition: all 0.2s ease;
        }

        .neu-input:focus {
            outline: none;
            border-color: #0F4C3A;
            box-shadow: inset 2px 2px 5px #c8bfb2, inset -2px -2px 5px var(--shadow-light), 0 0 0 2px rgba(15, 76, 58, 0.2);
        }

        .neu-sidebar-active {
            background-color: #0F4C3A !important;
            color: #FFFFFF !important;
            box-shadow: inset 3px 3px 6px rgba(0,0,0,0.4), inset -2px -2px 5px rgba(255,255,255,0.15) !important;
        }
    </style>
</head>
<body class="min-h-screen flex">

    <!-- 1. SIDEBAR (Neumorphic Soft Slate) -->
    <aside class="w-64 bg-[#F2ECE0] border-r border-[#E3DAC7] p-5 flex flex-col justify-between shrink-0 min-h-screen">
        <div>
            <!-- Brand -->
            <div class="neu-card-sm p-4 mb-6 flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-[#0F4C3A] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    P
                </div>
                <div>
                    <h2 class="font-bold text-sm text-[#0F4C3A] tracking-tight leading-tight">PIAUD PERSIS</h2>
                    <p class="text-[10px] text-[#5C6B73] font-semibold uppercase tracking-wider">Panel Admin CMS</p>
                </div>
            </div>

            <!-- Navigation Links -->
            <nav class="space-y-2.5">
                <a href="{{ route('admin.dashboard') }}" 
                   class="neu-btn flex items-center gap-3 px-4 py-3 text-xs {{ request()->routeIs('admin.dashboard') ? 'neu-sidebar-active' : 'text-[#1B2A2F] hover:text-[#0F4C3A]' }}">
                    <i class="fa-solid fa-chart-pie w-4 text-center"></i>
                    <span>Dashboard</span>
                </a>

                <a href="{{ route('admin.lecturers.index') }}" 
                   class="neu-btn flex items-center gap-3 px-4 py-3 text-xs {{ request()->routeIs('admin.lecturers.*') ? 'neu-sidebar-active' : 'text-[#1B2A2F] hover:text-[#0F4C3A]' }}">
                    <i class="fa-solid fa-chalkboard-user w-4 text-center"></i>
                    <span>Data Dosen</span>
                </a>

                <a href="{{ route('admin.articles.index') }}" 
                   class="neu-btn flex items-center gap-3 px-4 py-3 text-xs {{ request()->routeIs('admin.articles.*') ? 'neu-sidebar-active' : 'text-[#1B2A2F] hover:text-[#0F4C3A]' }}">
                    <i class="fa-solid fa-newspaper w-4 text-center"></i>
                    <span>Artikel & Berita</span>
                </a>

                <a href="{{ route('admin.gallery.index') }}" 
                   class="neu-btn flex items-center gap-3 px-4 py-3 text-xs {{ request()->routeIs('admin.gallery.*') ? 'neu-sidebar-active' : 'text-[#1B2A2F] hover:text-[#0F4C3A]' }}">
                    <i class="fa-solid fa-images w-4 text-center"></i>
                    <span>Galeri & Slider</span>
                </a>

                <a href="{{ route('admin.pages.index') }}" 
                   class="neu-btn flex items-center gap-3 px-4 py-3 text-xs {{ request()->routeIs('admin.pages.*') ? 'neu-sidebar-active' : 'text-[#1B2A2F] hover:text-[#0F4C3A]' }}">
                    <i class="fa-solid fa-file-lines w-4 text-center"></i>
                    <span>Profil & Halaman</span>
                </a>

                <a href="{{ route('admin.settings.index') }}" 
                   class="neu-btn flex items-center gap-3 px-4 py-3 text-xs {{ request()->routeIs('admin.settings.*') ? 'neu-sidebar-active' : 'text-[#1B2A2F] hover:text-[#0F4C3A]' }}">
                    <i class="fa-solid fa-sliders w-4 text-center"></i>
                    <span>Pengaturan Web</span>
                </a>
            </nav>
        </div>

        <!-- Bottom Actions -->
        <div class="space-y-3 pt-6 border-t border-[#E3DAC7]/70">
            <a href="{{ url('/') }}" target="_blank" class="neu-btn flex items-center justify-center gap-2 px-3 py-2.5 text-xs text-[#0F4C3A]">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                <span>Lihat Web Publik</span>
            </a>

            <div class="neu-inset p-3 flex items-center justify-between">
                <div class="min-w-0 pr-2">
                    <p class="font-bold text-xs truncate text-[#1B2A2F]">{{ auth()->user()->name ?? 'Administrator' }}</p>
                    <p class="text-[10px] text-[#5C6B73] truncate">{{ auth()->user()->email ?? 'admin@piaud' }}</p>
                </div>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="neu-btn px-2.5 py-1.5 text-xs text-red-600 hover:text-red-800" title="Keluar">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </button>
                </form>
            </div>
        </div>
    </aside>

    <!-- 2. MAIN CONTENT AREA -->
    <div class="flex-1 flex flex-col min-w-0 min-h-screen">
        <!-- Topbar -->
        <header class="bg-[#F2ECE0] border-b border-[#E3DAC7] px-8 py-4 flex items-center justify-between shrink-0">
            <div>
                <h1 class="font-serif font-bold text-xl text-[#0F4C3A]">@yield('header', 'Dashboard')</h1>
                <p class="text-xs text-[#5C6B73]">@yield('subheader', 'Kelola informasi Program Studi S1 PIAUD IAI Persis Bandung')</p>
            </div>

            <div class="flex items-center gap-3">
                <div class="neu-inset px-3 py-1.5 text-xs font-semibold text-[#0F4C3A] flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span>Sistem Aktif (V2)</span>
                </div>
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
                title: 'Gagal!',
                text: "{{ session('error') }}",
                background: '#FAF6EC',
                color: '#1B2A2F',
            });
        @endif
    </script>

    @stack('scripts')
</body>
</html>
