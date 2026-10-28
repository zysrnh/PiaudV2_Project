@extends('layouts.admin')

@section('title', 'Galeri & Banner Slider')
@section('header', 'Galeri Foto & Banner Slider')
@section('subheader', 'Dokumentasi praktikum, pentas kreasi, dan slider beranda')

@section('content')
<div class="space-y-6">
    <!-- Tab Switcher -->
    @php
        $activeTab = request('tab', 'galleries');
    @endphp
    <div class="flex items-center gap-3">
        <a href="?tab=galleries" class="neu-btn px-4 py-2.5 text-xs font-bold {{ $activeTab === 'galleries' ? 'neu-sidebar-active' : 'text-[#1B2A2F]' }}">
            <i class="fa-solid fa-images mr-1.5"></i> Galeri Foto Kegiatan ({{ $galleries->total() }})
        </a>
        <a href="?tab=banners" class="neu-btn px-4 py-2.5 text-xs font-bold {{ $activeTab === 'banners' ? 'neu-sidebar-active' : 'text-[#1B2A2F]' }}">
            <i class="fa-solid fa-sliders mr-1.5"></i> Banner Slider Beranda ({{ $banners->count() }})
        </a>
    </div>

    @if($activeTab === 'galleries')
        <!-- Section 1: Galeri Foto -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Form Upload Galeri Baru (Left Column) -->
            <div class="neu-card p-6 h-fit space-y-4">
                <h3 class="font-serif font-bold text-base text-[#0F4C3A] flex items-center gap-2">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <span>Unggah Foto Kegiatan</span>
                </h3>
                <form method="POST" action="{{ route('admin.gallery.store') }}" enctype="multipart/form-data" class="space-y-4">
                    @csrf
                    <div>
                        <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Judul / Keterangan Foto <span class="text-red-500">*</span></label>
                        <input type="text" name="title" required class="neu-input w-full px-3 py-2 text-xs text-[#1B2A2F]" placeholder="Contoh: Praktikum APE Sensory Bin">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Kategori Galeri</label>
                        <select name="gallery_category_id" class="neu-input w-full px-3 py-2 text-xs text-[#1B2A2F]">
                            <option value="">-- Pilih Kategori --</option>
                            @foreach($categories as $cat)
                                <option value="{{ $cat->id }}">{{ $cat->name }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Bulan & Tahun Kegiatan</label>
                        <input type="text" name="date" class="neu-input w-full px-3 py-2 text-xs text-[#1B2A2F]" placeholder="Contoh: Oktober 2026">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-[#1B2A2F] mb-1">File Foto <span class="text-red-500">*</span></label>
                        <input type="file" name="photo" required accept="image/*" class="neu-input w-full px-3 py-2 text-xs text-[#1B2A2F]">
                        <p class="text-[10px] text-[#5C6B73] mt-1">Maks. 3MB (JPG, PNG, WebP)</p>
                    </div>

                    <div class="pt-2">
                        <button type="submit" class="neu-btn-primary w-full py-2.5 text-xs flex items-center justify-center gap-2">
                            <i class="fa-solid fa-upload"></i>
                            <span>Unggah Foto Sekarang</span>
                        </button>
                    </div>
                </form>
            </div>

            <!-- Grid Foto Tersimpan (Right Column) -->
            <div class="lg:col-span-2 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    @forelse($galleries as $gal)
                        <div class="neu-card p-3 flex flex-col justify-between group">
                            <div>
                                <div class="w-full h-36 rounded-lg overflow-hidden neu-inset bg-[#FAF6EC] mb-2.5 relative">
                                    <img src="{{ $gal->photo_url }}" alt="{{ $gal->title }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                                    @if($gal->category)
                                        <span class="absolute top-2 left-2 bg-[#0F4C3A]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
                                            {{ $gal->category->name }}
                                        </span>
                                    @endif
                                </div>
                                <h4 class="font-bold text-xs text-[#1B2A2F] line-clamp-2">{{ $gal->title }}</h4>
                                <p class="text-[10px] text-[#5C6B73] mt-1">{{ $gal->date ?: 'Tidak ada tanggal' }}</p>
                            </div>
                            <div class="pt-3 border-t border-[#E3DAC7]/60 flex items-center justify-end mt-2">
                                <form method="POST" action="{{ route('admin.gallery.destroy', $gal->id) }}" onsubmit="return confirm('Hapus foto ini?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="neu-btn px-2 py-1 text-xs text-red-600 hover:text-red-800" title="Hapus Foto">
                                        <i class="fa-solid fa-trash-can"></i> Hapus
                                    </button>
                                </form>
                            </div>
                        </div>
                    @empty
                        <div class="col-span-3 neu-card p-8 text-center text-[#5C6B73]">
                            <i class="fa-solid fa-images text-3xl mb-2 block"></i>
                            Belum ada foto galeri kegiatan yang diunggah.
                        </div>
                    @endforelse
                </div>

                @if($galleries->hasPages())
                    <div class="neu-card p-4">
                        {{ $galleries->appends(['tab' => 'galleries'])->links() }}
                    </div>
                @endif
            </div>
        </div>

    @else
        <!-- Section 2: Banner Slider Beranda -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Form Banner Slider Baru -->
            <div class="neu-card p-6 h-fit space-y-4">
                <h3 class="font-serif font-bold text-base text-[#0F4C3A] flex items-center gap-2">
                    <i class="fa-solid fa-panorama"></i>
                    <span>Tambah Banner Slider</span>
                </h3>
                <form method="POST" action="{{ route('admin.banner.store') }}" enctype="multipart/form-data" class="space-y-4">
                    @csrf
                    <div>
                        <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Judul Banner <span class="text-red-500">*</span></label>
                        <input type="text" name="title" required class="neu-input w-full px-3 py-2 text-xs text-[#1B2A2F]" placeholder="Contoh: Penerimaan Mahasiswa Baru 2026">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Subjudul / Deskripsi Pendek</label>
                        <input type="text" name="subtitle" class="neu-input w-full px-3 py-2 text-xs text-[#1B2A2F]" placeholder="Contoh: Kuliah S1 PIAUD Berkualitas & Berakhlak Qur'ani">
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Teks Tombol</label>
                            <input type="text" name="button_text" class="neu-input w-full px-3 py-2 text-xs text-[#1B2A2F]" placeholder="Daftar Sekarang">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Link URL</label>
                            <input type="text" name="link_url" class="neu-input w-full px-3 py-2 text-xs text-[#1B2A2F]" placeholder="/kontak">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Gambar Banner (16:9) <span class="text-red-500">*</span></label>
                        <input type="file" name="photo" required accept="image/*" class="neu-input w-full px-3 py-2 text-xs text-[#1B2A2F]">
                        <p class="text-[10px] text-[#5C6B73] mt-1">Rekomendasi min. 1200x500px, maks. 4MB</p>
                    </div>

                    <div class="flex items-center pt-2">
                        <label class="inline-flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name="is_active" value="1" checked class="w-4 h-4 rounded text-[#0F4C3A] focus:ring-[#0F4C3A] border-[#E3DAC7]">
                            <span class="text-xs font-bold text-[#1B2A2F]">Tampilkan di Beranda</span>
                        </label>
                    </div>

                    <div class="pt-2">
                        <button type="submit" class="neu-btn-primary w-full py-2.5 text-xs flex items-center justify-center gap-2">
                            <i class="fa-solid fa-plus"></i>
                            <span>Simpan Banner Slider</span>
                        </button>
                    </div>
                </form>
            </div>

            <!-- List Banner Tersimpan -->
            <div class="lg:col-span-2 space-y-4">
                @forelse($banners as $banner)
                    <div class="neu-card p-5 flex flex-col md:flex-row gap-5 items-center justify-between">
                        <div class="w-full md:w-56 h-28 rounded-lg overflow-hidden neu-inset bg-[#FAF6EC] shrink-0">
                            <img src="{{ $banner->photo_url }}" alt="{{ $banner->title }}" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                                <h4 class="font-bold text-sm text-[#0F4C3A] truncate">{{ $banner->title }}</h4>
                                @if($banner->is_active)
                                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Aktif</span>
                                @else
                                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-200 text-gray-700">Nonaktif</span>
                                @endif
                            </div>
                            <p class="text-xs text-[#5C6B73] line-clamp-1">{{ $banner->subtitle ?: 'Tidak ada deskripsi' }}</p>
                            @if($banner->link_url)
                                <div class="mt-2 text-[10px] text-[#0F4C3A] font-semibold">
                                    <i class="fa-solid fa-link"></i> {{ $banner->button_text ?? 'Link' }}: {{ $banner->link_url }}
                                </div>
                            @endif
                        </div>
                        <div class="shrink-0">
                            <form method="POST" action="{{ route('admin.banner.destroy', $banner->id) }}" onsubmit="return confirm('Hapus banner ini?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="neu-btn px-3 py-2 text-xs text-red-600 hover:text-red-800 flex items-center gap-1.5" title="Hapus Banner">
                                    <i class="fa-solid fa-trash-can"></i>
                                    <span>Hapus</span>
                                </button>
                            </form>
                        </div>
                    </div>
                @empty
                    <div class="neu-card p-8 text-center text-[#5C6B73]">
                        <i class="fa-solid fa-panorama text-3xl mb-2 block"></i>
                        Belum ada banner slider tersimpan.
                    </div>
                @endforelse
            </div>
        </div>
    @endif
</div>
@endsection
