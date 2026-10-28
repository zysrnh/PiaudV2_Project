@extends('layouts.admin')

@section('title', 'Dashboard Overview')
@section('header', 'Dashboard Overview')
@section('subheader', 'Statistik dan ringkasan pengelolaan konten portal S1 PIAUD IAI Persis Bandung')

@section('content')
<div class="space-y-8">

    <!-- 1. STATS METRICS (Clean Flat Cards with Crisp Borders) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Metric 1: Dosen -->
        <div class="neu-card p-6 flex items-center justify-between">
            <div class="space-y-1">
                <p class="text-xs font-bold text-[#5C6B73] uppercase tracking-wider">Total Dosen</p>
                <h3 class="font-serif text-3xl font-bold text-[#0F4C3A]">{{ $totalLecturers ?? 0 }}</h3>
                <span class="text-[11px] text-[#5C6B73]">Tenaga Pengajar Aktif</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-[#F2ECE0] border border-[#E3DAC7] flex items-center justify-center text-[#0F4C3A] text-xl">
                <i class="fa-solid fa-chalkboard-user"></i>
            </div>
        </div>

        <!-- Metric 2: Artikel -->
        <div class="neu-card p-6 flex items-center justify-between">
            <div class="space-y-1">
                <p class="text-xs font-bold text-[#5C6B73] uppercase tracking-wider">Artikel &amp; Berita</p>
                <h3 class="font-serif text-3xl font-bold text-[#C2613A]">{{ $totalArticles ?? 0 }}</h3>
                <span class="text-[11px] text-[#5C6B73]">Khazanah &amp; Parenting</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-[#F2ECE0] border border-[#E3DAC7] flex items-center justify-center text-[#C2613A] text-xl">
                <i class="fa-solid fa-newspaper"></i>
            </div>
        </div>

        <!-- Metric 3: Galeri & Media -->
        <div class="neu-card p-6 flex items-center justify-between">
            <div class="space-y-1">
                <p class="text-xs font-bold text-[#5C6B73] uppercase tracking-wider">Foto &amp; Dokumentasi</p>
                <h3 class="font-serif text-3xl font-bold text-[#1B2A2F]">{{ $totalGalleries ?? 0 }}</h3>
                <span class="text-[11px] text-[#5C6B73]">Praktikum &amp; Lapangan</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-[#F2ECE0] border border-[#E3DAC7] flex items-center justify-center text-[#1B2A2F] text-xl">
                <i class="fa-solid fa-images"></i>
            </div>
        </div>

        <!-- Metric 4: Pesan Masuk -->
        <div class="neu-card p-6 flex items-center justify-between">
            <div class="space-y-1">
                <p class="text-xs font-bold text-[#5C6B73] uppercase tracking-wider">Pesan Publik</p>
                <h3 class="font-serif text-3xl font-bold text-[#0F4C3A]">{{ $totalContacts ?? 0 }}</h3>
                <span class="text-[11px] text-[#5C6B73]">Kontak &amp; Konsultasi</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-[#F2ECE0] border border-[#E3DAC7] flex items-center justify-center text-[#0F4C3A] text-xl">
                <i class="fa-solid fa-envelope-open-text"></i>
            </div>
        </div>
    </div>

    <!-- 2. QUICK ACTIONS & CONTENT FEED -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left: Quick Actions & Identitas Prodi -->
        <div class="lg:col-span-5 space-y-6">
            <div class="neu-card p-6 space-y-4">
                <div class="flex items-center justify-between border-b border-[#E3DAC7] pb-3">
                    <h3 class="font-serif font-bold text-base text-[#0F4C3A] flex items-center gap-2">
                        <i class="fa-solid fa-bolt text-[#C2613A]"></i>
                        <span>Aksi Cepat Pengelolaan</span>
                    </h3>
                </div>
                <p class="text-xs text-[#5C6B73]">Pintasan cepat untuk menambahkan atau memodifikasi konten utama portal prodi.</p>

                <div class="grid grid-cols-2 gap-3 pt-2">
                    <a href="{{ route('admin.lecturers.create') }}" class="neu-btn p-3.5 text-center block space-y-1 hover:border-[#0F4C3A] hover:text-[#0F4C3A] cursor-pointer">
                        <i class="fa-solid fa-user-plus text-base text-[#0F4C3A]"></i>
                        <span class="text-xs font-bold block">Tambah Dosen</span>
                    </a>

                    <a href="{{ route('admin.articles.create') }}" class="neu-btn p-3.5 text-center block space-y-1 hover:border-[#C2613A] hover:text-[#C2613A] cursor-pointer">
                        <i class="fa-solid fa-pen-nib text-base text-[#C2613A]"></i>
                        <span class="text-xs font-bold block">Tulis Artikel</span>
                    </a>

                    <a href="{{ route('admin.gallery.index') }}" class="neu-btn p-3.5 text-center block space-y-1 hover:border-[#0F4C3A] hover:text-[#0F4C3A] cursor-pointer">
                        <i class="fa-solid fa-cloud-arrow-up text-base text-[#0F4C3A]"></i>
                        <span class="text-xs font-bold block">Upload Foto</span>
                    </a>

                    <a href="{{ route('admin.settings.index') }}" class="neu-btn p-3.5 text-center block space-y-1 hover:border-[#1B2A2F] hover:text-[#1B2A2F] cursor-pointer">
                        <i class="fa-solid fa-sliders text-base text-[#1B2A2F]"></i>
                        <span class="text-xs font-bold block">Identitas Web</span>
                    </a>
                </div>
            </div>

            <!-- Identitas Prodi Card -->
            <div class="neu-card p-6 space-y-3">
                <h4 class="font-bold text-xs text-[#5C6B73] uppercase tracking-wider border-b border-[#E3DAC7] pb-2">Identitas Program Studi</h4>
                <div class="neu-inset p-4 space-y-2.5 text-xs bg-[#F2ECE0]/50">
                    <div class="flex justify-between border-b border-[#E3DAC7]/60 pb-1.5">
                        <span class="text-[#5C6B73]">Program Studi</span>
                        <span class="font-bold text-[#1B2A2F]">S1 PIAUD</span>
                    </div>
                    <div class="flex justify-between border-b border-[#E3DAC7]/60 pb-1.5">
                        <span class="text-[#5C6B73]">Fakultas</span>
                        <span class="font-bold text-[#1B2A2F]">Tarbiyah</span>
                    </div>
                    <div class="flex justify-between border-b border-[#E3DAC7]/60 pb-1.5">
                        <span class="text-[#5C6B73]">Institusi</span>
                        <span class="font-bold text-[#1B2A2F]">IAI Persis Bandung</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-[#5C6B73]">Akreditasi</span>
                        <span class="font-bold text-[#0F4C3A]">Baik (LAMDIK)</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right: Recent Articles & Highlights -->
        <div class="lg:col-span-7 space-y-6">
            <div class="neu-card p-6 space-y-4">
                <div class="flex items-center justify-between border-b border-[#E3DAC7] pb-3">
                    <h3 class="font-serif font-bold text-base text-[#0F4C3A]">Artikel &amp; Berita Terbaru</h3>
                    <a href="{{ route('admin.articles.index') }}" class="text-xs font-bold text-[#0F4C3A] hover:underline flex items-center gap-1">
                        <span>Lihat Semua</span>
                        <span>&rarr;</span>
                    </a>
                </div>

                @if(isset($recentArticles) && count($recentArticles) > 0)
                    <div class="space-y-3">
                        @foreach($recentArticles as $art)
                            <div class="neu-card-sm p-3.5 flex items-center justify-between gap-4 bg-white/60">
                                <div class="min-w-0">
                                    <div class="flex items-center gap-2 text-[11px] text-[#5C6B73] mb-1">
                                        <span class="text-[#C2613A] font-bold uppercase tracking-wider text-[10px]">
                                            {{ $art->category->name ?? 'Umum' }}
                                        </span>
                                        <span>&bull;</span>
                                        <span>{{ $art->created_at->format('d M Y') }}</span>
                                    </div>
                                    <h4 class="font-bold text-xs text-[#1B2A2F] truncate">{{ $art->title }}</h4>
                                </div>
                                <a href="{{ route('admin.articles.edit', $art->id) }}" class="neu-btn px-3 py-1.5 text-xs text-[#0F4C3A] shrink-0 hover:bg-[#0F4C3A] hover:text-white">
                                    Edit
                                </a>
                            </div>
                        @endforeach
                    </div>
                @else
                    <div class="neu-inset p-8 text-center text-xs text-[#5C6B73]">
                        <i class="fa-solid fa-newspaper text-2xl mb-2 text-[#5C6B73]/60 block"></i>
                        <span>Belum ada artikel yang diterbitkan.</span>
                    </div>
                @endif
            </div>

            <!-- Dosen Highlight List -->
            <div class="neu-card p-6 space-y-4">
                <div class="flex items-center justify-between border-b border-[#E3DAC7] pb-3">
                    <h3 class="font-serif font-bold text-base text-[#0F4C3A]">Direktori Dosen Pengampu</h3>
                    <a href="{{ route('admin.lecturers.index') }}" class="text-xs font-bold text-[#0F4C3A] hover:underline flex items-center gap-1">
                        <span>Kelola Dosen</span>
                        <span>&rarr;</span>
                    </a>
                </div>

                @if(isset($recentLecturers) && count($recentLecturers) > 0)
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        @foreach($recentLecturers as $lec)
                            <div class="neu-card-sm p-3 flex items-center gap-3 bg-white/60">
                                <div class="w-10 h-10 rounded-lg bg-[#0F4C3A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                                    {{ substr($lec->name, 0, 1) }}
                                </div>
                                <div class="min-w-0">
                                    <h5 class="font-bold text-xs text-[#1B2A2F] truncate">{{ $lec->name }}</h5>
                                    <p class="text-[11px] text-[#C2613A] font-semibold truncate">{{ $lec->role ?? 'Dosen Pengampu' }}</p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                @else
                    <div class="neu-inset p-8 text-center text-xs text-[#5C6B73]">
                        <i class="fa-solid fa-chalkboard-user text-2xl mb-2 text-[#5C6B73]/60 block"></i>
                        <span>Data dosen belum diinputkan.</span>
                    </div>
                @endif
            </div>
        </div>

    </div>

</div>
@endsection
