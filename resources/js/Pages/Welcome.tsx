import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/Components/Public/Navbar';
import { Footer } from '@/Components/Public/Footer';
import { Photo } from '@/Components/Public/Photo';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export default function Welcome() {
    const waPmbLink = createWhatsAppLink(siteConfig.whatsappDefaultMessage);

    return (
        <div className="min-h-screen bg-slate-50/60 text-piaud-slate flex flex-col font-sans selection:bg-piaud-emerald selection:text-white">
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
                {/* 3. HERO SECTION (Smooth & Attractive with 3D Elements) */}
                <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-slate-50/40 border-b border-piaud-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 lg:py-24">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                            {/* Left Column (7 cols): Direct Misi & Accreditation Badge */}
                            <div className="lg:col-span-7 space-y-6">
                                {/* Accreditation Badge (Pill with Soft 3D Shadow) */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/80 text-xs text-piaud-slate font-semibold rounded-full shadow-soft hover:shadow-md transition-shadow">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span>{siteConfig.accreditation.status} · {siteConfig.accreditation.institution}</span>
                                    <span className="text-piaud-slate-muted hidden sm:inline">
                                        ({siteConfig.accreditation.certificateNumber})
                                    </span>
                                </div>

                                <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-piaud-slate tracking-tight leading-tight">
                                    {siteConfig.hero.heading}
                                </h1>

                                <p className="text-base sm:text-lg text-piaud-slate-muted leading-relaxed max-w-[65ch]">
                                    {siteConfig.hero.description}
                                </p>

                                {/* Two CTAs (3D Elevation + Rounded XL) */}
                                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                    <a
                                        href={waPmbLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center bg-piaud-terracotta hover:bg-piaud-terracotta-dark text-white text-sm font-bold px-7 py-3.5 rounded-xl border border-piaud-terracotta-dark transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-piaud-terracotta"
                                    >
                                        {siteConfig.hero.ctaPrimaryText}
                                    </a>
                                    <Link
                                        href="/akademik"
                                        className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-piaud-slate text-sm font-semibold px-6 py-3.5 rounded-xl border border-slate-200 shadow-soft hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        {siteConfig.hero.ctaSecondaryText}
                                    </Link>
                                </div>

                                {/* Stats & Features Cards Row */}
                                <div className="pt-4 grid grid-cols-3 gap-3 sm:gap-4 text-xs">
                                    <div className="bg-white/90 backdrop-blur-sm border border-slate-100 rounded-2xl p-3.5 shadow-card hover:shadow-card-hover transition-all">
                                        <span className="font-bold text-piaud-slate block text-xs sm:text-sm">Sarjana (S.Pd.)</span>
                                        <span className="text-piaud-slate-muted text-[11px]">Gelar Lulusan</span>
                                    </div>
                                    <div className="bg-white/90 backdrop-blur-sm border border-slate-100 rounded-2xl p-3.5 shadow-card hover:shadow-card-hover transition-all">
                                        <span className="font-bold text-piaud-slate block text-xs sm:text-sm">144 SKS (8 Sem)</span>
                                        <span className="text-piaud-slate-muted text-[11px]">Masa Studi</span>
                                    </div>
                                    <div className="bg-white/90 backdrop-blur-sm border border-slate-100 rounded-2xl p-3.5 shadow-card hover:shadow-card-hover transition-all">
                                        <span className="font-bold text-piaud-slate block text-xs sm:text-sm">Reguler &amp; Guru</span>
                                        <span className="text-piaud-slate-muted text-[11px]">Kelas Kuliah</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (5 cols): 3D Elevated Image Card */}
                            <div className="lg:col-span-5">
                                <figure className="relative bg-white p-3 rounded-3xl border border-slate-100 shadow-card-hover transition-transform duration-300 hover:scale-[1.01]">
                                    <Photo
                                        src={siteConfig.hero.photoUrl}
                                        alt={siteConfig.hero.photoAlt}
                                        priority={true}
                                        aspectRatio="4/3"
                                        className="w-full h-auto rounded-2xl shadow-soft"
                                    />
                                    <figcaption className="mt-3 px-2 text-xs text-piaud-slate-muted flex items-center justify-between font-medium">
                                        <span>Dokumentasi Praktikum Mahasiswa PIAUD</span>
                                        <span className="text-piaud-emerald font-semibold">IAI Persis Bandung</span>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. SAMBUTAN KAPRODI (Attractive Card Container with 3D Depth) */}
                <section id="profil" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 lg:p-14 shadow-card hover:shadow-card-hover transition-all duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                            {/* Kaprodi Photo & Profile */}
                            <div className="lg:col-span-4 space-y-4">
                                <figure className="relative bg-slate-50 p-2.5 rounded-2xl border border-slate-100 shadow-soft">
                                    <Photo
                                        src={siteConfig.kaprodi.photoUrl}
                                        alt={`Foto ${siteConfig.kaprodi.name}`}
                                        aspectRatio="3/4"
                                        className="w-full h-auto rounded-xl shadow-soft"
                                    />
                                    <figcaption className="mt-3.5 space-y-1 px-1">
                                        <p className="font-serif font-bold text-lg text-piaud-slate">
                                            {siteConfig.kaprodi.name}
                                        </p>
                                        <p className="text-xs text-piaud-terracotta font-bold">
                                            {siteConfig.kaprodi.title}
                                        </p>
                                        <p className="text-xs text-piaud-slate-muted pt-1.5 border-t border-slate-100">
                                            Fakultas Tarbiyah · IAI Persis Bandung
                                        </p>
                                    </figcaption>
                                </figure>
                            </div>

                            {/* Editorial Content */}
                            <div className="lg:col-span-8 space-y-6">
                                <div>
                                    <span className="inline-block bg-emerald-50 text-piaud-emerald text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                                        Sambutan Ketua Program Studi
                                    </span>
                                    <blockquote className="font-serif text-2xl sm:text-3xl text-piaud-slate font-bold leading-relaxed">
                                        &ldquo;{siteConfig.kaprodi.pullQuote}&rdquo;
                                    </blockquote>
                                </div>

                                <div className="space-y-4 text-sm sm:text-base text-piaud-slate leading-relaxed max-w-[65ch]">
                                    {siteConfig.kaprodi.content.map((paragraph, index) => (
                                        <p key={index} className="text-piaud-slate-muted">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-piaud-emerald text-white flex items-center justify-center font-serif text-xs font-bold shrink-0 shadow-sm">
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

                {/* 5. PILAR KEUNGGULAN (3D Elevated Interactive Cards Grid) */}
                <section id="kurikulum" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                    <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                        <span className="inline-block bg-amber-50 text-piaud-terracotta text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                            Diferensiasi Akademik
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-piaud-slate leading-tight">
                            Tiga Pilar Pendidikan Holistik Calon Guru AUD
                        </h2>
                        <p className="text-sm text-piaud-slate-muted leading-relaxed">
                            Memastikan setiap lulusan memiliki integritas aqidah yang kokoh, kompetensi pedagogik mutakhir, dan keahlian media belajar aplikatif.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {siteConfig.pillars.map((pillar) => (
                            <div
                                key={pillar.number}
                                className="bg-white rounded-2xl p-7 border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-piaud-emerald font-serif text-xl font-bold flex items-center justify-center shadow-soft group-hover:bg-piaud-emerald group-hover:text-white transition-colors duration-200">
                                        {pillar.number}
                                    </div>
                                    <h3 className="font-serif text-lg font-bold text-piaud-slate group-hover:text-piaud-emerald transition-colors">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-sm text-piaud-slate-muted leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>

                                <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
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

                    <div className="mt-10 text-center">
                        <Link
                            href="/akademik"
                            className="inline-flex items-center gap-2 text-sm font-bold text-piaud-emerald hover:text-piaud-emerald-dark bg-white px-6 py-3 rounded-xl border border-slate-200 shadow-soft hover:shadow-md transition-all"
                        >
                            <span>Lihat Struktur Kurikulum &amp; Sebaran Mata Kuliah</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                </section>

                {/* 6. DOSEN & TENAGA PENGAJAR (Interactive 3D Cards) */}
                <section id="dosen" className="bg-white border-y border-piaud-border py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 pb-4 border-b border-slate-100">
                            <div>
                                <span className="inline-block bg-emerald-50 text-piaud-emerald text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                                    Tenaga Pendidik
                                </span>
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

                        {/* Elevated 3D Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {siteConfig.lecturers.map((lecturer, index) => (
                                <article
                                    key={index}
                                    className="bg-slate-50/70 hover:bg-white rounded-2xl p-4 border border-slate-100 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group"
                                >
                                    <Photo
                                        src={lecturer.photoUrl}
                                        alt={`Foto ${lecturer.name}`}
                                        aspectRatio="1/1"
                                        className="w-full h-auto rounded-xl shadow-soft group-hover:scale-[1.02] transition-transform duration-200"
                                    />
                                    <div className="mt-4 space-y-1.5">
                                        <span className="text-[11px] font-bold tracking-wider text-piaud-terracotta uppercase block">
                                            {lecturer.role}
                                        </span>
                                        <h3 className="font-serif font-bold text-base text-piaud-slate leading-snug group-hover:text-piaud-emerald transition-colors">
                                            {lecturer.name}
                                        </h3>
                                        <div className="pt-2 border-t border-slate-200/60 text-xs text-piaud-slate-muted space-y-1">
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

                {/* GALERI DOKUMENTASI (Elevated Cards with Hover Glow) */}
                <section id="galeri" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
                        <div>
                            <span className="inline-block bg-emerald-50 text-piaud-emerald text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                                Dokumentasi Kegiatan
                            </span>
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
                                className="bg-white rounded-2xl p-3 border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                            >
                                <Photo
                                    src={item.photoUrl}
                                    alt={item.title}
                                    aspectRatio="4/3"
                                    className="w-full h-auto rounded-xl shadow-soft group-hover:scale-105 transition-transform duration-300"
                                />
                                <figcaption className="mt-3 px-1 space-y-1">
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
                </section>

                {/* 7. ARTIKEL PARENTING ISLAMI */}
                <section id="artikel" className="bg-white border-t border-piaud-border py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 pb-4 border-b border-slate-100">
                            <div>
                                <span className="inline-block bg-amber-50 text-piaud-terracotta text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                                    Wawasan &amp; Edukasi
                                </span>
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
                            <article className="lg:col-span-6 bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 space-y-4 group">
                                <Photo
                                    src={siteConfig.articles.featured.photoUrl}
                                    alt={siteConfig.articles.featured.title}
                                    aspectRatio="16/9"
                                    className="w-full h-auto rounded-xl shadow-soft group-hover:scale-[1.01] transition-transform duration-200"
                                />
                                <div className="space-y-2.5 px-1">
                                    <div className="flex items-center gap-2.5 text-xs text-piaud-slate-muted flex-wrap">
                                        <span className="bg-piaud-emerald text-white px-2.5 py-0.5 rounded-full font-bold text-xs shadow-soft">
                                            {siteConfig.articles.featured.category}
                                        </span>
                                        <span>{siteConfig.articles.featured.publishedAt}</span>
                                        <span>&bull;</span>
                                        <span>{siteConfig.articles.featured.readTime}</span>
                                    </div>
                                    <h3 className="font-serif text-lg sm:text-xl font-bold text-piaud-slate leading-snug group-hover:text-piaud-emerald transition-colors">
                                        {siteConfig.articles.featured.title}
                                    </h3>
                                    <p className="text-sm text-piaud-slate-muted leading-relaxed">
                                        {siteConfig.articles.featured.excerpt}
                                    </p>
                                </div>
                            </article>

                            {/* List Articles (Elevated Cards Stack) */}
                            <div className="lg:col-span-6 space-y-4">
                                {siteConfig.articles.list.map((article) => (
                                    <article
                                        key={article.id}
                                        className="bg-slate-50/70 hover:bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 space-y-2 group"
                                    >
                                        <div className="flex items-center gap-2 text-xs text-piaud-slate-muted">
                                            <span className="text-piaud-terracotta font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-full">
                                                {article.category}
                                            </span>
                                            <span>&bull;</span>
                                            <span>{article.publishedAt}</span>
                                            <span>&bull;</span>
                                            <span>{article.readTime}</span>
                                        </div>
                                        <h3 className="font-serif text-base font-bold text-piaud-slate leading-snug group-hover:text-piaud-emerald transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed line-clamp-2">
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

