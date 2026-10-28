@extends('layouts.admin')

@section('title', $article->exists ? 'Edit Artikel' : 'Tulis Artikel Baru')
@section('header', $article->exists ? 'Edit Konten Artikel' : 'Tulis Artikel Baru')
@section('subheader', $article->exists ? 'Perbarui naskah atau media artikel' : 'Terbitkan publikasi baru ke situs PIAUD')

@section('content')
<div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
        <a href="{{ route('admin.articles.index') }}" class="neu-btn px-4 py-2 text-xs text-[#5C6B73] hover:text-[#1B2A2F] flex items-center gap-2">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Kembali ke Daftar Artikel</span>
        </a>
    </div>

    <form method="POST" 
          action="{{ $article->exists ? route('admin.articles.update', $article->id) : route('admin.articles.store') }}" 
          enctype="multipart/form-data" 
          class="neu-card p-8 space-y-6">
        @csrf
        @if($article->exists)
            @method('PUT')
        @endif

        <div class="space-y-4">
            <!-- Title -->
            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">Judul Artikel <span class="text-red-500">*</span></label>
                <input type="text" name="title" value="{{ old('title', $article->title) }}" required
                       class="neu-input w-full px-4 py-3 text-sm font-semibold text-[#1B2A2F]" 
                       placeholder="Masukkan judul artikel yang menarik...">
                @error('title')
                    <p class="text-red-600 text-[11px] mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <!-- Category -->
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">Kategori Berita</label>
                    <select name="category_id" class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                        <option value="">-- Pilih Kategori --</option>
                        @foreach($categories as $cat)
                            <option value="{{ $cat->id }}" {{ old('category_id', $article->category_id) == $cat->id ? 'selected' : '' }}>
                                {{ $cat->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <!-- Read Time -->
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">Estimasi Waktu Baca</label>
                    <input type="text" name="read_time" value="{{ old('read_time', $article->read_time ?? '4 menit baca') }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]" 
                           placeholder="Contoh: 4 menit baca">
                </div>

                <!-- Featured Toggle -->
                <div class="flex items-center pt-6">
                    <label class="inline-flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_featured" value="1" {{ old('is_featured', $article->is_featured) ? 'checked' : '' }}
                               class="w-4 h-4 rounded text-[#0F4C3A] focus:ring-[#0F4C3A] border-[#E3DAC7]">
                        <span class="text-xs font-bold text-[#1B2A2F]">Jadikan Artikel Sorotan</span>
                    </label>
                </div>
            </div>

            <!-- Excerpt -->
            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">Ringkasan / Sinopsis Singkat</label>
                <textarea name="excerpt" rows="2" 
                          class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]" 
                          placeholder="Ringkasan 1-2 kalimat untuk preview di beranda...">{{ old('excerpt', $article->excerpt) }}</textarea>
            </div>

            <!-- Photo / Thumbnail -->
            <div class="neu-inset p-4 rounded-xl space-y-3">
                <label class="block text-xs font-bold text-[#1B2A2F] uppercase tracking-wider">Foto Sampul Utama</label>
                <div class="flex items-center gap-4">
                    <div class="w-32 h-20 rounded-lg overflow-hidden neu-card bg-[#FAF6EC] shrink-0 flex items-center justify-center border border-[#E3DAC7]">
                        @if($article->photo_url)
                            <img id="cover-preview" src="{{ $article->photo_url }}" alt="Preview" class="w-full h-full object-cover">
                        @else
                            <div id="cover-placeholder" class="text-center">
                                <i class="fa-solid fa-image text-2xl text-[#5C6B73]/50"></i>
                            </div>
                            <img id="cover-preview" src="" alt="Preview" class="w-full h-full object-cover hidden">
                        @endif
                    </div>
                    <div>
                        <label class="neu-btn px-3 py-1.5 text-xs text-[#0F4C3A] cursor-pointer inline-flex items-center gap-1.5">
                            <i class="fa-solid fa-upload"></i>
                            <span>Unggah Foto Sampul</span>
                            <input type="file" name="photo" id="cover-input" accept="image/*" class="hidden">
                        </label>
                        <p class="text-[10px] text-[#5C6B73] mt-1.5">Rekomendasi rasio 16:9, format JPG/PNG/WebP, maks. 2MB.</p>
                    </div>
                </div>
            </div>

            <!-- Full Content -->
            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">Konten Naskah Lengkap <span class="text-red-500">*</span></label>
                <textarea name="content" rows="12" required
                          class="neu-input w-full p-4 text-xs font-sans text-[#1B2A2F] leading-relaxed" 
                          placeholder="Tuliskan isi artikel lengkap di sini... (Dukungan HTML sederhana seperti <p>, <h3>, <ul>, <strong>)">{{ old('content', $article->content ?? $article->excerpt) }}</textarea>
                <p class="text-[10px] text-[#5C6B73] mt-1">Gunakan tag &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt; jika ingin format terstruktur.</p>
            </div>
        </div>

        <div class="pt-6 border-t border-[#E3DAC7] flex items-center justify-end gap-3">
            <a href="{{ route('admin.articles.index') }}" class="neu-btn px-5 py-2.5 text-xs text-[#5C6B73]">
                Batal
            </a>
            <button type="submit" class="neu-btn-primary px-6 py-2.5 text-xs flex items-center gap-2">
                <i class="fa-solid fa-floppy-disk"></i>
                <span>{{ $article->exists ? 'Simpan Pembaruan' : 'Terbitkan Sekarang' }}</span>
            </button>
        </div>
    </form>
</div>

@push('scripts')
<script>
    const coverInput = document.getElementById('cover-input');
    const coverPreview = document.getElementById('cover-preview');
    const coverPlaceholder = document.getElementById('cover-placeholder');

    if (coverInput) {
        coverInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    coverPreview.src = evt.target.result;
                    coverPreview.classList.remove('hidden');
                    if (coverPlaceholder) {
                        coverPlaceholder.classList.add('hidden');
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
</script>
@endpush
@endsection
