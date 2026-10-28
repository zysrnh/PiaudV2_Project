@extends('layouts.admin')

@section('title', $lecturer->exists ? 'Edit Dosen' : 'Tambah Dosen Baru')
@section('header', $lecturer->exists ? 'Edit Data Dosen' : 'Tambah Dosen Baru')
@section('subheader', $lecturer->exists ? 'Perbarui informasi dan biodata dosen' : 'Daftarkan profil dosen baru ke sistem')

@section('content')
<div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
        <a href="{{ route('admin.lecturers.index') }}" class="neu-btn px-4 py-2 text-xs text-[#5C6B73] hover:text-[#1B2A2F] flex items-center gap-2">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Kembali ke Daftar Dosen</span>
        </a>
    </div>

    <form method="POST" 
          action="{{ $lecturer->exists ? route('admin.lecturers.update', $lecturer->id) : route('admin.lecturers.store') }}" 
          enctype="multipart/form-data" 
          class="neu-card p-8 space-y-6">
        @csrf
        @if($lecturer->exists)
            @method('PUT')
        @endif

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Left Column: Photo Preview & Upload -->
            <div class="space-y-4">
                <label class="block text-xs font-bold text-[#1B2A2F] uppercase tracking-wider">Foto Profil</label>
                <div class="neu-inset p-4 flex flex-col items-center justify-center text-center rounded-xl">
                    <div class="w-36 h-44 rounded-lg overflow-hidden neu-card mb-3 bg-[#FAF6EC] flex items-center justify-center border border-[#E3DAC7]">
                        @if($lecturer->photo_url)
                            <img id="photo-preview" src="{{ $lecturer->photo_url }}" alt="{{ $lecturer->name }}" class="w-full h-full object-cover">
                        @else
                            <div id="photo-placeholder" class="text-center p-4">
                                <i class="fa-solid fa-user text-4xl text-[#5C6B73]/50 mb-2"></i>
                                <span class="text-[10px] text-[#5C6B73] block">Belum ada foto</span>
                            </div>
                            <img id="photo-preview" src="" alt="Preview" class="w-full h-full object-cover hidden">
                        @endif
                    </div>
                    <label class="neu-btn px-3 py-1.5 text-xs text-[#0F4C3A] cursor-pointer inline-flex items-center gap-1.5">
                        <i class="fa-solid fa-upload"></i>
                        <span>Pilih Foto Baru</span>
                        <input type="file" name="photo" id="photo-input" accept="image/*" class="hidden">
                    </label>
                    <span class="text-[10px] text-[#5C6B73] mt-2">Maks. 2MB (JPG, PNG, WebP)</span>
                </div>
            </div>

            <!-- Right Column: Fields -->
            <div class="md:col-span-2 space-y-4">
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">Nama Lengkap & Gelar <span class="text-red-500">*</span></label>
                    <input type="text" name="name" value="{{ old('name', $lecturer->name) }}" required
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]" 
                           placeholder="Contoh: Dra. Hj. Siti Komariah, M.Pd.">
                    @error('name')
                        <p class="text-red-600 text-[11px] mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">NIP (Nomor Induk Pegawai)</label>
                        <input type="text" name="nip" value="{{ old('nip', $lecturer->nip) }}"
                               class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]" 
                               placeholder="196805121994032001">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">NIDN (Nomor Induk Dosen Nasional)</label>
                        <input type="text" name="nidn" value="{{ old('nidn', $lecturer->nidn) }}"
                               class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]" 
                               placeholder="2104058901">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">Jabatan / Peran di Prodi <span class="text-red-500">*</span></label>
                    <input type="text" name="role" value="{{ old('role', $lecturer->role) }}" required
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]" 
                           placeholder="Contoh: Ketua Program Studi / Dosen Senior">
                    @error('role')
                        <p class="text-red-600 text-[11px] mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">Bidang Kepakaran / Keahlian Khusus</label>
                    <textarea name="expertise" rows="2" 
                              class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]" 
                              placeholder="Contoh: Manajemen PAUD & Pengembangan Kurikulum RA Berbasis Fitrah">{{ old('expertise', $lecturer->expertise) }}</textarea>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                        <label class="block text-xs font-bold text-[#1B2A2F] mb-1.5">Urutan Tampilan</label>
                        <input type="number" name="order" value="{{ old('order', $lecturer->order ?? 0) }}"
                               class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]" 
                               placeholder="0">
                        <span class="text-[10px] text-[#5C6B73]">Angka lebih kecil muncul lebih awal</span>
                    </div>
                    <div class="flex items-center pt-5">
                        <label class="inline-flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name="is_active" value="1" {{ old('is_active', $lecturer->exists ? $lecturer->is_active : true) ? 'checked' : '' }}
                                   class="w-4 h-4 rounded text-[#0F4C3A] focus:ring-[#0F4C3A] border-[#E3DAC7]">
                            <span class="text-xs font-bold text-[#1B2A2F]">Status Dosen Aktif</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="pt-6 border-t border-[#E3DAC7] flex items-center justify-end gap-3">
            <a href="{{ route('admin.lecturers.index') }}" class="neu-btn px-5 py-2.5 text-xs text-[#5C6B73]">
                Batal
            </a>
            <button type="submit" class="neu-btn-primary px-6 py-2.5 text-xs flex items-center gap-2">
                <i class="fa-solid fa-floppy-disk"></i>
                <span>Simpan Perubahan</span>
            </button>
        </div>
    </form>
</div>

@push('scripts')
<script>
    const photoInput = document.getElementById('photo-input');
    const photoPreview = document.getElementById('photo-preview');
    const photoPlaceholder = document.getElementById('photo-placeholder');

    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    photoPreview.src = evt.target.result;
                    photoPreview.classList.remove('hidden');
                    if (photoPlaceholder) {
                        photoPlaceholder.classList.add('hidden');
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
</script>
@endpush
@endsection
