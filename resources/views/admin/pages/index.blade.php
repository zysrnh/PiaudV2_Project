@extends('layouts.admin')

@section('title', 'Kelola Halaman & Profil')
@section('header', 'Profil & Halaman Statis')
@section('subheader', 'Kelola Visi Misi, Sambutan Kaprodi, Kurikulum, dan Profil Lulusan')

@section('content')
<div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        @foreach($pages as $page)
            <div class="neu-card p-6 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <span class="neu-card-sm px-2.5 py-1 text-[10px] font-bold text-[#0F4C3A] uppercase tracking-wider">
                            Slug: /{{ $page->slug }}
                        </span>
                        @if($page->is_published)
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Tayang
                            </span>
                        @else
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-200 text-gray-700">
                                Draf
                            </span>
                        @endif
                    </div>

                    <h3 class="font-serif font-bold text-base text-[#1B2A2F] mb-2">{{ $page->title }}</h3>
                    <p class="text-xs text-[#5C6B73] line-clamp-2 mb-4">
                        {{ $page->meta_description ?: strip_tags($page->content) }}
                    </p>
                </div>

                <div class="pt-4 border-t border-[#E3DAC7] flex items-center justify-between">
                    <span class="text-[10px] text-[#5C6B73]">
                        Terakhir update: {{ $page->updated_at->diffForHumans() }}
                    </span>
                    <a href="{{ route('admin.pages.edit', $page->id) }}" class="neu-btn px-4 py-2 text-xs text-[#0F4C3A] font-bold flex items-center gap-2 hover:bg-white">
                        <i class="fa-solid fa-pen-to-square"></i>
                        <span>Edit Halaman</span>
                    </a>
                </div>
            </div>
        @endforeach
    </div>
</div>
@endsection
