import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/Components/Public/Navbar';
import { Footer } from '@/Components/Public/Footer';
import { Photo } from '@/Components/Public/Photo';
import { FloatingWhatsApp } from '@/Components/Public/FloatingWhatsApp';
import { ScrollProgress } from '@/Components/Public/ScrollProgress';
import { siteConfig } from '@/data/piaud';

interface WelcomeProps {
    dbLecturers?: Array<{
        id?: number;
        name: string;
        nip: string;
        role: string;
        expertise: string;
        photoUrl: string;
    }>;
    dbArticles?: Array<{
        id: string;
        title: string;
        slug: string;
        category: string;
        publishedAt: string;
        readTime: string;
        excerpt: string;
        photoUrl: string;
        isFeatured?: boolean;
    }>;
    dbGalleries?: Array<{
        title: string;
        photoUrl: string;
        category: string;
        date?: string;
        description?: string;
    }>;
    dbQuickLinks?: Array<{
        id: number;
        title: string;
        url: string;
        logoUrl?: string | null;
        showTitle: boolean;
    }>;
}

export default function Welcome({ dbLecturers, dbArticles, dbGalleries, dbQuickLinks }: WelcomeProps) {
    const defaultQuickLinks = [
        {
            id: 1,
            title: 'IAI Persis Bandung',
            url: 'https://iaipibandung.ac.id',
            logoUrl: '/images/logo_kampus.png',
            showTitle: false,
        },
        {
            id: 2,
            title: 'Jurnal PIAUDKU',
            url: 'https://journal.iaipibandung.ac.id/index.php/piaudku/index',
            logoUrl: null,
            showTitle: true,
        },
        {
            id: 3,
            title: 'SIAKAD Kampus',
            url: 'https://siakad.iaipibandung.ac.id',
            logoUrl: null,
            showTitle: true,
        },
        {
            id: 4,
            title: 'E-Library Kampus',
            url: 'https://iaipibandung.ac.id',
            logoUrl: null,
            showTitle: true,
        },
        {
            id: 5,
            title: 'PMB Online',
            url: 'https://pmb.iaipibandung.ac.id',
            logoUrl: null,
            showTitle: true,
        },
    ];

    const displayedQuickLinks = (dbQuickLinks && dbQuickLinks.length > 0)
        ? dbQuickLinks
        : defaultQuickLinks;

    const displayedLecturers = (dbLecturers && dbLecturers.length > 0)
        ? dbLecturers.slice(0, 4)
        : siteConfig.lecturers;

    const displayedGalleries = (dbGalleries && dbGalleries.length > 0)
        ? dbGalleries.slice(0, 4)
        : siteConfig.gallery;

    const featuredArticle = (dbArticles && dbArticles.length > 0)
        ? (dbArticles.find((a) => a.isFeatured) || dbArticles[0])
        : siteConfig.articles.featured;

    const listArticles = (dbArticles && dbArticles.length > 1)
        ? dbArticles.filter((a) => a.id !== featuredArticle.id).slice(0, 2)
        : siteConfig.articles.list;

    // Active in-view state that resets on scroll away and re-animates on scroll into view
    const [inView, setInView] = useState<Record<string, boolean>>({
        hero: true,
    });

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

    return (
        <div className="min-h-screen bg-[#FAF6EC] text-piaud-slate flex flex-col font-sans selection:bg-piaud-emerald selection:text-white">
            {/* SEO & Meta Tags */}
            <Head>
                <title>{`PIAUD | ${siteConfig.institutionName}`}</title>
                <meta
                    name="description"
                    content="Website resmi Program Studi Pendidikan Islam Anak Usia Dini IAI Persis Bandung. Informasi profil, akademik, dosen, penelitian, berita, dan pengumuman."
                />
                <meta property="og:title" content={`PIAUD | ${siteConfig.institutionName}`} />
                <meta property="og:description" content={siteConfig.hero.description} />
                <meta property="og:type" content="website" />
            </Head>

            {/* Navigation */}
            <Navbar />

            <main className="flex-1 w-full">
                {/* 1. HERO SECTION (#beranda) */}
                <section id="beranda" data-section="hero" className="bg-[#FAF6EC] border-b border-[#E3DAC7] relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
                            {/* Left Column (7 cols): Hero Content */}
                            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                                <div className="space-y-4 sm:space-y-5">
                                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F4C3A]">
                                        <span className="w-6 h-[3px] bg-[#C2613A] rounded-sm"></span>
                                        <span>{siteConfig.hero.tagline}</span>
                                    </div>

                                    <h1
                                        className={`font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-piaud-slate tracking-tight leading-[1.15] ${
                                            inView.hero ? 'animate-slide-left' : ''
                                        }`}
                                    >
                                        Mendidik Generasi,<br />
                                        <span className="text-[#0F4C3A]">Menumbuhkan Peradaban.</span>
                                    </h1>

                                    <p
                                        className={`text-base sm:text-lg text-piaud-slate-muted leading-relaxed max-w-[62ch] ${
                                            inView.hero ? 'animate-slide-left delay-1' : ''
                                        }`}
                                    >
                                        {siteConfig.hero.description}
                                    </p>

                                    {/* Action Buttons */}
                                    <div
                                        className={`pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 ${
                                            inView.hero ? 'animate-slide-up delay-2' : ''
                                        }`}
                                    >
                                        <a
                                            href="#profil"
                                            className="group inline-flex items-center justify-center gap-2.5 neu-btn-primary text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-xl cursor-pointer"
                                        >
                                            <span>{siteConfig.hero.ctaPrimaryText}</span>
                                            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out">→</span>
                                        </a>
                                        <a
                                            href="#akademik"
                                            className="group inline-flex items-center justify-center gap-2.5 neu-btn text-piaud-slate text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl cursor-pointer"
                                        >
                                            <span>{siteConfig.hero.ctaSecondaryText}</span>
                                            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out">→</span>
                                        </a>
                                    </div>

                                    {/* Hero Note */}
                                    <p className="text-xs sm:text-sm text-piaud-slate-muted pt-2 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C3A]"></span>
                                        <span>{siteConfig.hero.heroNote}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Right Column (5 cols): Photo & Illustration Card */}
                            <div className={`lg:col-span-5 h-full flex flex-col ${inView.hero ? 'animate-slide-right' : ''}`}>
                                <figure className="relative neu-card card-interactive rounded-2xl p-3 sm:p-4 group overflow-hidden">
                                    <div className="w-full min-h-[300px] sm:min-h-[360px] overflow-hidden rounded-xl border border-[#E3DAC7] relative bg-[#F2ECE0]">
                                        <Photo
                                            src={siteConfig.hero.photoUrl}
                                            alt={siteConfig.hero.photoAlt}
                                            priority={true}
                                            aspectRatio="auto"
                                            className="w-full h-full object-cover rounded-xl shadow-soft"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A3427]/85 to-transparent p-4 sm:p-5 text-white">
                                            <div className="text-lg mb-1">👩🏻‍🏫 📚 🧒🏻</div>
                                            <strong className="block text-sm font-serif font-bold text-white">
                                                Belajar, Bertumbuh, Berakhlak
                                            </strong>
                                            <span className="text-[11px] text-white/80 block mt-0.5">
                                                Mendampingi anak tumbuh dengan ilmu dan akhlak Islami
                                            </span>
                                        </div>
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. QUICK STRIP: FOKUS PROGRAM STUDI & QUICK ACCESS PORTAL */}
                <section data-section="quick-strip" className="bg-white border-b border-[#E3DAC7]">
                    {/* 4 Focus Points Grid */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 lg:divide-x divide-[#E3DAC7]">
                            {siteConfig.focusStrip.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3.5 py-3 lg:py-1 px-2 lg:px-5 first:pl-0">
                                    <div className="w-10 h-10 rounded-xl bg-[#FAF6EC] border border-[#E3DAC7] flex items-center justify-center text-xl shrink-0 shadow-sm">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-0.5">
                                        <strong className="block text-xs sm:text-sm font-bold text-piaud-slate">
                                            {item.title}
                                        </strong>
                                        <small className="block text-[11px] sm:text-xs text-piaud-slate-muted leading-relaxed">
                                            {item.description}
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Access Portal Bar (Pintasan Web Lain) */}
                    <div className="bg-[#F2ECE0] border-t border-[#E3DAC7] py-3.5 sm:py-4">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
                                <div className="flex items-center gap-2 self-start md:self-auto flex-shrink-0">
                                    <span className="w-2 h-2 rounded-full bg-[#0F4C3A]"></span>
                                    <span className="text-[11px] font-bold text-[#0F4C3A] uppercase tracking-wider">Akses Cepat Portal</span>
                                </div>

                                <div className="w-full md:w-auto flex items-center gap-2.5 sm:gap-3 flex-wrap justify-start md:justify-end">
                                    {displayedQuickLinks.map((link) => (
                                        <a
                                            key={link.id}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={link.title}
                                            className="group neu-card card-interactive-sm rounded-lg px-3 py-2 flex items-center gap-2 bg-white border border-[#E3DAC7] hover:border-[#0F4C3A] transition-all cursor-pointer shadow-sm text-xs font-semibold text-[#1B2A2F]"
                                        >
                                            {link.logoUrl ? (
                                                <img
                                                    src={link.logoUrl}
                                                    alt={link.title}
                                                    className="h-5 sm:h-6 w-auto max-w-[80px] object-contain flex-shrink-0 group-hover:scale-105 transition-transform"
                                                />
                                            ) : (
                                                <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-[#0F4C3A] flex-shrink-0"></i>
                                            )}

                                            {link.showTitle && (
                                                <span className="text-[11px] sm:text-xs font-semibold text-[#1B2A2F] group-hover:text-[#0F4C3A] transition-colors whitespace-nowrap">
                                                    {link.title}
                                                </span>
                                            )}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. PROFIL PRODI SECTION (#profil) */}
                <section id="profil" data-section="about" className="bg-[#FAF6EC] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
                            {/* Left Art Card / Visual (5 cols) */}
                            <div className={`lg:col-span-5 ${inView.about ? 'animate-slide-left' : ''}`}>
                                <figure className="neu-card card-interactive rounded-2xl p-4 sm:p-5 group text-center space-y-4">
                                    <div className="bg-[#F2ECE0] border border-[#E3DAC7] rounded-xl p-8 flex flex-col items-center justify-center">
                                        <div className="text-6xl mb-3">🧒🏻📗</div>
                                        <p className="font-serif font-bold text-base text-piaud-slate">
                                            {siteConfig.about.artCaption}
                                        </p>
                                        <p className="text-xs text-piaud-slate-muted mt-1 max-w-[30ch]">
                                            Komitmen mencetak sarjana pendidikan anak usia dini yang berkarakter Islami.
                                        </p>
                                    </div>
                                    <div className="pt-2 text-left">
                                        <p className="text-xs text-[#C2613A] font-bold uppercase tracking-wider">
                                            Fakultas Tarbiyah · IAI Persis Bandung
                                        </p>
                                        <p className="text-xs text-piaud-slate-muted mt-0.5">
                                            Jenjang Sarjana (S1) · Terakreditasi LAMDIK
                                        </p>
                                    </div>
                                </figure>
                            </div>

                            {/* Right Editorial Copy (7 cols) */}
                            <div className={`lg:col-span-7 space-y-5 ${inView.about ? 'animate-slide-right delay-1' : ''}`}>
                                <div className="space-y-3">
                                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F4C3A]">
                                        <span className="w-5 h-[2px] bg-[#C2613A]"></span>
                                        <span>{siteConfig.about.eyebrow}</span>
                                    </div>
                                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-piaud-slate leading-tight">
                                        {siteConfig.about.title}
                                    </h2>
                                </div>

                                <div className="space-y-3.5 text-sm sm:text-base text-piaud-slate-muted leading-relaxed">
                                    {siteConfig.about.description.map((par, pIdx) => (
                                        <p key={pIdx}>{par}</p>
                                    ))}
                                </div>

                                <ul className="space-y-2.5 pt-2">
                                    {siteConfig.about.checklist.map((item, cIdx) => (
                                        <li key={cIdx} className="flex items-start gap-3 text-xs sm:text-sm text-piaud-slate font-medium">
                                            <span className="w-5 h-5 rounded-md bg-[#0F4C3A] text-white flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-4 flex items-center gap-4">
                                    <Link
                                        href={siteConfig.about.ctaHref}
                                        className="group inline-flex items-center gap-2 bg-[#0F4C3A] hover:bg-[#0A3427] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-sm"
                                    >
                                        <span>{siteConfig.about.ctaText}</span>
                                    </Link>
                                    <Link
                                        href="/sambutan-kaprodi"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] transition-colors"
                                    >
                                        <span>Sambutan Kaprodi →</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. LAYANAN PROGRAM STUDI / INFORMASI AKADEMIK (#akademik) */}
                <section id="akademik" data-section="academic" className="bg-[#F2ECE0] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className={`text-center max-w-2xl mx-auto mb-10 space-y-2.5 ${inView.academic ? 'animate-slide-up' : ''}`}>
                            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F4C3A]">
                                <span className="w-5 h-[2px] bg-[#C2613A]"></span>
                                <span>Informasi Akademik</span>
                            </div>
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate leading-tight">
                                Jelajahi Layanan Program Studi
                            </h2>
                            <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                Akses informasi akademik dan kegiatan prodi melalui kategori yang terstruktur.
                            </p>
                        </div>

                        {/* 4 Academic Service Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {siteConfig.academicServices.map((service, sIdx) => {
                                const isExternal = service.href.startsWith('http');
                                const CardWrapper = isExternal ? 'a' : Link;
                                const wrapperProps = isExternal
                                    ? { href: service.href, target: '_blank', rel: 'noopener noreferrer' }
                                    : { href: service.href };

                                return (
                                    <div
                                        key={sIdx}
                                        id={service.id}
                                        className={`h-full ${inView.academic ? `animate-slide-up delay-${sIdx + 1}` : ''}`}
                                    >
                                        <CardWrapper
                                            {...(wrapperProps as any)}
                                            className="neu-card card-interactive rounded-2xl p-6 flex flex-col justify-between group h-full cursor-pointer block"
                                        >
                                            <div className="space-y-3.5">
                                                <div className="w-12 h-12 rounded-xl bg-[#FAF6EC] border border-[#E3DAC7] flex items-center justify-center text-2xl shadow-sm transform group-hover:scale-105 transition-transform duration-300">
                                                    {service.icon}
                                                </div>
                                                <h3 className="font-serif text-base sm:text-lg font-bold text-piaud-slate group-hover:text-[#0F4C3A] transition-colors leading-snug">
                                                    {service.title}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                                    {service.description}
                                                </p>
                                            </div>

                                            <div className="pt-4 mt-4 border-t border-[#E3DAC7] flex items-center justify-between text-xs font-bold text-[#0F4C3A] group-hover:text-[#0A3427]">
                                                <span>Akses Layanan</span>
                                                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                            </div>
                                        </CardWrapper>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 5. PUBLIKASI ILMIAH: JURNAL PIAUDKU (#jurnal-piaud) */}
                <section id="jurnal-piaud" data-section="journal" className="bg-[#FAF6EC] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Solid Deep Emerald Banner Card adhering strictly to UI_GUIDELINES.md */}
                        <div className={`bg-[#0A3427] border border-[#17664F] rounded-2xl p-8 sm:p-12 shadow-[0_12px_28px_rgba(0,0,0,0.30)] text-piaud-ivory relative overflow-hidden ${
                            inView.journal ? 'animate-slide-up' : ''
                        }`}>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                                <div className="lg:col-span-8 space-y-3.5">
                                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F9C928]">
                                        <span className="w-6 h-[3px] bg-[#F9C928] rounded-sm"></span>
                                        <span>{siteConfig.journal.eyebrow}</span>
                                    </div>

                                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                                        {siteConfig.journal.title}
                                    </h2>

                                    <p className="text-sm sm:text-base text-piaud-ivory/90 leading-relaxed max-w-[65ch]">
                                        {siteConfig.journal.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-xs text-piaud-ivory/75 pt-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#F9C928]"></span>
                                        <span>{siteConfig.journal.notice}</span>
                                    </div>
                                </div>

                                <div className="lg:col-span-4 flex lg:justify-end items-center">
                                    <a
                                        href={siteConfig.journal.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center justify-center gap-2 bg-[#FAF6EC] hover:bg-[#F2ECE0] text-[#0F4C3A] text-xs sm:text-sm font-bold px-7 py-4 rounded-xl border border-[#E3DAC7] shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
                                    >
                                        <span>{siteConfig.journal.ctaText}</span>
                                        <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">↗</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. BERITA DAN KEGIATAN (#berita) */}
                <section id="berita" data-section="news" className="bg-[#F2ECE0] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 pb-3 border-b border-[#E3DAC7] ${
                            inView.news ? 'animate-slide-left' : ''
                        }`}>
                            <div className="space-y-1.5">
                                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F4C3A]">
                                    <span className="w-5 h-[2px] bg-[#C2613A]"></span>
                                    <span>Kabar Kampus</span>
                                </div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Berita dan Kegiatan
                                </h2>
                                <p className="text-xs sm:text-sm text-piaud-slate-muted">
                                    Ruang untuk menyampaikan aktivitas akademik, prestasi, agenda, dan pengumuman resmi program studi.
                                </p>
                            </div>
                            <Link
                                href="/artikel"
                                className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] transition-colors self-start md:self-auto cursor-pointer"
                            >
                                <span>Lihat Semua Kabar</span>
                                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out">→</span>
                            </Link>
                        </div>

                        {/* 3 News Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                            {/* Card 1: Featured News */}
                            <div className={`h-full ${inView.news ? 'animate-slide-up delay-1' : ''}`}>
                                <article className="neu-card card-interactive rounded-2xl p-5 flex flex-col justify-between group h-full">
                                    <div className="space-y-3.5">
                                        <div className="overflow-hidden rounded-xl border border-[#E3DAC7] bg-[#FAF6EC] h-44 flex items-center justify-center">
                                            <Photo
                                                src={featuredArticle.photoUrl}
                                                alt={featuredArticle.title}
                                                aspectRatio="16/9"
                                                className="w-full h-full object-cover rounded-xl shadow-soft"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-xs text-piaud-slate-muted">
                                                <span className="bg-[#0F4C3A] text-white px-2.5 py-0.5 rounded-md font-bold text-[11px]">
                                                    {featuredArticle.category}
                                                </span>
                                                <span>{featuredArticle.publishedAt}</span>
                                            </div>
                                            <h3 className="font-serif text-base sm:text-lg font-bold text-piaud-slate leading-snug group-hover:text-[#0F4C3A] transition-colors">
                                                {featuredArticle.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                                {featuredArticle.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-4 mt-3 border-t border-[#E3DAC7]">
                                        <Link
                                            href={`/artikel/${featuredArticle.slug}`}
                                            className="text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] inline-flex items-center gap-1"
                                        >
                                            <span>Baca selengkapnya →</span>
                                        </Link>
                                    </div>
                                </article>
                            </div>

                            {/* Card 2 & 3: List Articles */}
                            {listArticles.map((article, idx) => (
                                <div
                                    key={article.id}
                                    className={`h-full ${inView.news ? `animate-slide-up delay-${idx + 2}` : ''}`}
                                >
                                    <article className="neu-card card-interactive rounded-2xl p-5 flex flex-col justify-between group h-full">
                                        <div className="space-y-3.5">
                                            <div className="overflow-hidden rounded-xl border border-[#E3DAC7] bg-[#FAF6EC] h-44 flex items-center justify-center">
                                                <Photo
                                                    src={article.photoUrl}
                                                    alt={article.title}
                                                    aspectRatio="16/9"
                                                    className="w-full h-full object-cover rounded-xl shadow-soft"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-xs text-piaud-slate-muted">
                                                    <span className="text-[#C2613A] font-bold text-[11px] bg-[#FAF6EC] px-2.5 py-0.5 rounded-md border border-[#E3DAC7]">
                                                        {article.category}
                                                    </span>
                                                    <span>{article.publishedAt}</span>
                                                </div>
                                                <h3 className="font-serif text-base sm:text-lg font-bold text-piaud-slate leading-snug group-hover:text-[#0F4C3A] transition-colors">
                                                    {article.title}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                                    {article.excerpt}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pt-4 mt-3 border-t border-[#E3DAC7]">
                                            <Link
                                                href={`/artikel/${article.slug}`}
                                                className="text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] inline-flex items-center gap-1"
                                            >
                                                <span>Baca selengkapnya →</span>
                                            </Link>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>

                        <p className="text-xs text-piaud-slate-muted mt-6 text-center italic">
                            Konten berita resmi program studi diperbarui secara berkala oleh tim akademik dan humas prodi.
                        </p>
                    </div>
                </section>

                {/* 7. DOSEN & TENAGA PENGAJAR (#dosen) */}
                <section data-section="lecturers" className="bg-[#FAF6EC] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-3 border-b border-[#E3DAC7] ${inView.lecturers ? 'animate-slide-left' : ''}`}>
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Dosen dan Tenaga Pengajar
                                </h2>
                                <p className="text-xs sm:text-sm text-piaud-slate-muted mt-1">
                                    Profil, bidang keahlian, publikasi, dan informasi akademik dosen pengampu PIAUD.
                                </p>
                            </div>
                            <Link
                                href="/dosen"
                                className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] transition-colors self-start md:self-auto cursor-pointer"
                            >
                                <span>Lihat Semua Dosen</span>
                                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out">→</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {displayedLecturers.map((lecturer, index) => (
                                <div
                                    key={index}
                                    className={`h-full ${inView.lecturers ? `animate-slide-up delay-${index + 1}` : ''}`}
                                >
                                    <article className="neu-card card-interactive rounded-2xl p-4 group h-full flex flex-col justify-between">
                                        <div>
                                            <div className="overflow-hidden rounded-xl border border-[#E3DAC7]">
                                                <Photo
                                                    src={lecturer.photoUrl}
                                                    alt={`Foto ${lecturer.name}`}
                                                    aspectRatio="1/1"
                                                    className="w-full h-auto rounded-xl shadow-soft"
                                                />
                                            </div>

                                            <div className="mt-3.5 space-y-1.5">
                                                <span className="text-[11px] font-bold tracking-wider text-[#C2613A] uppercase block transform group-hover:translate-x-1.5 transition-transform duration-200">
                                                    {lecturer.role}
                                                </span>
                                                <h3 className="font-serif font-bold text-base text-piaud-slate leading-snug group-hover:text-[#0F4C3A] transition-colors">
                                                    {lecturer.name}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="pt-2 mt-3 border-t border-[#E3DAC7] text-xs text-piaud-slate-muted space-y-1">
                                            <p className="font-mono text-[11px] text-slate-500">
                                                NIP: {lecturer.nip}
                                            </p>
                                            <p className="text-piaud-slate font-semibold text-xs group-hover:text-[#0F4C3A] transition-colors">
                                                {lecturer.expertise}
                                            </p>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 8. GALERI DOKUMENTASI (#galeri) */}
                <section id="galeri" data-section="gallery" className="bg-[#F2ECE0] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-3 border-b border-[#E3DAC7] ${inView.gallery ? 'animate-slide-left' : ''}`}>
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Galeri Praktikum &amp; Observasi Lapangan
                                </h2>
                                <p className="text-xs sm:text-sm text-piaud-slate-muted mt-1">
                                    Dokumentasi nyata kegiatan pembelajaran, laboratorium APE, dan praktik pengalaman lapangan.
                                </p>
                            </div>
                            <Link
                                href="/galeri"
                                className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] transition-colors self-start md:self-auto cursor-pointer"
                            >
                                <span>Buka Galeri Lengkap</span>
                                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out">→</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {displayedGalleries.map((item, index) => (
                                <div
                                    key={index}
                                    className={`h-full ${inView.gallery ? `animate-slide-up delay-${index + 1}` : ''}`}
                                >
                                    <figure className="neu-card card-interactive rounded-2xl p-3.5 group overflow-hidden h-full flex flex-col justify-between">
                                        <div className="overflow-hidden rounded-xl border border-[#E3DAC7]">
                                            <Photo
                                                src={item.photoUrl}
                                                alt={item.title}
                                                aspectRatio="4/3"
                                                className="w-full h-auto rounded-xl shadow-soft"
                                            />
                                        </div>
                                        <figcaption className="mt-2.5 px-1 space-y-1">
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C2613A] block transform group-hover:translate-x-1.5 transition-transform duration-200">
                                                {item.category}
                                            </span>
                                            <h3 className="font-serif font-bold text-sm text-piaud-slate line-clamp-2 leading-snug group-hover:text-[#0F4C3A] transition-colors">
                                                {item.title}
                                            </h3>
                                        </figcaption>
                                    </figure>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Section 9: Informasi Resmi Program Studi & Footer */}
            <Footer />

            {/* Floating Left: WhatsApp PMB */}
            <FloatingWhatsApp />

            {/* Floating Right: Scroll Progress & Back to Top */}
            <ScrollProgress />
        </div>
    );
}
