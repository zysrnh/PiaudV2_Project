@extends('layouts.admin')

@section('title', 'Data Dosen & Tenaga Pengajar')
@section('header', 'Daftar Dosen & Tenaga Pengajar')
@section('subheader', 'Kelola profil dosen, NIP/NIDN, jabatan fungsional, dan kepakaran')

@section('content')
<div class="space-y-6">
    <!-- Header Actions -->
    <div class="flex items-center justify-between">
        <div class="neu-inset px-4 py-2 text-xs font-semibold text-[#1B2A2F]">
            Total Dosen: <span class="text-[#0F4C3A] font-bold">{{ $lecturers->total() }} Orang</span>
        </div>
        <a href="{{ route('admin.lecturers.create') }}" class="neu-btn-primary px-4 py-2.5 text-xs flex items-center gap-2">
            <i class="fa-solid fa-plus"></i>
            <span>Tambah Dosen Baru</span>
        </a>
    </div>

    <!-- Lecturers Table/Card Grid -->
    <div class="neu-card p-6 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
                <thead>
                    <tr class="border-b border-[#E3DAC7] text-[#5C6B73] uppercase tracking-wider text-[11px]">
                        <th class="py-3 px-4">Urutan</th>
                        <th class="py-3 px-4">Foto & Nama</th>
                        <th class="py-3 px-4">NIP / NIDN</th>
                        <th class="py-3 px-4">Jabatan / Peran</th>
                        <th class="py-3 px-4">Bidang Keahlian</th>
                        <th class="py-3 px-4 text-center">Status</th>
                        <th class="py-3 px-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-[#E3DAC7]/50 text-[#1B2A2F]">
                    @forelse($lecturers as $dosen)
                        <tr class="hover:bg-[#F2ECE0]/50 transition-colors">
                            <td class="py-3.5 px-4 font-mono font-bold text-center w-12 text-[#5C6B73]">
                                {{ $dosen->order ?? 0 }}
                            </td>
                            <td class="py-3.5 px-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-lg overflow-hidden neu-inset shrink-0 flex items-center justify-center bg-[#FAF6EC]">
                                        @if($dosen->photo_url)
                                            <img src="{{ $dosen->photo_url }}" alt="{{ $dosen->name }}" class="w-full h-full object-cover">
                                        @else
                                            <i class="fa-solid fa-user text-[#5C6B73]"></i>
                                        @endif
                                    </div>
                                    <div>
                                        <div class="font-bold text-sm text-[#0F4C3A]">{{ $dosen->name }}</div>
                                        <div class="text-[10px] text-[#5C6B73]">ID: #{{ $dosen->id }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3.5 px-4 font-mono text-[11px] text-[#5C6B73]">
                                {{ $dosen->nip ?: ($dosen->nidn ?: '-') }}
                            </td>
                            <td class="py-3.5 px-4">
                                <span class="neu-card-sm px-2.5 py-1 text-[11px] font-semibold text-[#1B2A2F] inline-block">
                                    {{ $dosen->role }}
                                </span>
                            </td>
                            <td class="py-3.5 px-4 max-w-xs truncate text-[11px] text-[#5C6B73]">
                                {{ $dosen->expertise ?: '-' }}
                            </td>
                            <td class="py-3.5 px-4 text-center">
                                @if($dosen->is_active ?? true)
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Aktif
                                    </span>
                                @else
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-200 text-gray-700 border border-gray-300">
                                        Nonaktif
                                    </span>
                                @endif
                            </td>
                            <td class="py-3.5 px-4 text-right">
                                <div class="inline-flex items-center gap-2">
                                    <a href="{{ route('admin.lecturers.edit', $dosen->id) }}" class="neu-btn px-2.5 py-1.5 text-xs text-[#0F4C3A] hover:bg-white" title="Edit">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a>
                                    <form method="POST" action="{{ route('admin.lecturers.destroy', $dosen->id) }}" onsubmit="return confirm('Apakah Anda yakin ingin menghapus data dosen ini?');" class="inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="neu-btn px-2.5 py-1.5 text-xs text-red-600 hover:text-red-800" title="Hapus">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="py-8 text-center text-[#5C6B73]">
                                <i class="fa-solid fa-folder-open text-2xl mb-2 block"></i>
                                Belum ada data dosen tersimpan.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($lecturers->hasPages())
            <div class="mt-6 pt-4 border-t border-[#E3DAC7]">
                {{ $lecturers->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
