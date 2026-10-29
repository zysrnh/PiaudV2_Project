@extends('layouts.admin')

@section('title', 'Kelola Akun Admin & Pengguna')
@section('header', 'Kelola Akun Admin & Pengguna')
@section('subheader', 'Manajemen hak akses, penambahan admin baru, dan pengaturan kredensial CMS')

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

    @if(session('error'))
        <div class="p-4 bg-[#C2613A]/10 border border-[#C2613A]/30 rounded-lg flex items-center justify-between text-[#C2613A]">
            <div class="flex items-center gap-3 text-xs font-semibold">
                <i class="fa-solid fa-triangle-exclamation text-sm"></i>
                <span>{{ session('error') }}</span>
            </div>
            <button type="button" onclick="this.parentElement.remove()" class="text-[#C2613A] hover:opacity-75">
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

    <!-- Top Action & Filter Bar -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <!-- Filter Tabs -->
        <div class="flex items-center gap-2 flex-wrap">
            <a href="{{ route('admin.users.index', ['role' => 'all', 'search' => $search]) }}" 
               class="px-3.5 py-2 rounded-lg text-xs font-bold transition-all {{ $roleFilter === 'all' ? 'bg-[#0F4C3A] text-white shadow-sm' : 'bg-white border border-[#E3DAC7] text-[#1B2A2F] hover:border-[#0F4C3A]' }}">
                <span>Semua Akun</span>
                <span class="ml-1 px-1.5 py-0.5 rounded-full text-[10px] {{ $roleFilter === 'all' ? 'bg-white/20 text-white' : 'bg-[#FAF6EC] text-[#5C6B73]' }}">{{ $totalCount }}</span>
            </a>

            <a href="{{ route('admin.users.index', ['role' => 'dev', 'search' => $search]) }}" 
               class="px-3.5 py-2 rounded-lg text-xs font-bold transition-all {{ $roleFilter === 'dev' ? 'bg-[#0F4C3A] text-white shadow-sm' : 'bg-white border border-[#E3DAC7] text-[#0F4C3A] hover:border-[#0F4C3A]' }}">
                <i class="fa-solid fa-shield-halved mr-1 text-[11px]"></i>
                <span>Superadmin Dev</span>
                <span class="ml-1 px-1.5 py-0.5 rounded-full text-[10px] {{ $roleFilter === 'dev' ? 'bg-white/20 text-white' : 'bg-[#0F4C3A]/10 text-[#0F4C3A]' }}">{{ $devCount }}</span>
            </a>

            <a href="{{ route('admin.users.index', ['role' => 'admin', 'search' => $search]) }}" 
               class="px-3.5 py-2 rounded-lg text-xs font-bold transition-all {{ $roleFilter === 'admin' ? 'bg-[#0F4C3A] text-white shadow-sm' : 'bg-white border border-[#E3DAC7] text-[#1B2A2F] hover:border-[#0F4C3A]' }}">
                <i class="fa-solid fa-user-pen mr-1 text-[11px]"></i>
                <span>Admin Konten</span>
                <span class="ml-1 px-1.5 py-0.5 rounded-full text-[10px] {{ $roleFilter === 'admin' ? 'bg-white/20 text-white' : 'bg-[#FAF6EC] text-[#5C6B73]' }}">{{ $adminCount }}</span>
            </a>
        </div>

        <!-- Right: Search Form & Button Tambah -->
        <div class="flex items-center gap-3">
            <form action="{{ route('admin.users.index') }}" method="GET" class="relative">
                <input type="hidden" name="role" value="{{ $roleFilter }}">
                <input type="text" 
                       name="search" 
                       value="{{ $search }}" 
                       placeholder="Cari nama atau email..." 
                       class="neu-input pl-8 pr-3 py-1.5 text-xs w-48 sm:w-60 focus:w-72 transition-all">
                <i class="fa-solid fa-magnifying-glass absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#5C6B73]"></i>
            </form>

            <button type="button" 
                    onclick="openCreateModal()" 
                    class="neu-btn neu-btn-primary px-3.5 py-2 text-xs flex items-center gap-2 whitespace-nowrap shadow-sm">
                <i class="fa-solid fa-user-plus text-[11px]"></i>
                <span>Tambah Akun</span>
            </button>
        </div>
    </div>

    <!-- Users Table Container -->
    <div class="bg-white border border-[#E3DAC7] rounded-xl overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
                <thead>
                    <tr class="bg-[#FAF6EC] border-b border-[#E3DAC7] text-[#5C6B73] font-bold uppercase tracking-wider text-[10px]">
                        <th class="py-3 px-4">Pengguna</th>
                        <th class="py-3 px-4">Email Login</th>
                        <th class="py-3 px-4">Hak Akses / Peran</th>
                        <th class="py-3 px-4">Terdaftar</th>
                        <th class="py-3 px-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-[#E3DAC7]/70">
                    @forelse($users as $user)
                        <tr class="hover:bg-[#FAF6EC]/50 transition-colors {{ $user->id === auth()->id() ? 'bg-[#FAF6EC]/25' : '' }}">
                            <!-- Pengguna -->
                            <td class="py-3.5 px-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-lg bg-[#0F4C3A] text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                                        {{ strtoupper(substr($user->name, 0, 1)) }}
                                    </div>
                                    <div>
                                        <div class="font-bold text-[#1B2A2F] flex items-center gap-1.5">
                                            <span>{{ $user->name }}</span>
                                            @if($user->id === auth()->id())
                                                <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#C2613A] text-white">Anda</span>
                                            @endif
                                        </div>
                                        <div class="text-[10px] text-[#5C6B73]">ID: #{{ $user->id }}</div>
                                    </div>
                                </div>
                            </td>

                            <!-- Email -->
                            <td class="py-3.5 px-4 font-mono text-[11px] text-[#1B2A2F]">
                                {{ $user->email }}
                            </td>

                            <!-- Role -->
                            <td class="py-3.5 px-4">
                                @if($user->isDev())
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#0F4C3A] text-white">
                                        <i class="fa-solid fa-shield-halved text-[9px]"></i>
                                        <span>Superadmin Dev</span>
                                    </span>
                                @else
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#F2ECE0] border border-[#E3DAC7] text-[#1B2A2F]">
                                        <i class="fa-solid fa-user-pen text-[9px] text-[#5C6B73]"></i>
                                        <span>Admin Konten</span>
                                    </span>
                                @endif
                            </td>

                            <!-- Tanggal -->
                            <td class="py-3.5 px-4 text-[#5C6B73] text-[11px]">
                                {{ $user->created_at ? $user->created_at->format('d M Y, H:i') : '-' }}
                            </td>

                            <!-- Aksi -->
                            <td class="py-3.5 px-4 text-right">
                                <div class="inline-flex items-center gap-1.5">
                                    <!-- Edit Button -->
                                    <button type="button" 
                                            onclick="openEditModal({{ json_encode([
                                                'id' => $user->id,
                                                'name' => $user->name,
                                                'email' => $user->email,
                                                'role' => $user->role,
                                            ]) }})"
                                            class="neu-btn px-2.5 py-1.5 text-xs text-[#0F4C3A] hover:bg-[#FAF6EC] border border-[#E3DAC7] rounded-md inline-flex items-center gap-1"
                                            title="Ubah Data Akun">
                                        <i class="fa-solid fa-pen-to-square text-[10px]"></i>
                                        <span class="hidden sm:inline">Edit</span>
                                    </button>

                                    <!-- Delete Button -->
                                    @if($user->id !== auth()->id())
                                        <form action="{{ route('admin.users.destroy', $user->id) }}" 
                                              method="POST" 
                                              onsubmit="return confirm('Apakah Anda yakin ingin menghapus akun \'{{ $user->name }}\'? Tindakan ini tidak dapat dibatalkan.');" 
                                              class="inline-block">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" 
                                                    class="neu-btn px-2.5 py-1.5 text-xs text-[#C2613A] hover:bg-[#C2613A]/10 border border-[#E3DAC7] rounded-md inline-flex items-center gap-1"
                                                    title="Hapus Akun">
                                                <i class="fa-solid fa-trash-can text-[10px]"></i>
                                                <span class="hidden sm:inline">Hapus</span>
                                            </button>
                                        </form>
                                    @else
                                        <span class="px-2.5 py-1.5 text-[10px] text-[#5C6B73]/50 italic" title="Akun aktif tidak dapat dihapus">Terkunci</span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="py-8 px-4 text-center text-[#5C6B73]">
                                <i class="fa-solid fa-user-slash text-2xl mb-2 text-[#5C6B73]/40 block"></i>
                                <span>Tidak ada akun pengguna yang sesuai dengan kriteria pencarian.</span>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        @if($users->hasPages())
            <div class="p-4 border-t border-[#E3DAC7] bg-[#FAF6EC]/30">
                {{ $users->links() }}
            </div>
        @endif
    </div>

</div>

<!-- ========================================================================= -->
<!-- MODAL: Tambah Akun Baru -->
<!-- ========================================================================= -->
<div id="modalCreate" class="fixed inset-0 z-50 hidden bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white border border-[#E3DAC7] rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">
        <div class="px-5 py-4 bg-[#FAF6EC] border-b border-[#E3DAC7] flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-user-plus text-[#0F4C3A]"></i>
                <h3 class="font-bold text-sm text-[#0F4C3A]">Tambah Akun Admin Baru</h3>
            </div>
            <button type="button" onclick="closeCreateModal()" class="text-[#5C6B73] hover:text-[#1B2A2F]">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>
        </div>

        <form action="{{ route('admin.users.store') }}" method="POST" class="p-5 space-y-4">
            @csrf
            
            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Nama Lengkap &amp; Gelar <span class="text-red-500">*</span></label>
                <input type="text" name="name" required placeholder="Contoh: Ahmad Fauzi, M.Pd." class="neu-input w-full px-3 py-2 text-xs">
            </div>

            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Alamat Email Login <span class="text-red-500">*</span></label>
                <input type="email" name="email" required placeholder="nama@piaud.iaipibandung.ac.id" class="neu-input w-full px-3 py-2 text-xs">
            </div>

            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Peran / Hak Akses <span class="text-red-500">*</span></label>
                <select name="role" required class="neu-input w-full px-3 py-2 text-xs bg-white">
                    <option value="admin">Admin Konten (Kelola Dosen, Berita, Galeri &amp; Inbox)</option>
                    <option value="dev">Superadmin Developer (Akses Penuh + Web Terminal)</option>
                </select>
                <p class="text-[10px] text-[#5C6B73] mt-1">Superadmin memiliki hak akses ke menu Terminal Artisan &amp; Manajemen Akun.</p>
            </div>

            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Password Baru <span class="text-red-500">*</span></label>
                <input type="password" name="password" required minlength="6" placeholder="Minimal 6 karakter..." class="neu-input w-full px-3 py-2 text-xs font-mono">
            </div>

            <div class="pt-3 border-t border-[#E3DAC7] flex items-center justify-end gap-2">
                <button type="button" onclick="closeCreateModal()" class="neu-btn px-4 py-2 text-xs text-[#5C6B73] hover:bg-gray-100 rounded-lg">
                    Batal
                </button>
                <button type="submit" class="neu-btn neu-btn-primary px-4 py-2 text-xs rounded-lg">
                    Simpan Akun Baru
                </button>
            </div>
        </form>
    </div>
</div>

<!-- ========================================================================= -->
<!-- MODAL: Edit Akun -->
<!-- ========================================================================= -->
<div id="modalEdit" class="fixed inset-0 z-50 hidden bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white border border-[#E3DAC7] rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">
        <div class="px-5 py-4 bg-[#FAF6EC] border-b border-[#E3DAC7] flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-user-pen text-[#0F4C3A]"></i>
                <h3 class="font-bold text-sm text-[#0F4C3A]">Ubah Data Akun Pengguna</h3>
            </div>
            <button type="button" onclick="closeEditModal()" class="text-[#5C6B73] hover:text-[#1B2A2F]">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>
        </div>

        <form id="formEditUser" method="POST" class="p-5 space-y-4">
            @csrf
            @method('PUT')
            
            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Nama Lengkap &amp; Gelar <span class="text-red-500">*</span></label>
                <input type="text" id="edit_name" name="name" required class="neu-input w-full px-3 py-2 text-xs">
            </div>

            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Alamat Email Login <span class="text-red-500">*</span></label>
                <input type="email" id="edit_email" name="email" required class="neu-input w-full px-3 py-2 text-xs">
            </div>

            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Peran / Hak Akses <span class="text-red-500">*</span></label>
                <select id="edit_role" name="role" required class="neu-input w-full px-3 py-2 text-xs bg-white">
                    <option value="admin">Admin Konten (Kelola Dosen, Berita, Galeri &amp; Inbox)</option>
                    <option value="dev">Superadmin Developer (Akses Penuh + Web Terminal)</option>
                </select>
            </div>

            <div>
                <label class="block text-xs font-bold text-[#1B2A2F] mb-1">Reset Password Baru</label>
                <input type="password" name="password" minlength="6" placeholder="Kosongkan jika password tidak ingin diubah" class="neu-input w-full px-3 py-2 text-xs font-mono">
                <p class="text-[10px] text-[#5C6B73] mt-1">Isi hanya jika ingin mengganti password pengguna ini.</p>
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

    function openEditModal(userData) {
        document.getElementById('edit_name').value = userData.name;
        document.getElementById('edit_email').value = userData.email;
        document.getElementById('edit_role').value = userData.role;

        // Set action url pada form
        const form = document.getElementById('formEditUser');
        form.action = "{{ url('admin/users') }}/" + userData.id;

        document.getElementById('modalEdit').classList.remove('hidden');
    }
    function closeEditModal() {
        document.getElementById('modalEdit').classList.add('hidden');
    }

    // Tutup modal jika klik backdrop luar
    window.addEventListener('click', function(e) {
        const createModal = document.getElementById('modalCreate');
        const editModal = document.getElementById('modalEdit');
        if (e.target === createModal) closeCreateModal();
        if (e.target === editModal) closeEditModal();
    });
</script>
@endsection
