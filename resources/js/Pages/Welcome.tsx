import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/Components/Public/Navbar';
import { Footer } from '@/Components/Public/Footer';
import { Photo } from '@/Components/Public/Photo';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export default function Welcome() {
    const waPmbLink = createWhatsAppLink(siteConfig.whatsappDefaultMessage);

    return (
        <div className="min-h-screen bg-piaud-ivory text-piaud-slate flex flex-col font-sans selection:bg-piaud-emerald selection:text-white">
            {/* SEO & Meta Tags */}
            <Head>
                <title>{`${siteConfig.programName} - ${siteConfig.institutionName}`}</title>
                <meta
                    name="description"
                    content={`Program Studi S1 PIAUD IAI Persis Bandung. ${siteConfig.hero.description}`}
                />
                <meta property="og:title" content={`${siteConfig.programName} - ${siteConfig.institutionName}`} />
                <meta property="og:description" content={siteConfig.hero.description} />
                <meta property="og:type" content="website" />
            </Head>

            {/* Sections 1 & 2: Top Bar & Navigation */}
            <Navbar />

            <main className="flex-1 w-full animate-fade-in-up">
                {/* 3. HERO SECTION (Warm Ivory & Structured Proportional Layout) */}
                <section className="bg-piaud-ivory border-b border-piaud-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-18 lg:py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                            {/* Left Column (7 cols): Direct Misi & Accreditation Badge */}
                            <div className="lg:col-span-7 space-y-6">

                                <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-piaud-slate tracking-tight leading-tight">
                                    {siteConfig.hero.heading}
                                </h1>

                                <p className="text-base sm:text-lg text-piaud-slate-muted leading-relaxed max-w-[65ch]">
                                    {siteConfig.hero.description}
                                </p>

                                {/* Two CTAs (Solid Crisp Buttons) */}
                                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                    <a
                                        href={waPmbLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center neu-btn-primary text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-xl transition-all duration-150"
                                    >
                                        {siteConfig.hero.ctaPrimaryText}
                                    </a>
                                    <Link
                                        href="/akademik"
                                        className="inline-flex items-center justify-center neu-btn text-piaud-slate text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl transition-all duration-150"
                                    >
                                        {siteConfig.hero.ctaSecondaryText}
                                    </Link>
                                </div>

                                {/* Stats & Features Cards Row (Crisp rounded-md) */}
                                <div className="pt-3 grid grid-cols-3 gap-3 sm:gap-4 text-xs">
                                    <div className="neu-card neu-card-hover rounded-xl p-4">
                                        <span className="font-bold text-piaud-slate block text-xs sm:text-sm">Sarjana (S.Pd.)</span>
                                        <span className="text-piaud-slate-muted text-[11px]">Gelar Lulusan</span>
                                    </div>
                                    <div className="neu-card neu-card-hover rounded-xl p-4">
                                        <span className="font-bold text-piaud-slate block text-xs sm:text-sm">144 SKS (8 Sem)</span>
                                        <span className="text-piaud-slate-muted text-[11px]">Masa Studi</span>
                                    </div>
                                    <div className="neu-card neu-card-hover rounded-xl p-4">
                                        <span className="font-bold text-piaud-slate block text-xs sm:text-sm">Reguler &amp; Guru</span>
                                        <span className="text-piaud-slate-muted text-[11px]">Kelas Kuliah</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (5 cols): Crisp Rounded Photo Frame */}
                            <div className="lg:col-span-5">
                                <figure className="relative neu-card rounded-2xl p-3.5 transition-all duration-200">
                                    <Photo
                                        src={siteConfig.hero.photoUrl}
                                        alt={siteConfig.hero.photoAlt}
                                        priority={true}
                                        aspectRatio="4/3"
                                        className="w-full h-auto rounded-md shadow-soft"
                                    />
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. SAMBUTAN KAPRODI (Warm Cream Alternating Section) */}
                <section id="profil" className="bg-piaud-ivory-dark border-b border-piaud-border py-14 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                            {/* Kaprodi Photo & Profile */}
                            <div className="lg:col-span-4 space-y-4">
                                <figure className="neu-card rounded-2xl p-4">
                                    <Photo
                                        src={siteConfig.kaprodi.photoUrl}
                                        alt={`Foto ${siteConfig.kaprodi.name}`}
                                        aspectRatio="3/4"
                                        className="w-full h-auto rounded-md shadow-soft"
                                    />
                                    <figcaption className="mt-3.5 space-y-1 px-1">
                                        <p className="font-serif font-bold text-base sm:text-lg text-piaud-slate">
                                            {siteConfig.kaprodi.name}
                                        </p>
                                        <p className="text-xs text-piaud-terracotta font-bold">
                                            {siteConfig.kaprodi.title}
                                        </p>
                                        <p className="text-xs text-piaud-slate-muted pt-1 border-t border-piaud-border">
                                            Fakultas Tarbiyah · IAI Persis Bandung
                                        </p>
                                    </figcaption>
                                </figure>
                            </div>

                            {/* Editorial Content */}
                            <div className="lg:col-span-8 space-y-5">
                                <div>
                                    <blockquote className="font-serif text-xl sm:text-2xl text-piaud-slate font-bold leading-relaxed border-l-4 border-piaud-terracotta pl-4">
                                        &ldquo;{siteConfig.kaprodi.pullQuote}&rdquo;
                                    </blockquote>
                                </div>

                                <div className="space-y-3.5 text-sm sm:text-base text-piaud-slate-muted leading-relaxed max-w-[65ch]">
                                    {siteConfig.kaprodi.content.map((paragraph, index) => (
                                        <p key={index}>
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-piaud-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-md bg-piaud-emerald text-piaud-ivory flex items-center justify-center font-serif text-xs font-bold shrink-0">
                                            PS
                                        </div>
                                        <p className="text-xs text-piaud-slate-muted font-medium">
                                            Komitmen kurikulum berbasis Al-Qur'an, As-Sunnah, dan standar keilmuan PAUD modern.
                                        </p>
                                    </div>
                                    <Link
                                        href="/profil"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-piaud-emerald hover:text-piaud-emerald-dark transition-colors shrink-0"
                                    >
                                        <span>Selengkapnya di Profil Prodi</span>
                                        <span>&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. PILAR KEUNGGULAN (Clean Ivory Section with Crisp Cards) */}
                <section id="kurikulum" className="bg-piaud-ivory border-b border-piaud-border py-14 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate leading-tight">
                                Tiga Pilar Pendidikan Holistik Calon Guru AUD
                            </h2>
                            <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                Memastikan setiap lulusan memiliki integritas aqidah yang kokoh, kompetensi pedagogik mutakhir, dan keahlian media belajar aplikatif.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {siteConfig.pillars.map((pillar) => (
                                <div
                                    key={pillar.number}
                                    className="neu-card neu-card-hover rounded-2xl p-6 flex flex-col justify-between group"
                                >
                                    <div className="space-y-3.5">
                                        <div className="w-10 h-10 rounded-md bg-piaud-emerald text-piaud-ivory font-serif text-lg font-bold flex items-center justify-center shadow-soft">
                                            {pillar.number}
                                        </div>
                                        <h3 className="font-serif text-base sm:text-lg font-bold text-piaud-slate group-hover:text-piaud-emerald transition-colors">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                            {pillar.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 mt-5 border-t border-piaud-border space-y-2">
                                        <span className="text-xs font-bold text-piaud-slate block">Fokus Capaian:</span>
                                        <ul className="space-y-1.5 text-xs text-piaud-slate-muted">
                                            {pillar.deliverables.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-piaud-terracotta rounded-full shrink-0"></span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <Link
                                href="/akademik"
                                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-piaud-emerald hover:text-piaud-emerald-dark neu-btn px-6 py-3 rounded-xl transition-all"
                            >
                                <span>Lihat Struktur Kurikulum &amp; Sebaran Mata Kuliah</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 6. DOSEN & TENAGA PENGAJAR (Warm Cream Grid) */}
                <section id="dosen" className="bg-piaud-ivory-dark border-b border-piaud-border py-14 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-3 border-b border-piaud-border">
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Dosen Pengampu &amp; Pakar Tumbuh Kembang
                                </h2>
                            </div>
                            <Link
                                href="/dosen"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-piaud-emerald hover:text-piaud-emerald-dark transition-colors self-start md:self-auto"
                            >
                                <span>Lihat Semua Dosen</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>

                        {/* Crisp Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {siteConfig.lecturers.map((lecturer, index) => (
                                <article
                                    key={index}
                                    className="neu-card neu-card-hover rounded-2xl p-4 group"
                                >
                                    <Photo
                                        src={lecturer.photoUrl}
                                        alt={`Foto ${lecturer.name}`}
                                        aspectRatio="1/1"
                                        className="w-full h-auto rounded-md shadow-soft"
                                    />
                                    <div className="mt-3.5 space-y-1.5">
                                        <span className="text-[11px] font-bold tracking-wider text-piaud-terracotta uppercase block">
                                            {lecturer.role}
                                        </span>
                                        <h3 className="font-serif font-bold text-base text-piaud-slate leading-snug group-hover:text-piaud-emerald transition-colors">
                                            {lecturer.name}
                                        </h3>
                                        <div className="pt-2 border-t border-piaud-border/80 text-xs text-piaud-slate-muted space-y-1">
                                            <p className="font-mono text-[11px] text-slate-500">
                                                NIP: {lecturer.nip}
                                            </p>
                                            <p className="text-piaud-slate font-semibold text-xs">
                                                {lecturer.expertise}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* GALERI DOKUMENTASI (Warm Ivory Grid) */}
                <section id="galeri" className="bg-piaud-ivory border-b border-piaud-border py-14 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-3 border-b border-piaud-border">
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Galeri Praktikum &amp; Observasi Lapangan
                                </h2>
                            </div>
                            <Link
                                href="/galeri"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-piaud-emerald hover:text-piaud-emerald-dark transition-colors self-start md:self-auto"
                            >
                                <span>Buka Galeri Lengkap</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {siteConfig.gallery.map((item, index) => (
                                <figure
                                    key={index}
                                    className="neu-card neu-card-hover rounded-2xl p-3.5 group overflow-hidden"
                                >
                                    <Photo
                                        src={item.photoUrl}
                                        alt={item.title}
                                        aspectRatio="4/3"
                                        className="w-full h-auto rounded-md shadow-soft"
                                    />
                                    <figcaption className="mt-2.5 px-1 space-y-1">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-piaud-terracotta block">
                                            {item.category}
                                        </span>
                                        <h3 className="font-serif font-bold text-sm text-piaud-slate line-clamp-2 leading-snug group-hover:text-piaud-emerald transition-colors">
                                            {item.title}
                                        </h3>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. ARTIKEL PARENTING ISLAMI (Warm Cream Alternating Section) */}
                <section id="artikel" className="bg-piaud-ivory-dark border-b border-piaud-border py-14 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-3 border-b border-piaud-border">
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Artikel Parenting Islami &amp; Khazanah AUD
                                </h2>
                            </div>
                            <Link
                                href="/artikel"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-piaud-emerald hover:text-piaud-emerald-dark transition-colors self-start md:self-auto"
                            >
                                <span>Lihat Semua Artikel</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Featured Article Card */}
                            <article className="lg:col-span-6 neu-card neu-card-hover rounded-2xl p-5 space-y-3.5 group">
                                <Photo
                                    src={siteConfig.articles.featured.photoUrl}
                                    alt={siteConfig.articles.featured.title}
                                    aspectRatio="16/9"
                                    className="w-full h-auto rounded-md shadow-soft"
                                />
                                <div className="space-y-2 px-1">
                                    <div className="flex items-center gap-2 text-xs text-piaud-slate-muted flex-wrap">
                                        <span className="bg-piaud-emerald text-piaud-ivory px-2 py-0.5 rounded font-bold text-[11px]">
                                            {siteConfig.articles.featured.category}
                                        </span>
                                        <span>{siteConfig.articles.featured.publishedAt}</span>
                                        <span>&bull;</span>
                                        <span>{siteConfig.articles.featured.readTime}</span>
                                    </div>
                                    <h3 className="font-serif text-lg sm:text-xl font-bold text-piaud-slate leading-snug group-hover:text-piaud-emerald transition-colors">
                                        {siteConfig.articles.featured.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                        {siteConfig.articles.featured.excerpt}
                                    </p>
                                </div>
                            </article>

                            {/* List Articles Stack */}
                            <div className="lg:col-span-6 space-y-4">
                                {siteConfig.articles.list.map((article) => (
                                    <article
                                        key={article.id}
                                        className="neu-card neu-card-hover rounded-xl p-4 space-y-1.5 group"
                                    >
                                        <div className="flex items-center gap-2 text-xs text-piaud-slate-muted">
                                            <span className="text-piaud-terracotta font-bold text-[11px] bg-amber-100/70 px-2 py-0.5 rounded border border-amber-200/60">
                                                {article.category}
                                            </span>
                                            <span>&bull;</span>
                                            <span>{article.publishedAt}</span>
                                            <span>&bull;</span>
                                            <span>{article.readTime}</span>
                                        </div>
                                        <h3 className="font-serif text-sm sm:text-base font-bold text-piaud-slate leading-snug group-hover:text-piaud-emerald transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-xs text-piaud-slate-muted leading-relaxed line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Section 8: CTA Penutup & Institutional Footer */}
            <Footer />
        </div>
    );
}


