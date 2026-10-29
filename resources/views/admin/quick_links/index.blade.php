@extends('layouts.admin')

@section('title', 'Tautan Cepat & Akses Portal')
@section('header', 'Tautan Cepat & Akses Portal')
@section('subheader', 'Kelola pintasan cepat ke website eksternal kampus di bawah section Hero')

@section('content')
<div class="space-y-6">

    <!-- Flash Message Notification -->
    @if(session('success'))
        <div class="p-4 bg-[#0F4C3A]/10 border border-[#0F4C3A]/30 rounded-lg flex items-center justify-between text-[#0F4C3A]">
            <div class="flex items-center gap-3 text-xs font-semibold">
                <i class="fa-solid fa-circle-check text-sm"></i>
                <span>{{ session('success') }}</span>
            </div>
            <button type="button" onclick="this.parentElement.remove()" class="text-[#0F4C3A] hover:opacity-75">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>
        </div>
    @endif

    @if($errors->any())
        <div class="p-4 bg-[#C2613A]/10 border border-[#C2613A]/30 rounded-lg text-[#C2613A] text-xs">
            <div class="font-bold mb-1 flex items-center gap-2">
                <i class="fa-solid fa-circle-xmark"></i>
                <span>Terdapat kesalahan pengisian data:</span>
            </div>
            <ul class="list-disc list-inside space-y-0.5 pl-2">
                @foreach($errors->all() as $err)
                    <li>{{ $err }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <!-- Top Action & Stats Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-3">
            <div class="px-3.5 py-2 rounded-lg text-xs font-bold bg-[#0F4C3A] text-white shadow-sm flex items-center gap-2">
                <i class="fa-solid fa-link text-[11px]"></i>
                <span>Total Tautan: {{ $totalLinks }}</span>
            </div>
            <div class="px-3.5 py-2 rounded-lg text-xs font-bold bg-white border border-[#E3DAC7] text-[#1B2A2F] flex items-center gap-2">
                <i class="fa-solid fa-circle-check text-[11px] text-[#0F4C3A]"></i>
                <span>Aktif di Beranda: {{ $activeLinks }}</span>
            </div>
        </div>

        <button type="button" 
                onclick="openCreateModal()" 
                class="neu-btn neu-btn-primary px-3.5 py-2 text-xs flex items-center gap-2 whitespace-nowrap shadow-sm">
            <i class="fa-solid fa-plus text-[11px]"></i>
            <span>Tambah Tautan Cepat</span>
        </button>
    </div>

    <!-- Quick Links Table -->
    <div class="bg-white border border-[#E3DAC7] rounded-xl overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
                <thead>
                    <tr class="bg-[#FAF6EC] border-b border-[#E3DAC7] text-[#5C6B73] font-bold uppercase tracking-wider text-[10px]">
                        <th class="py-3 px-4 w-12 text-center">Urutan</th>
                        <th class="py-3 px-4">Logo</th>
                        <th class="py-3 px-4">Nama Website</th>
                        <th class="py-3 px-4">URL Tujuan</th>
                        <th class="py-3 px-4">Tampilan Nama</th>
                        <th class="py-3 px-4 text-center">Status</th>
                        <th class="py-3 px-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-[#E3DAC7]/70">
                    @forelse($links as $item)
                        <tr class="hover:bg-[#FAF6EC]/50 transition-colors">
                            <!-- Urutan -->
                            <td class="py-3.5 px-4 text-center font-bold text-[#5C6B73]">
                                {{ $item->order }}
                            </td>

                            <!-- Logo Preview -->
                            <td class="py-3.5 px-4">
                                <div class="w-12 h-10 bg-[#FAF6EC] border border-[#E3DAC7] rounded-lg p-1 flex items-center justify-center">
                                    @if($item->logo_url)
                                        <img src="{{ $item->logo_url }}" alt="{{ $item->title }}" class="max-w-full max-h-full object-contain">
                                    @else
                                        <i class="fa-solid fa-globe text-[#5C6B73] text-sm"></i>
                                    @endif
                                </div>
                            </td>

                            <!-- Nama Website -->
                            <td class="py-3.5 px-4">
                                <span class="font-bold text-[#1B2A2F] text-xs block">{{ $item->title }}</span>
                            </td>

                            <!-- URL Tujuan -->
                            <td class="py-3.5 px-4">
                                <a href="{{ $item->url }}" target="_blank" class="font-mono text-[11px] text-[#0F4C3A] hover:underline flex items-center gap-1.5 max-w-xs truncate">
                                    <span>{{ $item->url }}</span>
                                    <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-[#5C6B73]"></i>
                                </a>
                            </td>

                            <!-- Mode Tampilan Nama -->
                            <td class="py-3.5 px-4">
                                @if($item->show_title)
                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF6EC] border border-[#E3DAC7] text-[#1B2A2F]">
                                        <i class="fa-solid fa-eye text-[9px] text-[#0F4C3A]"></i>
                                        <span>Logo + Nama</span>
                                    </span>
                                @else
                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#F2ECE0] text-[#5C6B73]">
                                        <i class="fa-solid fa-eye-slash text-[9px]"></i>
                                        <span>Hanya Logo (Nama Di-hide)</span>
                                    </span>
                                @endif
                            </td>

                            <!-- Status -->
                            <td class="py-3.5 px-4 text-center">
                                @if($item->is_active)
                                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0F4C3A]/10 text-[#0F4C3A]">Aktif</span>
                                @else
                                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-500">Nonaktif</span>
                                @endif
                            </td>

                            <!-- Aksi -->
                            <td class="py-3.5 px-4 text-right">
                                <div class="inline-flex items-center gap-1.5">
                                    <button type="button" 
                                            onclick="openEditModal({{ json_encode([
                                                'id' => $item->id,
                                                'title' => $item->title,
                                                'url' => $item->url,
                                                'logo_url' => $item->logo_url,
                                                'show_title' => (bool)$item->show_title,
                                                'order' => $item->order,
                                                'is_active' => (bool)$item->is_active,
                                            ]) }})"
                                            class="neu-btn px-2.5 py-1.5 text-xs text-[#0F4C3A] hover:bg-[#FAF6EC] border border-[#E3DAC7] rounded-md inline-flex items-center gap-1"
                                            title="Ubah Tautan">
                                        <i class="fa-solid fa-pen-to-square text-[10px]"></i>
                                        <span class="hidden sm:inline">Edit</span>
                                    </button>

                                    <form action="{{ route('admin.quick-links.destroy', $item->id) }}" 
                                          method="POST" 
                                          onsubmit="return confirm('Hapus tautan \'{{ $item->title }}\'?')" 
                                          class="inline-block">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" 
                                                class="neu-btn px-2.5 py-1.5 text-xs text-[#C2613A] hover:bg-[#C2613A]/10 border border-[#E3DAC7] rounded-md inline-flex items-center gap-1"
                                                title="Hapus Tautan">
                                            <i class="fa-solid fa-trash-can text-[10px]"></i>
                                            <span class="hidden sm:inline">Hapus</span>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="py-10 px-4 text-center text-[#5C6B73]">
                                <i class="fa-solid fa-link-slash text-2xl mb-2 text-[#5C6B73]/40 block"></i>
                                <span>Belum ada tautan cepat yang ditambahkan. Klik tombol <strong>+ Tambah Tautan Cepat</strong> di atas.</span>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($links->hasPages())
            <div class="p-4 border-t border-[#E3DAC7] bg-[#FAF6EC]/30">
                {{ $links->links() }}
            </div>
        @endif
    </div>

</div>

<!-- ========================================================================= -->
<!-- MODAL: Tambah Tautan Cepat -->
<!-- ========================================================================= -->
<div id="modalCreate" class="fixed inset-0 z-50 hidden bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white border border-[#E3DAC7] rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">
        <div class="px-5 py-4 bg-[#FAF6EC] border-b border-[#E3DAC7] flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-plus text-[#0F4C3A]"></i>
                <h3 class="font-bold text-sm text-[#0F4C3A]">Tambah Tautan Cepat Baru</h3>
            </div>
            <button type="button" onclick="closeCreateModal()" class="text-[#5C6B73] hover:text-[#1B2A2F]">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>
        </div>

        <form action="{{ route('admin.quick-links.store') }}" method="POST" enctype="multipart/form-data" class="p-5 space-y-4">
            @csrf
            
            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Nama Website / Portal <span class="text-red-500">*</span></label>
                <input type="text" name="title" required placeholder="Contoh: SIAKAD IAI Persis" class="neu-input w-full px-3 py-2 text-xs">
                <p class="text-[10px] text-[#5C6B73] mt-1">Nama ini juga menjadi teks tooltip saat logo di-hover.</p>
            </div>

            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Alamat URL Tujuan <span class="text-red-500">*</span></label>
                <input type="url" name="url" required placeholder="https://siakad.iaipibandung.ac.id" class="neu-input w-full px-3 py-2 text-xs font-mono">
            </div>

            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Upload Berkas Logo (PNG / SVG / JPG)</label>
                <input type="file" name="logo" accept="image/*" class="neu-input w-full px-3 py-1.5 text-xs">
                <p class="text-[10px] text-[#5C6B73] mt-1">Gunakan gambar transparan beresolusi pas (PNG/SVG, maks 2MB).</p>
            </div>

            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Atau Gunakan URL Logo Eksternal</label>
                <input type="text" name="logo_url" placeholder="/images/piaud/logo-siakad.png" class="neu-input w-full px-3 py-2 text-xs font-mono">
            </div>

            <!-- Checkbox Show / Hide Title -->
            <div class="p-3 bg-[#FAF6EC] border border-[#E3DAC7] rounded-lg space-y-2">
                <label class="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" name="show_title" value="1" class="rounded text-[#0F4C3A] focus:ring-[#0F4C3A]">
                    <span class="text-xs font-bold text-[#1B2A2F]">Tampilkan Nama Web di samping Logo</span>
                </label>
                <p class="text-[10px] text-[#5C6B73] pl-6">
                    Biarkan <strong>tidak dicentang</strong> jika ingin <strong>menyembunyikan nama</strong> (hanya menampilkan logo saja di beranda).
                </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Urutan Tampil</label>
                    <input type="number" name="order" value="0" class="neu-input w-full px-3 py-2 text-xs">
                </div>

                <div class="flex items-center pt-5">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_active" value="1" checked class="rounded text-[#0F4C3A] focus:ring-[#0F4C3A]">
                        <span class="text-xs font-bold text-[#1B2A2F]">Aktifkan Tautan</span>
                    </label>
                </div>
            </div>

            <div class="pt-3 border-t border-[#E3DAC7] flex items-center justify-end gap-2">
                <button type="button" onclick="closeCreateModal()" class="neu-btn px-4 py-2 text-xs text-[#5C6B73] hover:bg-gray-100 rounded-lg">
                    Batal
                </button>
                <button type="submit" class="neu-btn neu-btn-primary px-4 py-2 text-xs rounded-lg">
                    Simpan Tautan
                </button>
            </div>
        </form>
    </div>
</div>

<!-- ========================================================================= -->
<!-- MODAL: Edit Tautan Cepat -->
<!-- ========================================================================= -->
<div id="modalEdit" class="fixed inset-0 z-50 hidden bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white border border-[#E3DAC7] rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">
        <div class="px-5 py-4 bg-[#FAF6EC] border-b border-[#E3DAC7] flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-pen-to-square text-[#0F4C3A]"></i>
                <h3 class="font-bold text-sm text-[#0F4C3A]">Ubah Tautan Cepat</h3>
            </div>
            <button type="button" onclick="closeEditModal()" class="text-[#5C6B73] hover:text-[#1B2A2F]">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>
        </div>

        <form id="formEditLink" method="POST" enctype="multipart/form-data" class="p-5 space-y-4">
            @csrf
            @method('PUT')
            
            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Nama Website / Portal <span class="text-red-500">*</span></label>
                <input type="text" id="edit_title" name="title" required class="neu-input w-full px-3 py-2 text-xs">
            </div>

            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Alamat URL Tujuan <span class="text-red-500">*</span></label>
                <input type="url" id="edit_url" name="url" required class="neu-input w-full px-3 py-2 text-xs font-mono">
            </div>

            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Ganti Berkas Logo</label>
                <input type="file" name="logo" accept="image/*" class="neu-input w-full px-3 py-1.5 text-xs">
            </div>

            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Atau Path / URL Logo</label>
                <input type="text" id="edit_logo_url" name="logo_url" class="neu-input w-full px-3 py-2 text-xs font-mono">
            </div>

            <!-- Checkbox Show / Hide Title -->
            <div class="p-3 bg-[#FAF6EC] border border-[#E3DAC7] rounded-lg space-y-2">
                <label class="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" id="edit_show_title" name="show_title" value="1" class="rounded text-[#0F4C3A] focus:ring-[#0F4C3A]">
                    <span class="text-xs font-bold text-[#1B2A2F]">Tampilkan Nama Web di samping Logo</span>
                </label>
                <p class="text-[10px] text-[#5C6B73] pl-6">
                    Biarkan <strong>tidak dicentang</strong> jika ingin <strong>menyembunyikan nama</strong> (hanya logo).
                </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Urutan Tampil</label>
                    <input type="number" id="edit_order" name="order" class="neu-input w-full px-3 py-2 text-xs">
                </div>

                <div class="flex items-center pt-5">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" id="edit_is_active" name="is_active" value="1" class="rounded text-[#0F4C3A] focus:ring-[#0F4C3A]">
                        <span class="text-xs font-bold text-[#1B2A2F]">Aktifkan Tautan</span>
                    </label>
                </div>
            </div>

            <div class="pt-3 border-t border-[#E3DAC7] flex items-center justify-end gap-2">
                <button type="button" onclick="closeEditModal()" class="neu-btn px-4 py-2 text-xs text-[#5C6B73] hover:bg-gray-100 rounded-lg">
                    Batal
                </button>
                <button type="submit" class="neu-btn neu-btn-primary px-4 py-2 text-xs rounded-lg">
                    Simpan Perubahan
                </button>
            </div>
        </form>
    </div>
</div>

<script>
    function openCreateModal() {
        document.getElementById('modalCreate').classList.remove('hidden');
    }
    function closeCreateModal() {
        document.getElementById('modalCreate').classList.add('hidden');
    }

    function openEditModal(link) {
        document.getElementById('edit_title').value = link.title;
        document.getElementById('edit_url').value = link.url;
        document.getElementById('edit_logo_url').value = link.logo_url || '';
        document.getElementById('edit_order').value = link.order;
        document.getElementById('edit_show_title').checked = Boolean(link.show_title);
        document.getElementById('edit_is_active').checked = Boolean(link.is_active);

        const form = document.getElementById('formEditLink');
        form.action = "{{ url('admin/quick-links') }}/" + link.id;

        document.getElementById('modalEdit').classList.remove('hidden');
    }
    function closeEditModal() {
        document.getElementById('modalEdit').classList.add('hidden');
    }

    window.addEventListener('click', function(e) {
        const createModal = document.getElementById('modalCreate');
        const editModal = document.getElementById('modalEdit');
        if (e.target === createModal) closeCreateModal();
        if (e.target === editModal) closeEditModal();
    });
</script>
@endsection
