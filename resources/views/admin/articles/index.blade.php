@extends('layouts.admin')

@section('title', 'Artikel & Berita Kegiatan')
@section('header', 'Daftar Artikel & Berita')
@section('subheader', 'Publikasi warta kegiatan, artikel parenting islami, dan opini akademik')

@section('content')
<div class="space-y-6">
    <!-- Header Actions -->
    <div class="flex items-center justify-between">
        <div class="neu-inset px-4 py-2 text-xs font-semibold text-[#1B2A2F]">
            Total Artikel: <span class="text-[#0F4C3A] font-bold">{{ $articles->total() }} Postingan</span>
        </div>
        <a href="{{ route('admin.articles.create') }}" class="neu-btn-primary px-4 py-2.5 text-xs flex items-center gap-2">
            <i class="fa-solid fa-plus"></i>
            <span>Tulis Artikel Baru</span>
        </a>
    </div>

    <!-- Articles Table -->
    <div class="neu-card p-6 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
                <thead>
                    <tr class="border-b border-[#E3DAC7] text-[#5C6B73] uppercase tracking-wider text-[11px]">
                        <th class="py-3 px-4">Sampul</th>
                        <th class="py-3 px-4">Judul Artikel</th>
                        <th class="py-3 px-4">Kategori</th>
                        <th class="py-3 px-4">Waktu Baca</th>
                        <th class="py-3 px-4">Tanggal Rilis</th>
                        <th class="py-3 px-4 text-center">Sorotan</th>
                        <th class="py-3 px-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-[#E3DAC7]/50 text-[#1B2A2F]">
                    @forelse($articles as $art)
                        <tr class="hover:bg-[#F2ECE0]/50 transition-colors">
                            <td class="py-3.5 px-4 w-20">
                                <div class="w-16 h-12 rounded-lg overflow-hidden neu-inset shrink-0 flex items-center justify-center bg-[#FAF6EC]">
                                    @if($art->photo_url)
                                        <img src="{{ $art->photo_url }}" alt="{{ $art->title }}" class="w-full h-full object-cover">
                                    @else
                                        <i class="fa-solid fa-image text-[#5C6B73]"></i>
                                    @endif
                                </div>
                            </td>
                            <td class="py-3.5 px-4 max-w-sm">
                                <a href="{{ route('admin.articles.edit', $art->id) }}" class="font-bold text-sm text-[#0F4C3A] hover:underline line-clamp-1">
                                    {{ $art->title }}
                                </a>
                                <p class="text-[11px] text-[#5C6B73] line-clamp-1 mt-0.5">{{ $art->excerpt ?? '-' }}</p>
                            </td>
                            <td class="py-3.5 px-4">
                                <span class="neu-card-sm px-2.5 py-1 text-[11px] font-semibold text-[#0F4C3A] inline-block">
                                    {{ $art->category ? $art->category->name : 'Umum' }}
                                </span>
                            </td>
                            <td class="py-3.5 px-4 text-[11px] text-[#5C6B73]">
                                {{ $art->read_time ?: '3 menit baca' }}
                            </td>
                            <td class="py-3.5 px-4 text-[11px] text-[#5C6B73]">
                                {{ $art->published_at ? \Carbon\Carbon::parse($art->published_at)->isoFormat('D MMMM Y') : '-' }}
                            </td>
                            <td class="py-3.5 px-4 text-center">
                                @if($art->is_featured)
                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                        <i class="fa-solid fa-star text-amber-500 text-[9px]"></i> Featured
                                    </span>
                                @else
                                    <span class="text-[#5C6B73] text-[11px]">-</span>
                                @endif
                            </td>
                            <td class="py-3.5 px-4 text-right">
                                <div class="inline-flex items-center gap-2">
                                    <a href="{{ route('admin.articles.edit', $art->id) }}" class="neu-btn px-2.5 py-1.5 text-xs text-[#0F4C3A] hover:bg-white" title="Edit">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a>
                                    <form method="POST" action="{{ route('admin.articles.destroy', $art->id) }}" onsubmit="return confirm('Hapus artikel ini?');" class="inline">
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
                                <i class="fa-solid fa-newspaper text-2xl mb-2 block"></i>
                                Belum ada artikel atau warta yang diterbitkan.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($articles->hasPages())
            <div class="mt-6 pt-4 border-t border-[#E3DAC7]">
                {{ $articles->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
