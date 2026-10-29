@extends('layouts.admin')

@section('title', 'Dashboard Overview')
@section('header', 'Dashboard Overview')
@section('subheader', 'Statistik dan ringkasan pengelolaan konten portal S1 PIAUD IAI Persis Bandung')

@section('content')
<div class="space-y-8">

    <!-- 1. STATS METRICS (Full Clickable & Interactive with Hover Physics) -->
    <div class="anim-slide-up anim-delay-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Metric 1: Total Dosen -->
        <a href="{{ route('admin.lecturers.index') }}" 
           class="card-interactive group cursor-pointer block p-6 bg-white border border-[#E3DAC7] rounded-xl shadow-sm hover:border-[#0F4C3A]">
            <div class="flex items-center justify-between">
                <div class="space-y-1">
                    <p class="text-[11px] font-bold text-[#5C6B73] uppercase tracking-wider">Total Dosen</p>
                    <h3 class="font-serif text-3xl font-bold text-[#0F4C3A] tracking-tight">{{ $totalLecturers ?? 0 }}</h3>
                    <span class="text-[11px] text-[#5C6B73]">Tenaga Pengajar Aktif</span>
                </div>
                <div class="w-12 h-12 rounded-xl bg-[#FAF6EC] border border-[#E3DAC7] flex items-center justify-center text-[#0F4C3A] text-xl group-hover:scale-110 group-hover:bg-[#0F4C3A] group-hover:text-white transition-all duration-300 shadow-sm">
                    <i class="fa-solid fa-chalkboard-user"></i>
                </div>
            </div>
            <div class="border-t border-[#E3DAC7]/60 pt-3 mt-4 flex items-center justify-between text-xs font-bold text-[#0F4C3A]">
                <span>Kelola Data Dosen</span>
                <i class="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover:translate-x-1.5"></i>
            </div>
        </a>

        <!-- Metric 2: Artikel & Berita -->
        <a href="{{ route('admin.articles.index') }}" 
           class="card-interactive card-interactive-terracotta group cursor-pointer block p-6 bg-white border border-[#E3DAC7] rounded-xl shadow-sm hover:border-[#C2613A]">
            <div class="flex items-center justify-between">
                <div class="space-y-1">
                    <p class="text-[11px] font-bold text-[#5C6B73] uppercase tracking-wider">Artikel &amp; Berita</p>
                    <h3 class="font-serif text-3xl font-bold text-[#C2613A] tracking-tight">{{ $totalArticles ?? 0 }}</h3>
                    <span class="text-[11px] text-[#5C6B73]">Khazanah &amp; Parenting</span>
                </div>
                <div class="w-12 h-12 rounded-xl bg-[#FAF6EC] border border-[#E3DAC7] flex items-center justify-center text-[#C2613A] text-xl group-hover:scale-110 group-hover:bg-[#C2613A] group-hover:text-white transition-all duration-300 shadow-sm">
                    <i class="fa-solid fa-newspaper"></i>
                </div>
            </div>
            <div class="border-t border-[#E3DAC7]/60 pt-3 mt-4 flex items-center justify-between text-xs font-bold text-[#C2613A]">
                <span>Buka Daftar Artikel</span>
                <i class="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover:translate-x-1.5"></i>
            </div>
        </a>

        <!-- Metric 3: Foto & Dokumentasi -->
        <a href="{{ route('admin.gallery.index') }}" 
           class="card-interactive card-interactive-slate group cursor-pointer block p-6 bg-white border border-[#E3DAC7] rounded-xl shadow-sm hover:border-[#1B2A2F]">
            <div class="flex items-center justify-between">
                <div class="space-y-1">
                    <p class="text-[11px] font-bold text-[#5C6B73] uppercase tracking-wider">Foto &amp; Dokumentasi</p>
                    <h3 class="font-serif text-3xl font-bold text-[#1B2A2F] tracking-tight">{{ $totalGalleries ?? 0 }}</h3>
                    <span class="text-[11px] text-[#5C6B73]">Praktikum &amp; Lapangan</span>
                </div>
                <div class="w-12 h-12 rounded-xl bg-[#FAF6EC] border border-[#E3DAC7] flex items-center justify-center text-[#1B2A2F] text-xl group-hover:scale-110 group-hover:bg-[#1B2A2F] group-hover:text-white transition-all duration-300 shadow-sm">
                    <i class="fa-solid fa-images"></i>
                </div>
            </div>
            <div class="border-t border-[#E3DAC7]/60 pt-3 mt-4 flex items-center justify-between text-xs font-bold text-[#1B2A2F]">
                <span>Kelola Galeri Media</span>
                <i class="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover:translate-x-1.5"></i>
            </div>
        </a>

        <!-- Metric 4: Pesan Masuk / Pengaturan -->
        <a href="{{ route('admin.contacts.index') }}" 
           class="card-interactive group cursor-pointer block p-6 bg-white border border-[#E3DAC7] rounded-xl shadow-sm hover:border-[#0F4C3A]">
            <div class="flex items-center justify-between">
                <div class="space-y-1">
                    <p class="text-[11px] font-bold text-[#5C6B73] uppercase tracking-wider">Pesan Publik</p>
                    <h3 class="font-serif text-3xl font-bold text-[#0F4C3A] tracking-tight">{{ $totalContacts ?? 0 }}</h3>
                    <span class="text-[11px] text-[#5C6B73]">Kontak &amp; Konsultasi</span>
                </div>
                <div class="w-12 h-12 rounded-xl bg-[#FAF6EC] border border-[#E3DAC7] flex items-center justify-center text-[#0F4C3A] text-xl group-hover:scale-110 group-hover:bg-[#0F4C3A] group-hover:text-white transition-all duration-300 shadow-sm">
                    <i class="fa-solid fa-envelope-open-text"></i>
                </div>
            </div>
            <div class="border-t border-[#E3DAC7]/60 pt-3 mt-4 flex items-center justify-between text-xs font-bold text-[#0F4C3A]">
                <span>Buka Pesan Masuk</span>
                <i class="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover:translate-x-1.5"></i>
            </div>
        </a>
    </div>

    <!-- 2. QUICK ACTIONS & CONTENT FEED -->
    <div class="anim-slide-up anim-delay-2 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Column: Quick Actions & Identitas Prodi (5 Cols) -->
        <div class="lg:col-span-5 space-y-6">
            
            <!-- Quick Action Cards -->
            <div class="bg-white border border-[#E3DAC7] rounded-xl p-6 space-y-4 shadow-sm">
                <div class="flex items-center justify-between border-b border-[#E3DAC7] pb-3">
                    <h3 class="font-serif font-bold text-base text-[#0F4C3A] flex items-center gap-2">
                        <i class="fa-solid fa-bolt text-[#C2613A]"></i>
                        <span>Aksi Cepat Pengelolaan</span>
                    </h3>
                    <span class="text-[11px] text-[#5C6B73]">1-Klik Langsung Buka</span>
                </div>
                <p class="text-xs text-[#5C6B73]">Pintasan cepat untuk menambahkan atau memodifikasi konten utama portal prodi.</p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <!-- Action 1: Tambah Dosen -->
                    <a href="{{ route('admin.lecturers.create') }}" 
                       class="card-interactive group cursor-pointer block p-4 bg-[#FAF6EC] hover:bg-white border border-[#E3DAC7] hover:border-[#0F4C3A] rounded-xl shadow-xs">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-lg bg-white border border-[#E3DAC7] flex items-center justify-center text-[#0F4C3A] text-base group-hover:bg-[#0F4C3A] group-hover:text-white transition-colors">
                                <i class="fa-solid fa-user-plus"></i>
                            </div>
                            <div class="min-w-0">
                                <h4 class="text-xs font-bold text-[#1B2A2F] group-hover:text-[#0F4C3A] transition-colors">Tambah Dosen</h4>
                                <p class="text-[10px] text-[#5C6B73] truncate">Biodata &amp; Kepakaran</p>
                            </div>
                        </div>
                    </a>

                    <!-- Action 2: Tulis Artikel -->
                    <a href="{{ route('admin.articles.create') }}" 
                       class="card-interactive card-interactive-terracotta group cursor-pointer block p-4 bg-[#FAF6EC] hover:bg-white border border-[#E3DAC7] hover:border-[#C2613A] rounded-xl shadow-xs">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-lg bg-white border border-[#E3DAC7] flex items-center justify-center text-[#C2613A] text-base group-hover:bg-[#C2613A] group-hover:text-white transition-colors">
                                <i class="fa-solid fa-pen-nib"></i>
                            </div>
                            <div class="min-w-0">
                                <h4 class="text-xs font-bold text-[#1B2A2F] group-hover:text-[#C2613A] transition-colors">Tulis Artikel</h4>
                                <p class="text-[10px] text-[#5C6B73] truncate">Publikasi Berita</p>
                            </div>
                        </div>
                    </a>

                    <!-- Action 3: Upload Foto -->
                    <a href="{{ route('admin.gallery.index') }}" 
                       class="card-interactive group cursor-pointer block p-4 bg-[#FAF6EC] hover:bg-white border border-[#E3DAC7] hover:border-[#0F4C3A] rounded-xl shadow-xs">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-lg bg-white border border-[#E3DAC7] flex items-center justify-center text-[#0F4C3A] text-base group-hover:bg-[#0F4C3A] group-hover:text-white transition-colors">
                                <i class="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            <div class="min-w-0">
                                <h4 class="text-xs font-bold text-[#1B2A2F] group-hover:text-[#0F4C3A] transition-colors">Upload Foto</h4>
                                <p class="text-[10px] text-[#5C6B73] truncate">Galeri &amp; Banner</p>
                            </div>
                        </div>
                    </a>

                    <!-- Action 4: Identitas Web -->
                    <a href="{{ route('admin.settings.index') }}" 
                       class="card-interactive card-interactive-slate group cursor-pointer block p-4 bg-[#FAF6EC] hover:bg-white border border-[#E3DAC7] hover:border-[#1B2A2F] rounded-xl shadow-xs">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-lg bg-white border border-[#E3DAC7] flex items-center justify-center text-[#1B2A2F] text-base group-hover:bg-[#1B2A2F] group-hover:text-white transition-colors">
                                <i class="fa-solid fa-sliders"></i>
                            </div>
                            <div class="min-w-0">
                                <h4 class="text-xs font-bold text-[#1B2A2F] group-hover:text-[#1B2A2F] transition-colors">Identitas Web</h4>
                                <p class="text-[10px] text-[#5C6B73] truncate">Kontak &amp; Sosmed</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <!-- Identitas Prodi Card -->
            <div class="bg-white border border-[#E3DAC7] rounded-xl p-6 space-y-3 shadow-sm">
                <div class="flex items-center justify-between border-b border-[#E3DAC7] pb-2">
                    <h4 class="font-bold text-xs text-[#5C6B73] uppercase tracking-wider flex items-center gap-2">
                        <i class="fa-solid fa-university text-[#0F4C3A]"></i>
                        Identitas Program Studi
                    </h4>
                    <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Terakreditasi</span>
                </div>
                <div class="p-4 space-y-2.5 text-xs bg-[#FAF6EC] rounded-xl border border-[#E3DAC7]/80">
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

        <!-- Right Column: Recent Articles & Highlights (7 Cols) -->
        <div class="lg:col-span-7 space-y-6">
            
            <!-- Recent Articles List -->
            <div class="bg-white border border-[#E3DAC7] rounded-xl p-6 space-y-4 shadow-sm">
                <div class="flex items-center justify-between border-b border-[#E3DAC7] pb-3">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-newspaper text-[#C2613A]"></i>
                        <h3 class="font-serif font-bold text-base text-[#0F4C3A]">Artikel &amp; Berita Terbaru</h3>
                    </div>
                    <a href="{{ route('admin.articles.index') }}" 
                       class="text-xs font-bold text-[#0F4C3A] hover:underline flex items-center gap-1 group">
                        <span>Lihat Semua</span>
                        <span class="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </a>
                </div>

                @if(isset($recentArticles) && count($recentArticles) > 0)
                    <div class="space-y-3">
                        @foreach($recentArticles as $art)
                            <a href="{{ route('admin.articles.edit', $art->id) }}" 
                               class="card-interactive card-interactive-terracotta group cursor-pointer block p-4 bg-[#FAF6EC]/60 hover:bg-white border border-[#E3DAC7] rounded-xl transition-all">
                                <div class="flex items-center justify-between gap-4">
                                    <div class="min-w-0 flex-1">
                                        <div class="flex items-center gap-2 text-[11px] text-[#5C6B73] mb-1">
                                            <span class="text-[#C2613A] font-bold uppercase tracking-wider text-[10px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                                {{ $art->category->name ?? 'Umum' }}
                                            </span>
                                            <span>&bull;</span>
                                            <span>{{ $art->created_at->format('d M Y') }}</span>
                                        </div>
                                        <h4 class="font-bold text-xs text-[#1B2A2F] group-hover:text-[#C2613A] transition-colors truncate">
                                            {{ $art->title }}
                                        </h4>
                                    </div>
                                    <div class="shrink-0 flex items-center gap-1 text-xs font-bold text-[#0F4C3A] bg-white group-hover:bg-[#0F4C3A] group-hover:text-white px-3 py-1.5 rounded-lg border border-[#E3DAC7] transition-all">
                                        <span>Edit</span>
                                        <i class="fa-solid fa-pen text-[10px]"></i>
                                    </div>
                                </div>
                            </a>
                        @endforeach
                    </div>
                @else
                    <div class="p-8 text-center text-xs text-[#5C6B73] bg-[#FAF6EC] rounded-xl border border-[#E3DAC7]/80">
                        <i class="fa-solid fa-newspaper text-2xl mb-2 text-[#5C6B73]/60 block"></i>
                        <span>Belum ada artikel yang diterbitkan.</span>
                    </div>
                @endif
            </div>

            <!-- Dosen Directory Quick Access -->
            <div class="bg-white border border-[#E3DAC7] rounded-xl p-6 space-y-4 shadow-sm">
                <div class="flex items-center justify-between border-b border-[#E3DAC7] pb-3">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-chalkboard-user text-[#0F4C3A]"></i>
                        <h3 class="font-serif font-bold text-base text-[#0F4C3A]">Direktori Dosen Pengampu</h3>
                    </div>
                    <a href="{{ route('admin.lecturers.index') }}" 
                       class="text-xs font-bold text-[#0F4C3A] hover:underline flex items-center gap-1 group">
                        <span>Kelola Dosen</span>
                        <span class="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </a>
                </div>

                @if(isset($recentLecturers) && count($recentLecturers) > 0)
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        @foreach($recentLecturers as $lec)
                            <a href="{{ route('admin.lecturers.edit', $lec->id) }}" 
                               class="card-interactive group cursor-pointer flex items-center gap-3 p-3.5 bg-[#FAF6EC]/60 hover:bg-white border border-[#E3DAC7] rounded-xl transition-all">
                                <div class="w-10 h-10 rounded-xl bg-[#0F4C3A] text-white flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                                    {{ substr($lec->name, 0, 1) }}
                                </div>
                                <div class="min-w-0 flex-1">
                                    <h5 class="font-bold text-xs text-[#1B2A2F] group-hover:text-[#0F4C3A] transition-colors truncate">
                                        {{ $lec->name }}
                                    </h5>
                                    <p class="text-[11px] text-[#C2613A] font-semibold truncate">{{ $lec->role ?? 'Dosen Pengampu' }}</p>
                                </div>
                                <i class="fa-solid fa-chevron-right text-[10px] text-[#5C6B73] group-hover:text-[#0F4C3A] group-hover:translate-x-1 transition-all shrink-0"></i>
                            </a>
                        @endforeach
                    </div>
                @else
                    <div class="p-8 text-center text-xs text-[#5C6B73] bg-[#FAF6EC] rounded-xl border border-[#E3DAC7]/80">
                        <i class="fa-solid fa-chalkboard-user text-2xl mb-2 text-[#5C6B73]/60 block"></i>
                        <span>Data dosen belum diinputkan.</span>
                    </div>
                @endif
            </div>
        </div>

    </div>

</div>
@endsection
