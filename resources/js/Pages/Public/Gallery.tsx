import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Photo } from '@/Components/Public/Photo';
import { siteConfig } from '@/data/piaud';

interface GalleryPhoto {
    title: string;
    photoUrl: string;
    category: string;
    date: string;
    description: string;
}

export default function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [activeModalPhoto, setActiveModalPhoto] = useState<GalleryPhoto | null>(null);

    const galleryData: GalleryPhoto[] = [
        ...siteConfig.gallery.map((g, idx) => ({
            ...g,
            date: "Oktober 2026",
            description: "Dokumentasi praktikum mahasiswa dalam perancangan media belajar dan stimulasi anak usia dini di laboratorium PIAUD IAI Persis Bandung.",
        })),
        {
            title: "Simulasi Praktik Mengajar Microteaching di Kelas Sentra",
            photoUrl: "/images/piaud/Foto-Kegiatan-1.jpg",
            category: "Microteaching",
            date: "September 2026",
            description: "Penerapan metode bercerita dan interaksi komunikasi dua arah antara calon pendidik dan siswa usia prasekolah.",
        },
        {
            title: "Workshop Pembuatan Alat Peraga Edukatif Ramah Anak",
            photoUrl: "/images/piaud/Foto-Kegiatan-2.jpg",
            category: "Praktikum APE",
            date: "Agustus 2026",
            description: "Mahasiswa mendesain alat peraga dari bahan daur ulang dan kayu halus yang aman untuk sensori motorik anak.",
        },
        {
            title: "Pentas Seni & Tari Gerak Kreativitas Santri Cilik",
            photoUrl: "/images/piaud/Foto-Kegiatan-3.jpg",
            category: "Pentas Seni",
            date: "Juli 2026",
            description: "Kegiatan akhir semester unjuk bakat olah gerak, lagu anak Islami, dan ekspresi percaya diri anak usia dini.",
        },
        {
            title: "Kunjungan Studi Lapangan Observasi Tumbuh Kembang RA",
            photoUrl: "/images/piaud/Foto-Kegiatan-4.jpg",
            category: "Observasi RA",
            date: "Juni 2026",
            description: "Observasi langsung terhadap interaksi sosial dan kemandirian anak di Raudhatul Athfal mitra se-Bandung Raya.",
        },
    ];

    const categories = ['Semua', 'Praktikum APE', 'Microteaching', 'Pentas Seni', 'Observasi RA'];

    const filtered = galleryData.filter(
        (item) => selectedCategory === 'Semua' || item.category === selectedCategory
    );

    return (
        <PublicLayout>
            <Head>
                <title>{`Galeri Dokumentasi - ${siteConfig.programName} ${siteConfig.institutionName}`}</title>
                <meta
                    name="description"
                    content={`Galeri foto praktikum mahasiswa, laboratorium APE, simulasi microteaching, dan pentas anak PIAUD IAI Persis Bandung.`}
                />
            </Head>

            {/* Header Banner with Breadcrumb */}
            <div className="bg-[#0A3427] text-white py-10 md:py-12 border-b border-[#17664F]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-piaud-ivory/70 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span className="text-piaud-ivory/40">/</span>
                        <span className="text-white font-medium">Galeri Dokumentasi</span>
                    </nav>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                        Galeri Kegiatan &amp; Praktikum
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-piaud-ivory/85 max-w-2xl leading-relaxed">
                        Rekam visual aktivitas civitas akademika dalam berkarya, meneliti, dan mempraktikkan pembelajaran inovatif bersama anak usia dini.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
                {/* Category Filter Pills */}
                <div className="bg-[#F2ECE0] rounded-xl p-4 border border-[#E3DAC7] shadow-soft flex items-center justify-between flex-wrap gap-3">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 border tactile-press ${
                                    selectedCategory === cat
                                        ? 'bg-[#0F4C3A] text-white border-[#0A3427] shadow-soft font-bold'
                                        : 'bg-[#FAF6EC] text-piaud-slate hover:bg-[#F2ECE0] border-[#E3DAC7]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <span className="text-xs text-piaud-slate-muted font-medium px-2">
                        Menampilkan {filtered.length} foto kegiatan
                    </span>
                </div>

                {/* Elevated Photo Grid with Staggered Category Animation */}
                <div key={selectedCategory} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((item, index) => (
                        <figure
                            key={`${item.title}-${index}`}
                            onClick={() => setActiveModalPhoto(item)}
                            style={{ animationDelay: `${index * 50}ms` }}
                            className="animate-table-row bg-[#FAF6EC] rounded-2xl p-4 border border-[#E3DAC7] neu-card card-interactive group cursor-pointer"
                        >
                            <div className="overflow-hidden rounded-xl relative border border-[#E3DAC7]">
                                <Photo
                                    src={item.photoUrl}
                                    alt={item.title}
                                    aspectRatio="4/3"
                                    className="w-full h-auto rounded-xl shadow-soft"
                                />
                                <div className="absolute inset-0 bg-[#0F4C3A]/30 transform scale-90 invisible group-hover:visible group-hover:scale-100 transition-transform duration-200 flex items-center justify-center">
                                    <div className="w-11 h-11 rounded-xl bg-[#FAF6EC] text-[#0F4C3A] flex items-center justify-center shadow-lg border border-[#E3DAC7] transform group-hover:scale-110 transition-transform duration-200">
                                        <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="7" />
                                            <path d="m21 21-4.35-4.35" />
                                            <path d="M11 8v6M8 11h6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <figcaption className="mt-3.5 px-1 space-y-1.5">
                                <div className="flex items-center justify-between text-[11px] text-piaud-slate-muted">
                                    <span className="font-bold uppercase tracking-wider text-[#C2613A]">
                                        {item.category}
                                    </span>
                                    <span>{item.date}</span>
                                </div>
                                <h3 className="font-serif font-bold text-sm text-piaud-slate line-clamp-2 leading-snug group-hover:text-piaud-emerald transition-colors">
                                    {item.title}
                                </h3>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>

            {/* Lightbox / Modal (Solid Background, Spring Pop In, Zero White Halo) */}
            {activeModalPhoto && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                    onClick={() => setActiveModalPhoto(null)}
                >
                    <div
                        className="bg-[#FAF6EC] rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-[0_20px_40px_rgba(0,0,0,0.35)] border border-[#E3DAC7] animate-spring-pop"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between pb-3 border-b border-[#E3DAC7]">
                            <span className="text-xs font-bold uppercase text-[#C2613A] bg-[#F2ECE0] border border-[#E3DAC7] px-2.5 py-1 rounded">
                                {activeModalPhoto.category}
                            </span>
                            <button
                                type="button"
                                onClick={() => setActiveModalPhoto(null)}
                                className="w-8 h-8 rounded-lg bg-[#F2ECE0] text-piaud-slate hover:bg-[#E3DAC7] border border-[#E3DAC7] flex items-center justify-center font-bold text-sm active:scale-90 transition-transform"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="rounded-xl overflow-hidden border border-[#E3DAC7] shadow-soft">
                            <img
                                src={activeModalPhoto.photoUrl}
                                alt={activeModalPhoto.title}
                                className="w-full max-h-[60vh] object-cover"
                            />
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-serif font-bold text-lg text-piaud-slate">
                                {activeModalPhoto.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                {activeModalPhoto.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
