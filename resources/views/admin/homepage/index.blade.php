@extends('layouts.admin')

@section('title', 'Kelola Konten Halaman Beranda')
@section('header', 'Kelola Halaman Beranda')
@section('subheader', 'Sesuaikan teks headline, deskripsi, fokus prodi, tentang kami, dan jurnal di landing page')

@section('content')
<div class="max-w-4xl mx-auto space-y-6">
    @if(session('success'))
        <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-circle-check text-emerald-600"></i>
                <span>{{ session('success') }}</span>
            </div>
            <a href="{{ url('/') }}" target="_blank" class="underline text-emerald-700 hover:text-emerald-900">Lihat Beranda &rarr;</a>
        </div>
    @endif

    <form method="POST" action="{{ route('admin.homepage.update') }}" class="space-y-6">
        @csrf
        @method('PUT')

        <!-- Section 1: Hero Banner -->
        <div class="neu-card p-6 space-y-4">
            <h3 class="font-serif font-bold text-base text-[#0F4C3A] flex items-center gap-2 border-b border-[#E3DAC7] pb-3">
                <i class="fa-solid fa-flag"></i>
                <span>1. Hero Section (Headline Utama)</span>
            </h3>

            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Tagline / Eyebrow Atas</label>
                    <input type="text" name="home_hero_tagline" 
                           value="{{ $settings['home_hero_tagline'] ?? 'Pendidikan Islam Anak Usia Dini' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>

                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Headline Utama (Judul Besar)</label>
                    <input type="text" name="home_hero_heading" 
                           value="{{ $settings['home_hero_heading'] ?? 'Mendidik Generasi, Menumbuhkan Peradaban.' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>

                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Deskripsi Hero</label>
                    <textarea name="home_hero_desc" rows="3" 
                              class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">{{ $settings['home_hero_desc'] ?? 'Mempersiapkan pendidik anak usia dini yang profesional, kreatif, berakhlak mulia, dan berlandaskan nilai-nilai Islam.' }}</textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Teks Tombol Aksi 1 (Primer)</label>
                        <input type="text" name="home_hero_cta1_text" 
                               value="{{ $settings['home_hero_cta1_text'] ?? 'Jelajahi Program Studi' }}"
                               class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Teks Tombol Aksi 2 (Sekunder)</label>
                        <input type="text" name="home_hero_cta2_text" 
                               value="{{ $settings['home_hero_cta2_text'] ?? 'Informasi Akademik' }}"
                               class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Catatan Tagline Bawah Tombol</label>
                    <input type="text" name="home_hero_note" 
                           value="{{ $settings['home_hero_note'] ?? 'Berilmu · Berakhlak · Berdaya untuk Umat' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
            </div>
        </div>

        <!-- Section 2: 4 Fokus Program Studi -->
        <div class="neu-card p-6 space-y-4">
            <h3 class="font-serif font-bold text-base text-[#0F4C3A] flex items-center gap-2 border-b border-[#E3DAC7] pb-3">
                <i class="fa-solid fa-shapes"></i>
                <span>2. Fokus Program Studi (4 Item Strip)</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Item 1 -->
                <div class="p-3 bg-[#FAF6EC] border border-[#E3DAC7] rounded-xl space-y-2">
                    <span class="text-xs font-bold text-[#0F4C3A]">Item 1 (Pendidikan)</span>
                    <input type="text" name="home_focus1_title" 
                           value="{{ $settings['home_focus1_title'] ?? 'Pendidikan Berkualitas' }}"
                           placeholder="Judul" class="neu-input w-full px-3 py-2 text-xs">
                    <input type="text" name="home_focus1_desc" 
                           value="{{ $settings['home_focus1_desc'] ?? 'Pembelajaran kontekstual dan berlandaskan nilai Islam' }}"
                           placeholder="Deskripsi" class="neu-input w-full px-3 py-2 text-xs">
                </div>

                <!-- Item 2 -->
                <div class="p-3 bg-[#FAF6EC] border border-[#E3DAC7] rounded-xl space-y-2">
                    <span class="text-xs font-bold text-[#0F4C3A]">Item 2 (Dosen)</span>
                    <input type="text" name="home_focus2_title" 
                           value="{{ $settings['home_focus2_title'] ?? 'Dosen Profesional' }}"
                           placeholder="Judul" class="neu-input w-full px-3 py-2 text-xs">
                    <input type="text" name="home_focus2_desc" 
                           value="{{ $settings['home_focus2_desc'] ?? 'Pendampingan akademik dan pengembangan kompetensi' }}"
                           placeholder="Deskripsi" class="neu-input w-full px-3 py-2 text-xs">
                </div>

                <!-- Item 3 -->
                <div class="p-3 bg-[#FAF6EC] border border-[#E3DAC7] rounded-xl space-y-2">
                    <span class="text-xs font-bold text-[#0F4C3A]">Item 3 (Riset)</span>
                    <input type="text" name="home_focus3_title" 
                           value="{{ $settings['home_focus3_title'] ?? 'Riset dan Inovasi' }}"
                           placeholder="Judul" class="neu-input w-full px-3 py-2 text-xs">
                    <input type="text" name="home_focus3_desc" 
                           value="{{ $settings['home_focus3_desc'] ?? 'Pengembangan pendidikan anak usia dini' }}"
                           placeholder="Deskripsi" class="neu-input w-full px-3 py-2 text-xs">
                </div>

                <!-- Item 4 -->
                <div class="p-3 bg-[#FAF6EC] border border-[#E3DAC7] rounded-xl space-y-2">
                    <span class="text-xs font-bold text-[#0F4C3A]">Item 4 (Karier)</span>
                    <input type="text" name="home_focus4_title" 
                           value="{{ $settings['home_focus4_title'] ?? 'Pengembangan Karier' }}"
                           placeholder="Judul" class="neu-input w-full px-3 py-2 text-xs">
                    <input type="text" name="home_focus4_desc" 
                           value="{{ $settings['home_focus4_desc'] ?? 'Menyiapkan calon pendidik dan praktisi PAUD' }}"
                           placeholder="Deskripsi" class="neu-input w-full px-3 py-2 text-xs">
                </div>
            </div>
        </div>

        <!-- Section 3: Tentang Kami / Mengenal PIAUD -->
        <div class="neu-card p-6 space-y-4">
            <h3 class="font-serif font-bold text-base text-[#0F4C3A] flex items-center gap-2 border-b border-[#E3DAC7] pb-3">
                <i class="fa-solid fa-circle-info"></i>
                <span>3. Profil Singkat (Mengenal Program Studi PIAUD)</span>
            </h3>

            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Judul Bagian</label>
                    <input type="text" name="home_about_title" 
                           value="{{ $settings['home_about_title'] ?? 'Mengenal Program Studi PIAUD' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>

                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Paragraf 1</label>
                    <textarea name="home_about_p1" rows="3" 
                              class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">{{ $settings['home_about_p1'] ?? 'Program Studi Pendidikan Islam Anak Usia Dini IAI Persis Bandung berfokus pada pendidikan dan pengembangan anak usia dini melalui pembelajaran yang sesuai tahap perkembangan, kreatif, dan berlandaskan nilai-nilai Islam.' }}</textarea>
                </div>

                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Paragraf 2</label>
                    <textarea name="home_about_p2" rows="2" 
                              class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">{{ $settings['home_about_p2'] ?? 'Bagian ini dilengkapi dengan kurikulum integratif, pembinaan akhlak karimah, profil lulusan unggul, serta fasilitas laboratorium pembelajaran yang representatif.' }}</textarea>
                </div>

                <div class="space-y-2">
                    <label class="block text-xs font-bold text-[#1B2A2F]">3 Poin Keunggulan / Checklist</label>
                    <input type="text" name="home_about_check1" 
                           value="{{ $settings['home_about_check1'] ?? 'Penguatan kompetensi pedagogis dan profesional calon pendidik.' }}"
                           placeholder="Poin 1" class="neu-input w-full px-3 py-2 text-xs">
                    <input type="text" name="home_about_check2" 
                           value="{{ $settings['home_about_check2'] ?? 'Pengembangan pembelajaran kreatif, inklusif, dan sesuai perkembangan anak.' }}"
                           placeholder="Poin 2" class="neu-input w-full px-3 py-2 text-xs">
                    <input type="text" name="home_about_check3" 
                           value="{{ $settings['home_about_check3'] ?? 'Integrasi nilai-nilai Islam dalam praktik pendidikan anak usia dini.' }}"
                           placeholder="Poin 3" class="neu-input w-full px-3 py-2 text-xs">
                </div>

                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Caption Kartu Ilustrasi Kiri</label>
                    <input type="text" name="home_about_caption" 
                           value="{{ $settings['home_about_caption'] ?? 'Mendampingi anak tumbuh dengan ilmu dan akhlak' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
            </div>
        </div>

        <!-- Section 4: Publikasi Ilmiah / Jurnal PIAUDKU -->
        <div class="neu-card p-6 space-y-4">
            <h3 class="font-serif font-bold text-base text-[#0F4C3A] flex items-center gap-2 border-b border-[#E3DAC7] pb-3">
                <i class="fa-solid fa-book-bookmark"></i>
                <span>4. Publikasi Ilmiah (Jurnal PIAUDKU)</span>
            </h3>

            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Judul Jurnal</label>
                    <input type="text" name="home_journal_title" 
                           value="{{ $settings['home_journal_title'] ?? 'Jurnal PIAUD: PIAUDKU' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>

                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Deskripsi Publikasi Jurnal</label>
                    <textarea name="home_journal_desc" rows="3" 
                              class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">{{ $settings['home_journal_desc'] ?? 'Jelajahi publikasi ilmiah, artikel penelitian, dan kajian seputar pendidikan Islam anak usia dini melalui portal jurnal resmi PIAUD IAI Persis Bandung.' }}</textarea>
                </div>

                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Link URL Portal Jurnal OJS</label>
                    <input type="url" name="home_journal_url" 
                           value="{{ $settings['home_journal_url'] ?? 'https://journal.iaipibandung.ac.id/index.php/piaudku/index' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
            </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
            <button type="submit" class="neu-btn-primary px-6 py-3 text-xs flex items-center gap-2 cursor-pointer shadow-sm">
                <i class="fa-solid fa-floppy-disk"></i>
                <span>Simpan Perubahan Beranda</span>
            </button>
        </div>
    </form>
</div>
@endsection
