import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Photo } from '@/Components/Public/Photo';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export default function Articles() {
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const waLink = createWhatsAppLink("Halo Admin, saya ingin berlangganan buletin artikel parenting PIAUD IAI Persis Bandung.");

    const allArticles = [
        siteConfig.articles.featured,
        ...siteConfig.articles.list,
        {
            id: "art-4",
            title: "Stimulasi Bahasa Melalui Cerita Bergambar Islami pada Anak Prasekolah",
            slug: "stimulasi-bahasa-cerita-bergambar-islami",
            category: "Psikologi AUD",
            publishedAt: "20 Oktober 2026",
            readTime: "4 menit baca",
            excerpt: "Mengenalkan kosakata akhlak dan teladan para Nabi melalui teknik read-aloud dengan intonasi ramah anak.",
            photoUrl: "/images/piaud/Foto-Kegiatan-2.jpg",
        },
        {
            id: "art-5",
            title: "Membangun Disiplin Positif Tanpa Membentak: Kajian Adab Nabawi",
            slug: "disiplin-positif-tanpa-membentak-kajian-adab",
            category: "Parenting Islami",
            publishedAt: "19 Oktober 2026",
            readTime: "6 menit baca",
            excerpt: "Pendekatan empati dan keteladanan yang diajarkan Rasulullah SAW dalam menghadapi tantrum dan perilaku anak usia dini.",
            photoUrl: "/images/piaud/Foto-Kegiatan-3.jpg",
        },
        {
            id: "art-6",
            title: "Optimalisasi Sensori Motorik dengan Sentra Bahan Alam di PAUD",
            slug: "optimalisasi-sensori-motorik-sentra-bahan-alam",
            category: "Kreativitas APE",
            publishedAt: "18 Oktober 2026",
            readTime: "5 menit baca",
            excerpt: "Pemanfaatan pasir, air, biji-bijian, dan dedaunan kering untuk merangsang reseptor sensori dan kelenturan jari anak.",
            photoUrl: "/images/piaud/Foto-Kegiatan-4.jpg",
        },
    ];

    const categories = ['Semua', 'Parenting Islami', 'Kreativitas APE', 'Akademik & Lab', 'Psikologi AUD'];

    const filtered = allArticles.filter((art) => {
        const matchCategory = selectedCategory === 'Semua' || art.category === selectedCategory;
        const matchQuery =
            art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchQuery;
    });

    return (
        <PublicLayout>
            <Head>
                <title>{`Artikel & Parenting Islami - ${siteConfig.programName} ${siteConfig.institutionName}`}</title>
                <meta
                    name="description"
                    content={`Kumpulan artikel parenting Islami, tips pengasuhan usia dini, panduan APE, dan wawasan akademik dari PIAUD IAI Persis Bandung.`}
                />
            </Head>

            {/* Header Banner with Breadcrumb */}
            <div className="bg-gradient-to-r from-piaud-emerald-dark via-piaud-emerald to-piaud-emerald-light text-white py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-white/80 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span>/</span>
                        <span className="text-white font-semibold">Artikel &amp; Parenting</span>
                    </nav>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                        Artikel &amp; Khazanah Parenting AUD
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                        Panduan ilmiah pengasuhan fitrah anak, inovasi media loose parts, dan khazanah pendidikan usia emas dari dosen serta mahasiswa PIAUD.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
                {/* Search & Category Filter Bar */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card space-y-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                                        selectedCategory === cat
                                            ? 'bg-piaud-emerald text-white shadow-soft font-bold'
                                            : 'bg-slate-100 text-piaud-slate hover:bg-slate-200'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-72">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari topik artikel..."
                                className="w-full text-xs sm:text-sm pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-piaud-emerald focus:border-transparent transition-all"
                            />
                            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
                        </div>
                    </div>
                </div>

                {/* Articles Grid */}
                {filtered.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-soft">
                        <span className="text-4xl">🔍</span>
                        <p className="text-base font-bold text-piaud-slate mt-3">Tidak ada artikel ditemukan</p>
                        <p className="text-xs text-piaud-slate-muted mt-1">Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((article) => (
                            <article
                                key={article.id}
                                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div className="space-y-4">
                                    <Photo
                                        src={article.photoUrl}
                                        alt={article.title}
                                        aspectRatio="16/9"
                                        className="w-full h-auto rounded-xl shadow-soft group-hover:scale-[1.01] transition-transform duration-200"
                                    />

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-piaud-slate-muted flex-wrap">
                                            <span className="bg-emerald-50 text-piaud-emerald px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                                                {article.category}
                                            </span>
                                            <span>&bull;</span>
                                            <span>{article.readTime}</span>
                                        </div>

                                        <h3 className="font-serif font-bold text-base text-piaud-slate leading-snug group-hover:text-piaud-emerald transition-colors">
                                            {article.title}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed line-clamp-3">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                                    <span className="text-slate-400">{article.publishedAt}</span>
                                    <span className="font-bold text-piaud-emerald group-hover:underline">
                                        Baca Lengkap &rarr;
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* Newsletter Box */}
                <section className="bg-gradient-to-r from-piaud-emerald to-piaud-emerald-dark text-white rounded-3xl p-8 sm:p-12 shadow-card-hover">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="max-w-xl space-y-2">
                            <span className="inline-block bg-white/10 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
                                Komunitas Parenting PIAUD
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                                Dapatkan Tips Parenting Islami Mingguan
                            </h2>
                            <p className="text-sm text-white/90 leading-relaxed">
                                Bergabunglah bersama ribuan orang tua dan pendidik RA untuk mendapatkan ringkasan materi pengasuhan ramah anak via WhatsApp resmi prodi.
                            </p>
                        </div>
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-piaud-terracotta hover:bg-piaud-terracotta-dark text-white text-sm font-bold px-6 py-3.5 rounded-xl border border-piaud-terracotta-dark transition-all duration-200 shadow-md shrink-0"
                        >
                            Gabung Grup Edukasi WA
                        </a>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
