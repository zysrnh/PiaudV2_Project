import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Photo } from '@/Components/Public/Photo';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

interface ArticleItem {
    id: string;
    title: string;
    slug: string;
    category: string;
    publishedAt: string;
    readTime: string;
    excerpt: string;
    content?: string;
    photoUrl: string;
    isFeatured?: boolean;
}

interface ArticlesProps {
    dbArticles?: ArticleItem[];
}

export default function Articles({ dbArticles }: ArticlesProps) {
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const waLink = createWhatsAppLink("Halo Admin, saya ingin berlangganan buletin artikel parenting PIAUD IAI Persis Bandung.");

    const allArticles: ArticleItem[] = (dbArticles && dbArticles.length > 0)
        ? dbArticles
        : [
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

    const dynamicCats = Array.from(new Set(allArticles.map((a) => a.category).filter(Boolean)));
    const categories = ['Semua', ...dynamicCats.filter((c) => c !== 'Semua')];

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
            <div className="bg-piaud-emerald-dark text-white py-10 md:py-12 border-b border-piaud-border/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-piaud-ivory/70 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span className="text-piaud-ivory/40">/</span>
                        <span className="text-white font-medium">Artikel &amp; Parenting</span>
                    </nav>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                        Artikel &amp; Khazanah Parenting AUD
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-piaud-ivory/85 max-w-2xl leading-relaxed">
                        Panduan ilmiah pengasuhan fitrah anak, inovasi media loose parts, dan khazanah pendidikan usia emas dari dosen serta mahasiswa PIAUD.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
                {/* Search & Category Filter Bar */}
                <div className="bg-piaud-ivory-dark rounded-lg p-6 border border-piaud-border shadow-soft space-y-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 border ${
                                        selectedCategory === cat
                                            ? 'bg-piaud-emerald text-white border-piaud-emerald shadow-soft font-bold'
                                            : 'bg-piaud-ivory text-piaud-slate hover:bg-white border-piaud-border'
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
                                className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 rounded-md border border-piaud-border bg-piaud-ivory focus:bg-white focus:outline-none focus:ring-1 focus:ring-piaud-emerald focus:border-piaud-emerald transition-all"
                            />
                            <svg
                                className="w-4 h-4 text-piaud-slate-muted absolute left-3 top-2.5 pointer-events-none stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Articles Grid with Staggered Entrance Animation */}
                {filtered.length === 0 ? (
                    <div className="bg-piaud-ivory rounded-lg p-12 text-center border border-piaud-border shadow-soft">
                        <div className="w-14 h-14 mx-auto rounded-xl bg-[#F2ECE0] flex items-center justify-center text-piaud-slate-muted mb-3 border border-[#E3DAC7]">
                            <svg className="w-7 h-7 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        </div>
                        <p className="text-base font-bold text-piaud-slate mt-3">Tidak ada artikel ditemukan</p>
                        <p className="text-xs text-piaud-slate-muted mt-1">Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.</p>
                    </div>
                ) : (
                    <div key={`${selectedCategory}-${searchQuery}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((article, idx) => (
                            <article
                                key={article.id}
                                style={{ animationDelay: `${idx * 45}ms` }}
                                className="animate-table-row bg-piaud-ivory rounded-lg p-5 border border-piaud-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div className="space-y-4">
                                    <div className="overflow-hidden rounded-md border border-piaud-border/60">
                                        <Photo
                                            src={article.photoUrl}
                                            alt={article.title}
                                            aspectRatio="16/9"
                                            className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-200"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-piaud-slate-muted flex-wrap">
                                            <span className="text-[#0F4C3A] text-[11px] font-bold uppercase tracking-wider">
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

                                <div className="pt-4 mt-4 border-t border-piaud-border flex items-center justify-between text-xs">
                                    <span className="text-piaud-slate-muted">{article.publishedAt}</span>
                                    <span className="font-bold text-piaud-emerald group-hover:text-piaud-emerald-dark transition-colors">
                                        Baca Lengkap &rarr;
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* Newsletter Box */}
                <section className="bg-piaud-emerald-dark text-white rounded-lg p-8 sm:p-10 border border-piaud-emerald shadow-card">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="max-w-xl space-y-2">
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
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
                            className="inline-flex items-center justify-center bg-piaud-terracotta hover:bg-piaud-terracotta-dark text-white text-sm font-bold px-6 py-3 rounded-md border border-piaud-terracotta-dark transition-all duration-200 shadow-sm shrink-0"
                        >
                            Gabung Grup Edukasi WA
                        </a>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
