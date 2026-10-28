import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export default function LaboratoriumApe() {
    const waLink = createWhatsAppLink("Halo Admin, saya ingin menanyakan informasi fasilitas laboratorium APE dan microteaching S1 PIAUD IAI Persis Bandung.");

    const [inView, setInView] = useState<Record<string, boolean>>({
        header: true,
    });

    const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const sectionId = entry.target.getAttribute('data-section');
                    if (sectionId) {
                        setInView((prev) => ({
                            ...prev,
                            [sectionId]: entry.isIntersecting,
                        }));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const facilities = [
        {
            icon: "🎥",
            title: "Studio Microteaching Berkamera",
            role: "Simulasi Pengajaran Berstandar Audio-Visual",
            desc: "Ruang kelas simulasi berukuran proporsional yang dilengkapi cermin satu arah (one-way observation screen) dan kamera perekam multi-angle untuk merekam performa mengajar mahasiswa secara objektif.",
            equipment: [
                "Cermin satu arah (one-way observation window) untuk dosen penguji",
                "Kamera perekam digital multi-angle & mikrofon lavalier",
                "Set meja & kursi anak ergonomis model sentra ramah balita",
                "Smart screen interactive untuk display modul ajar & storytelling digital",
            ],
        },
        {
            icon: "🔨",
            title: "Workshop Rancang Bangun APE",
            role: "Studio Produksi & Technopreneur Media Belajar",
            desc: "Pusat kreasi pertukangan ringan dan craft di mana mahasiswa memproduksi langsung alat permainan edukatif dari material kayu alami, kain flanel, dan bahan daur ulang ramah lingkungan.",
            equipment: [
                "Peralatan pertukangan kayu presisi (scroll saw halus, amplas mesin)",
                "Cat water-based food-grade (100% non-toxic & odorless)",
                "Meja potong kain, mesin jahit flanel, & sensory bin organizer",
                "Etalase display showcase karya mahasiswa siap dipasarkan",
            ],
        },
        {
            icon: "🧩",
            title: "Pojok Asesmen & Sensory Corner",
            role: "Pusat Skrining Tumbuh Kembang & Loose Parts",
            desc: "Area observasi perilaku dan simulasi deteksi dini tumbuh kembang anak usia emas, dilengkapi ribuan bahan loose parts terstruktur untuk stimulasi sensori-motorik.",
            equipment: [
                "Sensory play tray & bin berbagai tekstur alami (biji, pasir, air)",
                "Instrumen skrining perkembangan DDST II & Denver II",
                "Matras bermain lembut berstandar higienis",
                "Cermin ekspresi emosi & alat deteksi kecerdasan majemuk anak",
            ],
        },
    ];

    const apeProducts = [
        {
            id: 1,
            title: "Balok Geometri Warna Natural",
            category: "Bahan Kayu",
            icon: "🧱",
            material: "Kayu Pinus Solid & Beeswax Polish",
            targetAge: "Usia 2 - 4 Tahun",
            aspect: "Kognitif, Logika Ruang & Motorik Halus",
            desc: "Set balok kayu bertingkat dengan sudut melingkar (rounded edges) untuk melatih konsentrasi dan imajinasi bangun ruang arsitektural anak.",
        },
        {
            id: 2,
            title: "Busy Book Sentra Wudhu & Shalat",
            category: "Tekstil & Flanel",
            icon: "📖",
            material: "Kain Flanel Organik & Perekat Velcro Lentur",
            targetAge: "Usia 3 - 6 Tahun",
            aspect: "Nilai Agama Moral & Kemandirian Ibadah",
            desc: "Buku kain interaktif dengan figur lepas-pasang untuk mengenalkan rukun wudhu, tata cara shalat, dan adab harian secara motorik taktil.",
        },
        {
            id: 3,
            title: "Sensory Bin Ekosistem Nabawi",
            category: "Loose Parts & Sensori",
            icon: "🌾",
            material: "Biji-bijian Alami, Kayu Halus & Sendok Takar",
            targetAge: "Usia 1 - 3 Tahun",
            aspect: "Sensori Taktil, Koordinasi Tangan-Mata",
            desc: "Media stimulasi eksplorasi tekstur dengan konsep kebun kurma dan hewan ternak yang disebutkan dalam Al-Qur'an.",
        },
        {
            id: 4,
            title: "Puzzle Hijaiyah Taktil 3D",
            category: "Bahan Kayu",
            icon: "🔤",
            material: "MDF Halus Ramah Anak & Knob Kayu Mahoni",
            targetAge: "Usia 3 - 5 Tahun",
            aspect: "Bahasa, Mengenal Huruf Al-Qur'an & Motorik",
            desc: "Puzzle knob mudah digenggam balita dengan kontur huruf timbul untuk menstimulasi pengenalan makhraj huruf sejak dini.",
        },
        {
            id: 5,
            title: "Wayang Boneka Kisah 25 Nabi",
            category: "Buku & Cerita",
            icon: "🎭",
            material: "Kain Perca Pilihan & Tongkat Bambu Halus",
            targetAge: "Usia 4 - 6 Tahun",
            aspect: "Bahasa, Sosial-Emosional & Ibrah Nabawi",
            desc: "Media dongeng audio-visual interaktif untuk membawakan kisah keteladanan para Nabi dalam kegiatan penutupan sentra.",
        },
        {
            id: 6,
            title: "Papan Hitung Montessori Berbutir",
            category: "Loose Parts & Sensori",
            icon: "🔢",
            material: "Kayu Jati Belanda & Manik Kayu Warna-Warni",
            targetAge: "Usia 4 - 6 Tahun",
            aspect: "Logika Matematika Awal & Ketelitian",
            desc: "Papan pasak berhitung untuk mengenalkan konsep kuantitas angka konkret sebelum masuk ke simbol abstrak.",
        },
    ];

    const categories = ['Semua', 'Bahan Kayu', 'Tekstil & Flanel', 'Loose Parts & Sensori', 'Buku & Cerita'];

    const filteredProducts = selectedCategory === 'Semua'
        ? apeProducts
        : apeProducts.filter((p) => p.category === selectedCategory);

    return (
        <PublicLayout>
            <Head>
                <title>{`Laboratorium & Studio APE - ${siteConfig.programName} ${siteConfig.institutionName}`}</title>
                <meta
                    name="description"
                    content={`Fasilitas Laboratorium Microteaching dan Studio Rancang Bangun Alat Permainan Edukatif (APE) S1 PIAUD IAI Persis Bandung. Tempat riset media bermain ramah anak dan stimulasi tumbuh kembang usia emas.`}
                />
            </Head>

            {/* 1. Header Banner */}
            <div data-section="header" className="bg-[#0A3427] text-white py-12 md:py-16 border-b border-[#E3DAC7]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-white/70 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span className="text-white/40">/</span>
                        <Link href="/akademik" className="hover:text-white transition-colors">Akademik</Link>
                        <span className="text-white/40">/</span>
                        <span className="text-white font-medium">Laboratorium &amp; Studio APE</span>
                    </nav>
                    <h1 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight ${inView.header ? 'animate-slide-left' : ''}`}>
                        Laboratorium Microteaching &amp; Studio APE Terpadu
                    </h1>
                    <p className={`mt-3 text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed ${inView.header ? 'animate-slide-left delay-1' : ''}`}>
                        Fasilitas riset aplikatif yang memadukan teknologi evaluasi pengajaran modern, studio rancang bangun media edukatif anak berbahan ramah lingkungan, dan laboratorium skrining tumbuh kembang anak usia emas.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

                {/* 2. Key Metrics */}
                <section data-section="metrics" className={inView.metrics ? 'animate-slide-up' : ''}>
                    <div className="neu-card rounded-2xl p-6 sm:p-8 border border-[#E3DAC7] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-piaud-slate-muted uppercase tracking-wider block">Zona Lab Terpadu</span>
                            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C3A]">3 Studio</div>
                            <span className="text-[11px] text-piaud-slate-muted block">Microteaching, APE, Sensori</span>
                        </div>
                        <div className="space-y-1 border-l border-[#E3DAC7]/80">
                            <span className="text-xs font-bold text-piaud-slate-muted uppercase tracking-wider block">Koleksi Loose Parts</span>
                            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C2613A]">500+ Jenis</div>
                            <span className="text-[11px] text-piaud-slate-muted block">Bahan Alami &amp; Daur Ulang</span>
                        </div>
                        <div className="space-y-1 border-l border-[#E3DAC7]/80">
                            <span className="text-xs font-bold text-piaud-slate-muted uppercase tracking-wider block">Standar Higienis</span>
                            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C3A]">100% Non-Toxic</div>
                            <span className="text-[11px] text-piaud-slate-muted block">Cat Food-Grade Ramah Anak</span>
                        </div>
                        <div className="space-y-1 border-l border-[#E3DAC7]/80">
                            <span className="text-xs font-bold text-piaud-slate-muted uppercase tracking-wider block">Output Praktikum</span>
                            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C2613A]">Produk Riil</div>
                            <span className="text-[11px] text-piaud-slate-muted block">Dipamerkan &amp; Digunakan di RA</span>
                        </div>
                    </div>
                </section>

                {/* 3. Tiga Fasilitas Utama Lab (.neu-card-emerald Featured) */}
                <section data-section="facilities" className="space-y-8">
                    <div className={`text-center max-w-2xl mx-auto space-y-2 ${inView.facilities ? 'animate-slide-up' : ''}`}>
                        <span className="text-xs font-bold tracking-widest text-[#C2613A] uppercase block">
                            Infrastruktur Riset &amp; Pembelajaran
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                            Tiga Zona Fasilitas Terpadu
                        </h2>
                        <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                            Dirancang khusus menyerupai lingkungan kelas RA dan sentra bermain nyata agar mahasiswa terbiasa menghadapi dinamika anak usia dini.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {facilities.map((fac, idx) => (
                            <div key={idx} className={inView.facilities ? `animate-slide-up delay-${idx + 1}` : ''}>
                                <div className="neu-card card-interactive rounded-2xl p-7 border border-[#E3DAC7] space-y-5 h-full flex flex-col justify-between group">
                                    <div className="space-y-4">
                                        <div className="w-14 h-14 rounded-2xl bg-[#F2ECE0] flex items-center justify-center text-3xl shadow-soft group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                            {fac.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-serif font-bold text-lg text-piaud-slate group-hover:text-[#0F4C3A] transition-colors leading-snug">
                                                {fac.title}
                                            </h3>
                                            <p className="text-xs font-semibold text-[#C2613A] mt-1">
                                                {fac.role}
                                            </p>
                                            <p className="text-xs text-piaud-slate-muted mt-2 leading-relaxed">
                                                {fac.desc}
                                            </p>
                                        </div>

                                        <div className="space-y-2 pt-3 border-t border-[#E3DAC7]">
                                            <span className="text-xs font-bold text-piaud-slate block">
                                                Peralatan &amp; Fitur Lab:
                                            </span>
                                            <ul className="space-y-1.5">
                                                {fac.equipment.map((eq, i) => (
                                                    <li key={i} className="text-xs text-piaud-slate-muted flex items-start gap-2">
                                                        <span className="text-[#0F4C3A] font-bold mt-0.5">•</span>
                                                        <span>{eq}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-[#E3DAC7] text-[11px] font-bold text-[#0F4C3A]">
                                        Standar Praktikum Mandiri
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Showcase Katalog Produk Karya Mahasiswa APE */}
                <section data-section="catalog" className="space-y-8">
                    <div className={`text-center max-w-2xl mx-auto space-y-2 ${inView.catalog ? 'animate-slide-up' : ''}`}>
                        <span className="text-xs font-bold tracking-widest text-[#C2613A] uppercase block">
                            Karya Nyata Mahasiswa
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                            Katalog Alat Permainan Edukatif (APE)
                        </h2>
                        <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                            Contoh inovasi media bermain ramah anak yang dirancang, diuji, dan diproduksi langsung oleh mahasiswa PIAUD dalam mata kuliah praktikum media.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-xs font-bold px-4 py-2 rounded-xl transition-all active:scale-95 cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-[#0F4C3A] text-white shadow-soft'
                                        : 'neu-btn text-piaud-slate hover:text-[#0F4C3A]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Products Grid with key for smooth remount */}
                    <div key={selectedCategory} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((prod, idx) => (
                            <div
                                key={prod.id}
                                className="animate-table-row"
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                <div className="neu-card card-interactive rounded-2xl p-6 border border-[#E3DAC7] space-y-4 h-full flex flex-col justify-between bg-[#FAF6EC] group">
                                    <div className="space-y-3">
                                        <div className="flex items-start justify-between">
                                            <div className="w-12 h-12 rounded-xl bg-[#F2ECE0] flex items-center justify-center text-2xl shadow-soft group-hover:scale-110 transition-transform duration-300">
                                                {prod.icon}
                                            </div>
                                            <span className="text-[11px] font-bold text-[#0F4C3A] uppercase tracking-wider">
                                                {prod.category}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="font-serif font-bold text-base text-piaud-slate group-hover:text-[#0F4C3A] transition-colors leading-snug">
                                                {prod.title}
                                            </h3>
                                            <p className="text-xs text-piaud-slate-muted mt-2 leading-relaxed">
                                                {prod.desc}
                                            </p>
                                        </div>

                                        <div className="space-y-1.5 pt-3 border-t border-[#E3DAC7] text-xs">
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="text-piaud-slate-muted">Sasaran:</span>
                                                <span className="font-semibold text-piaud-slate">{prod.targetAge}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="text-piaud-slate-muted">Bahan Baku:</span>
                                                <span className="font-semibold text-piaud-slate">{prod.material}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-[#E3DAC7]">
                                        <span className="text-[10px] font-bold text-[#C2613A] uppercase tracking-wider block">
                                            Stimulasi Utama:
                                        </span>
                                        <span className="text-xs text-piaud-slate font-medium block mt-0.5">
                                            {prod.aspect}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Alur Rancang Bangun & Standar Keamanan (.neu-card-emerald) */}
                <section data-section="safety" className={inView.safety ? 'animate-slide-up' : ''}>
                    <div className="neu-card-emerald rounded-2xl p-7 sm:p-10 md:p-12 border border-[#0A3427] space-y-8 text-white shadow-[0_12px_28px_rgba(10,52,39,0.35)]">
                        <div className="max-w-2xl space-y-2">
                            <span className="text-xs font-bold tracking-widest text-[#E3DAC7] uppercase block">
                                Protokol Mutu &amp; Ergonomi
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
                                Standar Keamanan Mainan &amp; Alur Riset
                            </h2>
                            <p className="text-sm text-white/90 leading-relaxed pt-1">
                                Setiap media APE yang diciptakan wajib lolos empat tahap verifikasi mutu sebelum diujicobakan kepada anak-anak di RA binaan:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white/10 rounded-xl p-5 border border-white/15 space-y-2 hover:bg-white/15 transition-colors">
                                <div className="text-xs font-bold text-[#E3DAC7] uppercase tracking-wider">Tahap 01</div>
                                <h3 className="font-serif font-bold text-base text-white">Analisis Usia Emas</h3>
                                <p className="text-xs text-white/80 leading-relaxed">
                                    Membedah aspek tumbuh kembang balita sesuai standar kurikulum dan stimulasi fitrah anak.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-5 border border-white/15 space-y-2 hover:bg-white/15 transition-colors">
                                <div className="text-xs font-bold text-[#E3DAC7] uppercase tracking-wider">Tahap 02</div>
                                <h3 className="font-serif font-bold text-base text-white">Desain Ergonomis</h3>
                                <p className="text-xs text-white/80 leading-relaxed">
                                    Menentukan dimensi alat sesuai ukuran genggaman balita, memastikan sudut tumpul tanpa serpihan tajam.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-5 border border-white/15 space-y-2 hover:bg-white/15 transition-colors">
                                <div className="text-xs font-bold text-[#E3DAC7] uppercase tracking-wider">Tahap 03</div>
                                <h3 className="font-serif font-bold text-base text-white">Produksi Non-Toxic</h3>
                                <p className="text-xs text-white/80 leading-relaxed">
                                    Pembuatan di workshop menggunakan cat bersertifikat food-grade dan material ramah lingkungan.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-5 border border-white/15 space-y-2 hover:bg-white/15 transition-colors">
                                <div className="text-xs font-bold text-[#E3DAC7] uppercase tracking-wider">Tahap 04</div>
                                <h3 className="font-serif font-bold text-base text-white">Uji Lapangan RA</h3>
                                <p className="text-xs text-white/80 leading-relaxed">
                                    Simulasi bermain riil bersama anak-anak di RA mitra untuk mengukur efektivitas dan minat belajar anak.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. CTA & Bottom Nav */}
                <section className="neu-card rounded-2xl p-8 sm:p-10 border border-[#E3DAC7] flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F2ECE0]">
                    <div className="space-y-1 text-center sm:text-left">
                        <h3 className="font-serif font-bold text-lg text-piaud-slate">
                            Ingin Melihat Dokumentasi Praktikum di Laboratorium Kami?
                        </h3>
                        <p className="text-xs sm:text-sm text-piaud-slate-muted">
                            Kunjungi galeri foto aktivitas mahasiswa di lab APE atau pelajari peluang karir sebagai technopreneur media anak.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/galeri"
                            className="neu-btn text-piaud-slate text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer"
                        >
                            <span>Lihat Galeri Foto</span>
                            <span className="ml-1.5">→</span>
                        </Link>
                        <Link
                            href="/profil-lulusan"
                            className="neu-btn-primary text-white text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer"
                        >
                            <span>Profil Lulusan</span>
                            <span className="ml-1.5">→</span>
                        </Link>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
