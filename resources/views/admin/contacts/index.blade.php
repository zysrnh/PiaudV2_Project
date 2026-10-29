@extends('layouts.admin')

@section('title', 'Pesan & Konsultasi Publik')
@section('header', 'Pesan & Konsultasi Publik')
@section('subheader', 'Kelola pertanyaan, konsultasi PMB, dan pesan masuk dari formulir website')

@section('content')
<div class="space-y-6">

    <!-- Header Stats & Filter Tabs -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <!-- Filter Tabs -->
        <div class="flex items-center gap-2">
            <a href="{{ route('admin.contacts.index', ['status' => 'all']) }}" 
               class="px-3.5 py-2 rounded-lg text-xs font-bold transition-all {{ $status === 'all' ? 'bg-[#0F4C3A] text-white shadow-sm' : 'bg-white border border-[#E3DAC7] text-[#1B2A2F] hover:border-[#0F4C3A]' }}">
                <span>Semua Pesan</span>
                <span class="ml-1 px-1.5 py-0.5 rounded-full text-[10px] {{ $status === 'all' ? 'bg-white/20 text-white' : 'bg-[#FAF6EC] text-[#5C6B73]' }}">{{ $totalCount }}</span>
            </a>

            <a href="{{ route('admin.contacts.index', ['status' => 'unread']) }}" 
               class="px-3.5 py-2 rounded-lg text-xs font-bold transition-all {{ $status === 'unread' ? 'bg-[#C2613A] text-white shadow-sm' : 'bg-white border border-[#E3DAC7] text-[#C2613A] hover:border-[#C2613A]' }}">
                <i class="fa-solid fa-envelope mr-1 text-[11px]"></i>
                <span>Belum Dibaca</span>
                <span class="ml-1 px-1.5 py-0.5 rounded-full text-[10px] {{ $status === 'unread' ? 'bg-white/20 text-white' : 'bg-[#C2613A]/10 text-[#C2613A]' }}">{{ $unreadCount }}</span>
            </a>

            <a href="{{ route('admin.contacts.index', ['status' => 'read']) }}" 
               class="px-3.5 py-2 rounded-lg text-xs font-bold transition-all {{ $status === 'read' ? 'bg-[#0F4C3A] text-white shadow-sm' : 'bg-white border border-[#E3DAC7] text-[#1B2A2F] hover:border-[#0F4C3A]' }}">
                <i class="fa-solid fa-envelope-open mr-1 text-[11px]"></i>
                <span>Sudah Dibaca</span>
            </a>
        </div>

        <div class="text-xs text-[#5C6B73]">
            Total Ditemukan: <strong class="text-[#0F4C3A]">{{ $contacts->total() }} Pesan</strong>
        </div>
    </div>

    <!-- Message List / Table -->
    <div class="bg-white border border-[#E3DAC7] rounded-xl overflow-hidden shadow-sm">
        @if($contacts->count() > 0)
            <div class="divide-y divide-[#E3DAC7]/70">
                @foreach($contacts as $item)
                    @php
                        // Normalize phone number to WhatsApp format (08... -> 628...)
                        $rawPhone = preg_replace('/[^0-9]/', '', $item->phone);
                        if (str_starts_with($rawPhone, '0')) {
                            $waPhone = '62' . substr($rawPhone, 1);
                        } else {
                            $waPhone = $rawPhone;
                        }
                        $replyText = rawurlencode("Halo {$item->name}, terima kasih telah menghubungi Program Studi S1 PIAUD IAI Persis Bandung. Terkait pesan/konsultasi Anda mengenai: {$item->interest}...");
                    @endphp
                    <div class="p-5 hover:bg-[#FAF6EC]/40 transition-colors {{ $item->status === 'unread' ? 'bg-[#FAF6EC]/30' : '' }}">
                        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            
                            <!-- Left: Sender Info & Content -->
                            <div class="space-y-2.5 min-w-0 flex-1">
                                <!-- Sender Header -->
                                <div class="flex items-center gap-3 flex-wrap">
                                    <div class="w-9 h-9 rounded-lg {{ $item->status === 'unread' ? 'bg-[#C2613A]' : 'bg-[#0F4C3A]' }} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                                        {{ strtoupper(substr($item->name, 0, 1)) }}
                                    </div>
                                    <div>
                                        <div class="flex items-center gap-2 flex-wrap">
                                            <h4 class="font-bold text-sm text-[#1B2A2F]">{{ $item->name }}</h4>
                                            @if($item->status === 'unread')
                                                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C2613A] text-white uppercase tracking-wider">Baru</span>
                                            @else
                                                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">Dibaca</span>
                                            @endif
                                        </div>
                                        <p class="text-[11px] font-mono text-[#5C6B73]">
                                            <i class="fa-brands fa-whatsapp text-emerald-600 mr-1"></i>{{ $item->phone }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Interest Topic Badge -->
                                @if($item->interest)
                                    <div>
                                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#F2ECE0] text-[#0F4C3A] border border-[#E3DAC7]">
                                            <i class="fa-solid fa-tag text-[10px]"></i>
                                            <span>{{ $item->interest }}</span>
                                        </span>
                                    </div>
                                @endif

                                <!-- Message Body -->
                                <div class="p-3.5 rounded-lg bg-white border border-[#E3DAC7] text-xs text-[#1B2A2F] leading-relaxed">
                                    {{ $item->message }}
                                </div>

                                <p class="text-[11px] text-[#5C6B73]">
                                    <i class="fa-regular fa-clock mr-1 text-[10px]"></i>
                                    Diterima pada: {{ $item->created_at->format('d M Y, H:i') }} WIB ({{ $item->created_at->diffForHumans() }})
                                </p>
                            </div>

                            <!-- Right: Actions -->
                            <div class="flex sm:flex-row lg:flex-col items-center gap-2 shrink-0">
                                <!-- WhatsApp Reply Button -->
                                <a href="https://wa.me/{{ $waPhone }}?text={{ $replyText }}" 
                                   target="_blank" 
                                   class="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                                   title="Buka chat WhatsApp untuk membalas">
                                    <i class="fa-brands fa-whatsapp text-sm"></i>
                                    <span>Balas WA</span>
                                </a>

                                <!-- Mark as Read Button -->
                                @if($item->status === 'unread')
                                    <form method="POST" action="{{ route('admin.contacts.read', $item->id) }}">
                                        @csrf
                                        @method('PATCH')
                                        <button type="submit" 
                                                class="px-3 py-2 rounded-lg bg-white border border-[#E3DAC7] hover:border-[#0F4C3A] text-xs font-semibold text-[#0F4C3A] flex items-center gap-1.5 transition-colors cursor-pointer"
                                                title="Tandai sudah dibaca">
                                            <i class="fa-regular fa-circle-check text-[11px]"></i>
                                            <span>Tandai Dibaca</span>
                                        </button>
                                    </form>
                                @endif

                                <!-- Delete Button -->
                                <form method="POST" action="{{ route('admin.contacts.destroy', $item->id) }}" onsubmit="return confirm('Hapus pesan dari {{ $item->name }}?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" 
                                            class="px-3 py-2 rounded-lg bg-white border border-[#E3DAC7] hover:border-red-400 hover:bg-red-50 text-xs font-semibold text-red-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                                            title="Hapus pesan ini">
                                        <i class="fa-regular fa-trash-can text-[11px]"></i>
                                        <span>Hapus</span>
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                @endforeach
            </div>

            <!-- Pagination -->
            @if($contacts->hasPages())
                <div class="p-4 border-t border-[#E3DAC7]">
                    {{ $contacts->links() }}
                </div>
            @endif

        @else
            <div class="p-12 text-center text-xs text-[#5C6B73] space-y-2">
                <div class="w-12 h-12 rounded-xl bg-[#FAF6EC] border border-[#E3DAC7] flex items-center justify-center text-[#5C6B73] text-xl mx-auto">
                    <i class="fa-regular fa-envelope-open"></i>
                </div>
                <h4 class="font-bold text-sm text-[#1B2A2F]">Belum Ada Pesan</h4>
                <p>Belum ada konsultasi atau pertanyaan publik yang masuk untuk kategori ini.</p>
            </div>
        @endif
    </div>

</div>
@endsection
