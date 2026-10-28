@extends('layouts.admin')

@section('title', 'Pengaturan Website & Identitas')
@section('header', 'Pengaturan Website')
@section('subheader', 'Kelola informasi identitas kampus, kontak prodi, akreditasi, dan tautan sosial media')

@section('content')
<div class="max-w-4xl mx-auto space-y-6">
    <form method="POST" action="{{ route('admin.settings.update') }}" class="space-y-6">
        @csrf
        @method('PUT')

        <!-- Section 1: Identitas Program Studi -->
        <div class="neu-card p-6 space-y-4">
            <h3 class="font-serif font-bold text-base text-[#0F4C3A] flex items-center gap-2 border-b border-[#E3DAC7] pb-3">
                <i class="fa-solid fa-graduation-cap"></i>
                <span>Identitas Institusi & Program Studi</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Nama Perguruan Tinggi</label>
                    <input type="text" name="institution_name" value="{{ $settings['institution_name'] ?? 'IAI Persis Bandung' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Nama Fakultas</label>
                    <input type="text" name="faculty_name" value="{{ $settings['faculty_name'] ?? 'Fakultas Tarbiyah' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Nama Program Studi</label>
                    <input type="text" name="program_name" value="{{ $settings['program_name'] ?? 'Pendidikan Islam Anak Usia Dini (PIAUD)' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Jenjang Pendidikan</label>
                    <input type="text" name="program_degree" value="{{ $settings['program_degree'] ?? 'Jenjang Sarjana (S1)' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
            </div>
        </div>

        <!-- Section 2: Kontak & Kantor Prodi -->
        <div class="neu-card p-6 space-y-4">
            <h3 class="font-serif font-bold text-base text-[#0F4C3A] flex items-center gap-2 border-b border-[#E3DAC7] pb-3">
                <i class="fa-solid fa-address-book"></i>
                <span>Kontak & Lokasi Kampus</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Nomor WhatsApp Resmi</label>
                    <input type="text" name="whatsapp_number" value="{{ $settings['whatsapp_number'] ?? '6281220005678' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]" placeholder="628xxxxxxxxxx">
                    <span class="text-[10px] text-[#5C6B73]">Gunakan kode negara tanpa spasi atau strip (cth: 62812...)</span>
                </div>
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Telepon Kantor</label>
                    <input type="text" name="phone" value="{{ $settings['phone'] ?? '(022) 8752-1234' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Email Resmi Prodi</label>
                    <input type="email" name="email" value="{{ $settings['email'] ?? 'piaud@iaipibandung.ac.id' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Jam Pelayanan Kantor</label>
                    <input type="text" name="office_hours" value="{{ $settings['office_hours'] ?? 'Senin – Jumat, 08.00 – 16.00 WIB' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Alamat Lengkap Kampus</label>
                    <textarea name="campus_address" rows="2" 
                              class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">{{ $settings['campus_address'] ?? 'Jl. Ciganitri No. 2, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287' }}</textarea>
                </div>
            </div>
        </div>

        <!-- Section 3: Akreditasi -->
        <div class="neu-card p-6 space-y-4">
            <h3 class="font-serif font-bold text-base text-[#0F4C3A] flex items-center gap-2 border-b border-[#E3DAC7] pb-3">
                <i class="fa-solid fa-award"></i>
                <span>Status Akreditasi Program Studi</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Peringkat Akreditasi</label>
                    <input type="text" name="accreditation_status" value="{{ $settings['accreditation_status'] ?? 'Terakreditasi Baik' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Lembaga Akreditasi</label>
                    <input type="text" name="accreditation_institution" value="{{ $settings['accreditation_institution'] ?? 'LAMDIK' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Berlaku Sampai Tahun</label>
                    <input type="text" name="accreditation_valid_until" value="{{ $settings['accreditation_valid_until'] ?? '2027' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]">
                </div>
            </div>
        </div>

        <!-- Section 4: Tautan Media Sosial -->
        <div class="neu-card p-6 space-y-4">
            <h3 class="font-serif font-bold text-base text-[#0F4C3A] flex items-center gap-2 border-b border-[#E3DAC7] pb-3">
                <i class="fa-solid fa-share-nodes"></i>
                <span>Tautan Media Sosial Resmi</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1"><i class="fa-brands fa-instagram text-pink-600 mr-1"></i> Instagram URL</label>
                    <input type="text" name="instagram_url" value="{{ $settings['instagram_url'] ?? 'https://instagram.com/piaud_iaipersis' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]" placeholder="https://instagram.com/...">
                </div>
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1"><i class="fa-brands fa-youtube text-red-600 mr-1"></i> YouTube URL</label>
                    <input type="text" name="youtube_url" value="{{ $settings['youtube_url'] ?? 'https://youtube.com/@piaudiaipersis' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]" placeholder="https://youtube.com/...">
                </div>
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1"><i class="fa-brands fa-facebook text-blue-600 mr-1"></i> Facebook URL</label>
                    <input type="text" name="facebook_url" value="{{ $settings['facebook_url'] ?? 'https://facebook.com/piaud.iaipersis' }}"
                           class="neu-input w-full px-3.5 py-2.5 text-xs text-[#1B2A2F]" placeholder="https://facebook.com/...">
                </div>
            </div>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-end">
            <button type="submit" class="neu-btn-primary px-8 py-3 text-xs flex items-center gap-2 font-bold shadow-lg">
                <i class="fa-solid fa-floppy-disk"></i>
                <span>Simpan Seluruh Pengaturan</span>
            </button>
        </div>
    </form>
</div>
@endsection
