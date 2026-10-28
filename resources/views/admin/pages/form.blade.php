@extends('layouts.admin')

@section('title', 'Edit ' . $page->title)
@section('header', 'Edit ' . $page->title)
@section('subheader', 'Perbarui naskah dan informasi halaman statis')

@section('content')
<div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
        <a href="{{ route('admin.pages.index') }}" class="neu-btn px-4 py-2 text-xs text-[#5C6B73] hover:text-[#1B2A2F] flex items-center gap-2">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Kembali ke Daftar Halaman</span>
        </a>
    </div>

    <form method="POST" action="{{ route('admin.pages.update', $page->id) }}" class="neu-card p-8 space-y-6">
        @csrf
        @method('PUT')

        <div class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">Judul Halaman <span class="text-red-500">*</span></label>
                    <input type="text" name="title" value="{{ old('title', $page->title) }}" required
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">Slug URL <span class="text-red-500">*</span></label>
                    <input type="text" name="slug" value="{{ old('slug', $page->slug) }}" required
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">Deskripsi Singkat (SEO Meta Description)</label>
                <input type="text" name="meta_description" value="{{ old('meta_description', $page->meta_description) }}"
                       class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]" 
                       placeholder="Ringkasan 1 kalimat tentang isi halaman...">
            </div>

            <div class="flex items-center pt-2">
                <label class="inline-flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="is_published" value="1" {{ old('is_published', $page->is_published) ? 'checked' : '' }}
                           class="w-4 h-4 rounded text-[#0F4C3A] focus:ring-[#0F4C3A] border-[#E3DAC7]">
                    <span class="text-xs font-bold text-[#1B2A2F]">Publikasikan Halaman Ini</span>
                </label>
            </div>

            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">Naskah / Konten Halaman <span class="text-red-500">*</span></label>
                <textarea name="content" rows="15" required
                          class="neu-input w-full p-4 text-xs font-sans text-[#1B2A2F] leading-relaxed" 
                          placeholder="Tulis naskah lengkap...">{{ old('content', $page->content) }}</textarea>
                <p class="text-[10px] text-[#5C6B73] mt-1">Mendukung format HTML standar seperti &lt;p&gt;, &lt;h3&gt;, &lt;ol&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;blockquote&gt;.</p>
            </div>
        </div>

        <div class="pt-6 border-t border-[#E3DAC7] flex items-center justify-end gap-3">
            <a href="{{ route('admin.pages.index') }}" class="neu-btn px-5 py-2.5 text-xs text-[#5C6B73]">
                Batal
            </a>
            <button type="submit" class="neu-btn-primary px-6 py-2.5 text-xs flex items-center gap-2">
                <i class="fa-solid fa-floppy-disk"></i>
                <span>Simpan Perubahan Halaman</span>
            </button>
        </div>
    </form>
</div>
@endsection
