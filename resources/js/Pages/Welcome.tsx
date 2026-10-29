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
    homeSettings?: Record<string, string>;
}

export default function Welcome({ dbLecturers, dbArticles, dbGalleries, dbQuickLinks, homeSettings }: WelcomeProps) {
    // Dynamic values from database with clean fallbacks
    const heroTagline = homeSettings?.home_hero_tagline || siteConfig.hero.tagline;
    const heroHeading = homeSettings?.home_hero_heading || siteConfig.hero.heading;
    const heroDesc = homeSettings?.home_hero_desc || siteConfig.hero.description;
    const heroCta1Text = homeSettings?.home_hero_cta1_text || siteConfig.hero.ctaPrimaryText;
    const heroCta2Text = homeSettings?.home_hero_cta2_text || siteConfig.hero.ctaSecondaryText;
    const heroNote = homeSettings?.home_hero_note || siteConfig.hero.heroNote;

    const aboutTitle = homeSettings?.home_about_title || siteConfig.about.title;
    const aboutP1 = homeSettings?.home_about_p1 || siteConfig.about.description[0];
    const aboutP2 = homeSettings?.home_about_p2 || siteConfig.about.description[1];
    const aboutChecklist = [
        homeSettings?.home_about_check1 || siteConfig.about.checklist[0],
        homeSettings?.home_about_check2 || siteConfig.about.checklist[1],
        homeSettings?.home_about_check3 || siteConfig.about.checklist[2],
    ];

    const journalTitle = homeSettings?.home_journal_title || siteConfig.journal.title;
    const journalDesc = homeSettings?.home_journal_desc || siteConfig.journal.description;
    const journalUrl = homeSettings?.home_journal_url || siteConfig.journal.url;

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

    // Active in-view state for smooth animations
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

    // Clean professional SVG icons for academic services
    const services = [
        {
            title: "Kurikulum & SKS",
            desc: "Struktur mata kuliah, capaian pembelajaran, dan pedoman akademik sarjana.",
            href: "/akademik#kurikulum",
            icon: (
                <svg className="w-5 h-5 text-[#0F4C3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
        },
        {
            title: "Dosen & Pengajar",
            desc: "Profil dosen berkompetensi pedagogik, keislaman, dan riset perkembangan anak.",
            href: "/dosen",
            icon: (
                <svg className="w-5 h-5 text-[#0F4C3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
        },
        {
            title: "Penelitian & Pengabdian",
            desc: "Publikasi ilmiah, riset terapan parenting Islami, dan pengabdian masyarakat.",
            href: journalUrl,
            icon: (
                <svg className="w-5 h-5 text-[#0F4C3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
        },
        {
            title: "Dokumen & Akreditasi",
            desc: "Pedoman akademik, sertifikasi mutu LAMDIK, dan transparansi institusi.",
            href: "/profil",
            icon: (
                <svg className="w-5 h-5 text-[#0F4C3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-[#FAF6EC] text-piaud-slate flex flex-col font-sans selection:bg-piaud-emerald selection:text-white">
            <Head>
                <title>{`PIAUD | ${siteConfig.institutionName}`}</title>
                <meta
                    name="description"
                    content="Website resmi Program Studi Pendidikan Islam Anak Usia Dini IAI Persis Bandung. Informasi profil, akademik, dosen, penelitian, berita, dan pengumuman."
                />
                <meta property="og:title" content={`PIAUD | ${siteConfig.institutionName}`} />
                <meta property="og:description" content={heroDesc} />
                <meta property="og:type" content="website" />
            </Head>

            <Navbar />

            <main className="flex-1 w-full">
                {/* 1. HERO SECTION (#beranda) - Bersih & Berwibawa */}
                <section id="beranda" data-section="hero" className="bg-[#FAF6EC] border-b border-[#E3DAC7]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 md:py-22">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                            {/* Left Column (7 cols) */}
                            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F4C3A]">
                                        <span className="w-6 h-[2px] bg-[#C2613A]"></span>
                                        <span>{heroTagline}</span>
                                    </div>

                                    <h1
                                        className={`font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-piaud-slate tracking-tight leading-[1.18] ${
                                            inView.hero ? 'animate-slide-left' : ''
                                        }`}
                                    >
                                        {heroHeading}
                                    </h1>

                                    <p
                                        className={`text-base sm:text-lg text-piaud-slate-muted leading-relaxed max-w-[58ch] ${
                                            inView.hero ? 'animate-slide-left delay-1' : ''
                                        }`}
                                    >
                                        {heroDesc}
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
                                            <span>{heroCta1Text}</span>
                                            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out">→</span>
                                        </a>
                                        <a
                                            href="#akademik"
                                            className="group inline-flex items-center justify-center gap-2.5 neu-btn text-piaud-slate text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl cursor-pointer"
                                        >
                                            <span>{heroCta2Text}</span>
                                            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out">→</span>
                                        </a>
                                    </div>

                                    <p className="text-xs sm:text-sm text-piaud-slate-muted pt-2 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C3A]"></span>
                                        <span>{heroNote}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Right Column (5 cols): Foto Kegiatan Kampus Nyata (Clean & Elegant) */}
                            <div className={`lg:col-span-5 ${inView.hero ? 'animate-slide-right' : ''}`}>
                                <figure className="neu-card card-interactive rounded-2xl p-3 sm:p-4 group overflow-hidden">
                                    <div className="w-full min-h-[300px] sm:min-h-[360px] overflow-hidden rounded-xl border border-[#E3DAC7] bg-[#F2ECE0]">
                                        <Photo
                                            src={siteConfig.hero.photoUrl}
                                            alt={siteConfig.hero.photoAlt}
                                            priority={true}
                                            aspectRatio="auto"
                                            className="w-full h-full object-cover rounded-xl shadow-soft"
                                        />
                                    </div>
                                    <figcaption className="mt-3 px-1 text-center">
                                        <p className="text-xs text-piaud-slate font-semibold">
                                            Praktikum &amp; Pembelajaran Interaktif Mahasiswa S1 PIAUD
                                        </p>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. AKSES CEPAT PORTAL (Sleek Single Strip, Tanpa Strip Bertumpuk) */}
                <section data-section="quick-links" className="bg-[#F2ECE0] border-b border-[#E3DAC7] py-3.5 sm:py-4">
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
                                            <svg className="w-3 h-3 text-[#0F4C3A] opacity-75 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
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
                </section>

                {/* 3. PROFIL PRODI: MENGENAL PIAUD (Lega, Bersih, Foto Nyata, Tanpa Kotak-dalam-Kotak) */}
                <section id="profil" data-section="about" className="bg-[#FAF6EC] border-b border-[#E3DAC7] py-16 sm:py-20 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                            {/* Left Column (5 cols): Foto Mahasiswa/Kampus Resmi */}
                            <div className={`lg:col-span-5 ${inView.about ? 'animate-slide-left' : ''}`}>
                                <figure className="neu-card card-interactive rounded-2xl p-4 group overflow-hidden">
                                    <div className="overflow-hidden rounded-xl border border-[#E3DAC7]">
                                        <Photo
                                            src="/images/piaud/Foto-Kegiatan-2.jpg"
                                            alt="Kegiatan Pembelajaran Mahasiswa PIAUD"
                                            aspectRatio="4/3"
                                            className="w-full h-auto rounded-xl shadow-soft"
                                        />
                                    </div>
                                    <figcaption className="mt-3.5 space-y-1 px-1">
                                        <p className="font-serif font-bold text-sm sm:text-base text-piaud-slate">
                                            Mendampingi Anak Tumbuh dengan Ilmu &amp; Akhlak
                                        </p>
                                        <p className="text-xs text-piaud-slate-muted">
                                            Fakultas Tarbiyah · IAI Persis Bandung (Terakreditasi Baik LAMDIK)
                                        </p>
                                    </figcaption>
                                </figure>
                            </div>

                            {/* Right Editorial Copy (7 cols): Spasi Lega & Nyaman Dibaca */}
                            <div className={`lg:col-span-7 space-y-6 ${inView.about ? 'animate-slide-right delay-1' : ''}`}>
                                <div className="space-y-3">
                                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F4C3A]">
                                        <span className="w-5 h-[2px] bg-[#C2613A]"></span>
                                        <span>Tentang Kami</span>
                                    </div>

                                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-piaud-slate leading-tight">
                                        {aboutTitle}
                                    </h2>
                                </div>

                                <div className="space-y-4 text-sm sm:text-base text-piaud-slate-muted leading-relaxed">
                                    <p>{aboutP1}</p>
                                    <p>{aboutP2}</p>
                                </div>

                                {/* 3 Checklist Items Bersih */}
                                <ul className="space-y-2.5 pt-1">
                                    {aboutChecklist.map((item, cIdx) => (
                                        <li key={cIdx} className="flex items-start gap-3 text-xs sm:text-sm text-piaud-slate font-medium">
                                            <span className="w-5 h-5 rounded-full bg-[#0F4C3A] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                                                ✓
                                            </span>
                                            <span className="leading-snug">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-3 flex items-center gap-4">
                                    <Link
                                        href="/profil"
                                        className="group inline-flex items-center gap-2 bg-[#0F4C3A] hover:bg-[#0A3427] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-sm"
                                    >
                                        <span>Lihat Profil Lengkap</span>
                                        <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">→</span>
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

                {/* 4. LAYANAN PROGRAM STUDI (Minimalis, Icon Vektor Bersih, Tidak Berisik) */}
                <section id="akademik" data-section="academic" className="bg-[#F2ECE0] border-b border-[#E3DAC7] py-16 sm:py-20 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className={`text-center max-w-2xl mx-auto mb-12 space-y-2.5 ${inView.academic ? 'animate-slide-up' : ''}`}>
                            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F4C3A]">
                                <span className="w-5 h-[2px] bg-[#C2613A]"></span>
                                <span>Informasi Akademik</span>
                            </div>
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate leading-tight">
                                Jelajahi Layanan Program Studi
                            </h2>
                            <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                Informasi terstruktur seputar kurikulum, profil dosen pengampu, penelitian, dan dokumen mutu.
                            </p>
                        </div>

                        {/* 4 Clean Minimalist Academic Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {services.map((item, sIdx) => {
                                const isExternal = item.href.startsWith('http');
                                const CardLink = isExternal ? 'a' : Link;
                                const linkProps = isExternal
                                    ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
                                    : { href: item.href };

                                return (
                                    <div
                                        key={sIdx}
                                        className={`h-full ${inView.academic ? `animate-slide-up delay-${sIdx + 1}` : ''}`}
                                    >
                                        <CardLink
                                            {...(linkProps as any)}
                                            className="neu-card card-interactive rounded-2xl p-6 group h-full flex flex-col justify-between cursor-pointer bg-white"
                                        >
                                            <div className="space-y-4">
                                                <div className="w-11 h-11 rounded-xl bg-[#FAF6EC] border border-[#E3DAC7] flex items-center justify-center shrink-0">
                                                    {item.icon}
                                                </div>
                                                <div className="space-y-1.5">
                                                    <h3 className="font-serif text-base font-bold text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-xs text-piaud-slate-muted leading-relaxed">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="pt-4 mt-4 border-t border-[#E3DAC7] flex items-center text-xs font-bold text-[#0F4C3A] group-hover:text-[#0A3427]">
                                                <span>Buka Layanan</span>
                                                <span className="transform group-hover:translate-x-1 transition-transform ml-1">→</span>
                                            </div>
                                        </CardLink>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 5. PUBLIKASI ILMIAH: JURNAL PIAUDKU (Banner Hijau Tua Solid Berwibawa) */}
                <section id="jurnal-piaud" data-section="journal" className="bg-[#FAF6EC] border-b border-[#E3DAC7] py-14 sm:py-18">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className={`bg-[#0A3427] border border-[#17664F] rounded-2xl p-8 sm:p-12 shadow-[0_12px_28px_rgba(0,0,0,0.30)] text-piaud-ivory relative overflow-hidden ${
                            inView.journal ? 'animate-slide-up' : ''
                        }`}>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                                <div className="lg:col-span-8 space-y-3">
                                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F9C928]">
                                        <span className="w-5 h-[2px] bg-[#F9C928]"></span>
                                        <span>Publikasi Ilmiah</span>
                                    </div>

                                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                                        {journalTitle}
                                    </h2>

                                    <p className="text-sm text-piaud-ivory/90 leading-relaxed max-w-[65ch]">
                                        {journalDesc}
                                    </p>

                                    <p className="text-xs text-piaud-ivory/70 pt-1">
                                        Portal jurnal dikelola pada sistem jurnal OJS terpisah dan akan terbuka di tab baru.
                                    </p>
                                </div>

                                <div className="lg:col-span-4 flex lg:justify-end items-center">
                                    <a
                                        href={journalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center justify-center gap-2 bg-[#FAF6EC] hover:bg-[#F2ECE0] text-[#0F4C3A] text-xs sm:text-sm font-bold px-7 py-4 rounded-xl border border-[#E3DAC7] shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
                                    >
                                        <span>Kunjungi Jurnal PIAUDKU</span>
                                        <svg className="w-3.5 h-3.5 stroke-current stroke-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. BERITA DAN KEGIATAN (#berita) */}
                <section id="berita" data-section="news" className="bg-[#F2ECE0] border-b border-[#E3DAC7] py-16 sm:py-20 md:py-24">
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
                                    Aktivitas akademik, prestasi mahasiswa, agenda perkuliahan, dan pengumuman resmi program studi.
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
                                <article className="neu-card card-interactive rounded-2xl p-5 flex flex-col justify-between group h-full bg-white">
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
                                    <article className="neu-card card-interactive rounded-2xl p-5 flex flex-col justify-between group h-full bg-white">
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
                    </div>
                </section>

                {/* 7. DOSEN & TENAGA PENGAJAR (#dosen) */}
                <section data-section="lecturers" className="bg-[#FAF6EC] border-b border-[#E3DAC7] py-16 sm:py-20 md:py-24">
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
                                    <article className="neu-card card-interactive rounded-2xl p-4 group h-full flex flex-col justify-between bg-white">
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
                <section id="galeri" data-section="gallery" className="bg-[#F2ECE0] border-b border-[#E3DAC7] py-16 sm:py-20 md:py-24">
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
                                    <figure className="neu-card card-interactive rounded-2xl p-3.5 group overflow-hidden h-full flex flex-col justify-between bg-white">
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

            <Footer />
            <FloatingWhatsApp />
            <ScrollProgress />
        </div>
    );
}
