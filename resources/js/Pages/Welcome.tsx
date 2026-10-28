import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/Components/Public/Navbar';
import { Footer } from '@/Components/Public/Footer';
import { Photo } from '@/Components/Public/Photo';
import { FloatingWhatsApp } from '@/Components/Public/FloatingWhatsApp';
import { ScrollProgress } from '@/Components/Public/ScrollProgress';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export default function Welcome() {
    const waPmbLink = createWhatsAppLink(siteConfig.whatsappDefaultMessage);

    // Mount state for initial page load animation
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 60);
        return () => clearTimeout(timer);
    }, []);

    // Stable In-View Scroll Observer (Bold Entrance & Solid Visibility on Scroll Up)
    const [inViewSections, setInViewSections] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const sectionId = entry.target.getAttribute('data-section');
                    if (sectionId && entry.isIntersecting) {
                        setInViewSections((prev) => ({ ...prev, [sectionId]: true }));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        const observedElements = document.querySelectorAll('[data-section]');
        observedElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-[#FAF6EC] text-piaud-slate flex flex-col font-sans selection:bg-piaud-emerald selection:text-white">
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

            <main className="flex-1 w-full">
                {/* 3. HERO SECTION (Warm Ivory & Structured Proportional Layout) */}
                <section className="bg-[#FAF6EC] border-b border-[#E3DAC7] overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-18 lg:py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-stretch">
                            {/* Left Column (7 cols): Bold Slide-Left Entrance on Mount */}
                            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                                <div className="space-y-5 sm:space-y-6">
                                    <h1
                                        className={`font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-piaud-slate tracking-tight leading-tight scroll-item ${
                                            isMounted ? 'scroll-item-visible' : 'scroll-item-hidden-left'
                                        }`}
                                    >
                                        {siteConfig.hero.heading}
                                    </h1>

                                    <p
                                        className={`text-sm sm:text-base md:text-lg text-piaud-slate-muted leading-relaxed max-w-[65ch] scroll-item stagger-1 ${
                                            isMounted ? 'scroll-item-visible' : 'scroll-item-hidden-left'
                                        }`}
                                    >
                                        {siteConfig.hero.description}
                                    </p>

                                    {/* Two CTAs with Animated Mount & Tactile Hover Physics */}
                                    <div
                                        className={`pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 scroll-item stagger-2 ${
                                            isMounted ? 'scroll-item-visible' : 'scroll-item-hidden-up'
                                        }`}
                                    >
                                        <a
                                            href={waPmbLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center justify-center gap-2 neu-btn-primary text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-xl transition-all duration-150 tactile-press"
                                        >
                                            <span>{siteConfig.hero.ctaPrimaryText}</span>
                                            <span className="transform group-hover:translate-x-2 transition-transform duration-200">→</span>
                                        </a>
                                        <Link
                                            href="/akademik"
                                            className="group inline-flex items-center justify-center gap-2 neu-btn text-piaud-slate text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl transition-all duration-150 tactile-press"
                                        >
                                            <span>{siteConfig.hero.ctaSecondaryText}</span>
                                            <span className="transform group-hover:translate-x-2 transition-transform duration-200">→</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Stats & Features Cards Row with Interactive Hover & Stagger */}
                                <div className="pt-4 grid grid-cols-3 gap-2.5 sm:gap-4 text-xs">
                                    <div
                                        className={`neu-card card-interactive rounded-xl p-3 sm:p-4 flex flex-col justify-center group scroll-item stagger-1 ${
                                            isMounted ? 'scroll-item-visible' : 'scroll-item-hidden-up'
                                        }`}
                                    >
                                        <span className="font-bold text-piaud-slate block text-xs sm:text-sm group-hover:text-[#0F4C3A] transition-colors">Sarjana (S.Pd.)</span>
                                        <span className="text-piaud-slate-muted text-[10px] sm:text-[11px] group-hover:text-[#C2613A] transition-colors">Gelar Lulusan</span>
                                    </div>
                                    <div
                                        className={`neu-card card-interactive rounded-xl p-3 sm:p-4 flex flex-col justify-center group scroll-item stagger-2 ${
                                            isMounted ? 'scroll-item-visible' : 'scroll-item-hidden-up'
                                        }`}
                                    >
                                        <span className="font-bold text-piaud-slate block text-xs sm:text-sm group-hover:text-[#0F4C3A] transition-colors">144 SKS (8 Sem)</span>
                                        <span className="text-piaud-slate-muted text-[10px] sm:text-[11px] group-hover:text-[#C2613A] transition-colors">Masa Studi</span>
                                    </div>
                                    <div
                                        className={`neu-card card-interactive rounded-xl p-3 sm:p-4 flex flex-col justify-center group scroll-item stagger-3 ${
                                            isMounted ? 'scroll-item-visible' : 'scroll-item-hidden-up'
                                        }`}
                                    >
                                        <span className="font-bold text-piaud-slate block text-xs sm:text-sm group-hover:text-[#0F4C3A] transition-colors">Reguler &amp; Guru</span>
                                        <span className="text-piaud-slate-muted text-[10px] sm:text-[11px] group-hover:text-[#C2613A] transition-colors">Kelas Kuliah</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (5 cols): Photo Frame with Slide-Right Entrance & Zoom Hover */}
                            <div className="lg:col-span-5 h-full flex flex-col">
                                <figure
                                    className={`relative neu-card card-interactive rounded-2xl p-3 sm:p-3.5 h-full flex flex-col justify-center group overflow-hidden scroll-item ${
                                        isMounted ? 'scroll-item-visible' : 'scroll-item-hidden-right'
                                    }`}
                                >
                                    <div className="w-full h-full min-h-[280px] sm:min-h-[340px] lg:min-h-full overflow-hidden rounded-xl">
                                        <Photo
                                            src={siteConfig.hero.photoUrl}
                                            alt={siteConfig.hero.photoAlt}
                                            priority={true}
                                            aspectRatio="auto"
                                            className="w-full h-full object-cover rounded-xl shadow-soft img-hover-zoom"
                                        />
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. SAMBUTAN KAPRODI (Warm Cream Alternating Section) */}
                <section
                    id="profil"
                    data-section="kaprodi"
                    className="bg-[#F2ECE0] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20 overflow-hidden"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
                            {/* Kaprodi Photo & Profile with Bold Slide-Left */}
                            <div
                                className={`lg:col-span-4 space-y-4 scroll-item ${
                                    inViewSections.kaprodi ? 'scroll-item-visible' : 'scroll-item-hidden-left'
                                }`}
                            >
                                <figure className="neu-card card-interactive rounded-2xl p-4 group">
                                    <div className="overflow-hidden rounded-xl">
                                        <Photo
                                            src={siteConfig.kaprodi.photoUrl}
                                            alt={`Foto ${siteConfig.kaprodi.name}`}
                                            aspectRatio="3/4"
                                            className="w-full h-auto rounded-xl shadow-soft img-hover-zoom"
                                        />
                                    </div>
                                    <figcaption className="mt-3.5 space-y-1 px-1">
                                        <p className="font-serif font-bold text-base sm:text-lg text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                            {siteConfig.kaprodi.name}
                                        </p>
                                        <p className="text-xs text-[#C2613A] font-bold">
                                            {siteConfig.kaprodi.title}
                                        </p>
                                        <p className="text-xs text-piaud-slate-muted pt-1 border-t border-[#E3DAC7]">
                                            Fakultas Tarbiyah · IAI Persis Bandung
                                        </p>
                                    </figcaption>
                                </figure>
                            </div>

                            {/* Editorial Content with Bold Slide-Right */}
                            <div
                                className={`lg:col-span-8 space-y-5 scroll-item stagger-1 ${
                                    inViewSections.kaprodi ? 'scroll-item-visible' : 'scroll-item-hidden-right'
                                }`}
                            >
                                <div>
                                    <blockquote className="font-serif text-xl sm:text-2xl text-piaud-slate font-bold leading-relaxed border-l-4 border-[#C2613A] pl-4">
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

                                <div className="pt-4 border-t border-[#E3DAC7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#0F4C3A] text-white flex items-center justify-center font-serif text-xs font-bold shrink-0 shadow-sm">
                                            PS
                                        </div>
                                        <p className="text-xs text-piaud-slate-muted font-medium">
                                            Komitmen kurikulum berbasis Al-Qur'an, As-Sunnah, dan standar keilmuan PAUD modern.
                                        </p>
                                    </div>
                                    <Link
                                        href="/profil"
                                        className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] transition-colors shrink-0 tactile-press"
                                    >
                                        <span>Selengkapnya di Profil Prodi</span>
                                        <span className="transform group-hover:translate-x-2 transition-transform duration-200">&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. PILAR KEUNGGULAN (Clean Ivory Section with Staggered Scroll Cards) */}
                <section
                    id="kurikulum"
                    data-section="pillars"
                    className="bg-[#FAF6EC] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20 overflow-hidden"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div
                            className={`text-center max-w-2xl mx-auto mb-10 space-y-2 scroll-item ${
                                inViewSections.pillars ? 'scroll-item-visible' : 'scroll-item-hidden-up'
                            }`}
                        >
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate leading-tight">
                                Tiga Pilar Pendidikan Holistik Calon Guru AUD
                            </h2>
                            <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                Memastikan setiap lulusan memiliki integritas aqidah yang kokoh, kompetensi pedagogik mutakhir, dan keahlian media belajar aplikatif.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {siteConfig.pillars.map((pillar, idx) => (
                                <div
                                    key={pillar.number}
                                    className={`neu-card card-interactive rounded-2xl p-6 flex flex-col justify-between group scroll-item stagger-${idx + 1} ${
                                        inViewSections.pillars ? 'scroll-item-visible' : 'scroll-item-hidden-up'
                                    }`}
                                >
                                    <div className="space-y-3.5">
                                        <div className="w-10 h-10 rounded-xl bg-[#0F4C3A] text-white font-serif text-lg font-bold flex items-center justify-center shadow-soft transform group-hover:scale-115 group-hover:rotate-6 transition-transform duration-250">
                                            {pillar.number}
                                        </div>
                                        <h3 className="font-serif text-base sm:text-lg font-bold text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                            {pillar.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 mt-5 border-t border-[#E3DAC7] space-y-2">
                                        <span className="text-xs font-bold text-piaud-slate block">Fokus Capaian:</span>
                                        <ul className="space-y-1.5 text-xs text-piaud-slate-muted">
                                            {pillar.deliverables.map((item, dIdx) => (
                                                <li key={dIdx} className="flex items-center gap-2 transform group-hover:translate-x-2 transition-transform duration-150">
                                                    <span className="w-1.5 h-1.5 bg-[#C2613A] rounded-full shrink-0"></span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            className={`mt-8 text-center scroll-item stagger-4 ${
                                inViewSections.pillars ? 'scroll-item-visible' : 'scroll-item-hidden-up'
                            }`}
                        >
                            <Link
                                href="/akademik"
                                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F4C3A] hover:text-[#0A3427] neu-btn px-6 py-3.5 rounded-xl transition-all tactile-press"
                            >
                                <span>Lihat Struktur Kurikulum &amp; Sebaran Mata Kuliah</span>
                                <span className="transform group-hover:translate-x-2 transition-transform duration-200">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 6. DOSEN & TENAGA PENGAJAR (Warm Cream Grid with Staggered Scroll Cards) */}
                <section
                    id="dosen"
                    data-section="lecturers"
                    className="bg-[#F2ECE0] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20 overflow-hidden"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div
                            className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-3 border-b border-[#E3DAC7] scroll-item ${
                                inViewSections.lecturers ? 'scroll-item-visible' : 'scroll-item-hidden-left'
                            }`}
                        >
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Dosen Pengampu &amp; Pakar Tumbuh Kembang
                                </h2>
                            </div>
                            <Link
                                href="/dosen"
                                className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] transition-colors self-start md:self-auto tactile-press"
                            >
                                <span>Lihat Semua Dosen</span>
                                <span className="transform group-hover:translate-x-2 transition-transform duration-200">&rarr;</span>
                            </Link>
                        </div>

                        {/* Crisp Responsive Cards Grid with Staggered Motion */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {siteConfig.lecturers.map((lecturer, index) => (
                                <article
                                    key={index}
                                    className={`neu-card card-interactive rounded-2xl p-4 group scroll-item stagger-${index + 1} ${
                                        inViewSections.lecturers ? 'scroll-item-visible' : 'scroll-item-hidden-up'
                                    }`}
                                >
                                    <div className="overflow-hidden rounded-xl border border-[#E3DAC7]">
                                        <Photo
                                            src={lecturer.photoUrl}
                                            alt={`Foto ${lecturer.name}`}
                                            aspectRatio="1/1"
                                            className="w-full h-auto rounded-xl shadow-soft img-hover-zoom"
                                        />
                                    </div>

                                    <div className="mt-3.5 space-y-1.5">
                                        <span className="text-[11px] font-bold tracking-wider text-[#C2613A] uppercase block transform group-hover:translate-x-1 transition-transform">
                                            {lecturer.role}
                                        </span>
                                        <h3 className="font-serif font-bold text-base text-piaud-slate leading-snug group-hover:text-[#0F4C3A] transition-colors">
                                            {lecturer.name}
                                        </h3>
                                        <div className="pt-2 border-t border-[#E3DAC7] text-xs text-piaud-slate-muted space-y-1">
                                            <p className="font-mono text-[11px] text-slate-500">
                                                NIP: {lecturer.nip}
                                            </p>
                                            <p className="text-piaud-slate font-semibold text-xs group-hover:text-[#0F4C3A] transition-colors">
                                                {lecturer.expertise}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* GALERI DOKUMENTASI (Warm Ivory Grid with Staggered Scroll Motion) */}
                <section
                    id="galeri"
                    data-section="gallery"
                    className="bg-[#FAF6EC] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20 overflow-hidden"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div
                            className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-3 border-b border-[#E3DAC7] scroll-item ${
                                inViewSections.gallery ? 'scroll-item-visible' : 'scroll-item-hidden-left'
                            }`}
                        >
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Galeri Praktikum &amp; Observasi Lapangan
                                </h2>
                            </div>
                            <Link
                                href="/galeri"
                                className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] transition-colors self-start md:self-auto tactile-press"
                            >
                                <span>Buka Galeri Lengkap</span>
                                <span className="transform group-hover:translate-x-2 transition-transform duration-200">&rarr;</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {siteConfig.gallery.map((item, index) => (
                                <figure
                                    key={index}
                                    className={`neu-card card-interactive rounded-2xl p-3.5 group overflow-hidden scroll-item stagger-${index + 1} ${
                                        inViewSections.gallery ? 'scroll-item-visible' : 'scroll-item-hidden-up'
                                    }`}
                                >
                                    <div className="overflow-hidden rounded-xl border border-[#E3DAC7]">
                                        <Photo
                                            src={item.photoUrl}
                                            alt={item.title}
                                            aspectRatio="4/3"
                                            className="w-full h-auto rounded-xl shadow-soft img-hover-zoom"
                                        />
                                    </div>
                                    <figcaption className="mt-2.5 px-1 space-y-1">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#C2613A] block transform group-hover:translate-x-1 transition-transform">
                                            {item.category}
                                        </span>
                                        <h3 className="font-serif font-bold text-sm text-piaud-slate line-clamp-2 leading-snug group-hover:text-[#0F4C3A] transition-colors">
                                            {item.title}
                                        </h3>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. ARTIKEL PARENTING ISLAMI (Warm Cream Alternating Section with Staggered Scroll Motion) */}
                <section
                    id="artikel"
                    data-section="articles"
                    className="bg-[#F2ECE0] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20 overflow-hidden"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div
                            className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-3 border-b border-[#E3DAC7] scroll-item ${
                                inViewSections.articles ? 'scroll-item-visible' : 'scroll-item-hidden-left'
                            }`}
                        >
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Artikel Parenting Islami &amp; Khazanah AUD
                                </h2>
                            </div>
                            <Link
                                href="/artikel"
                                className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] transition-colors self-start md:self-auto tactile-press"
                            >
                                <span>Lihat Semua Artikel</span>
                                <span className="transform group-hover:translate-x-2 transition-transform duration-200">&rarr;</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                            {/* Featured Article Card */}
                            <article
                                className={`lg:col-span-6 neu-card card-interactive rounded-2xl p-5 flex flex-col justify-between group h-full scroll-item ${
                                    inViewSections.articles ? 'scroll-item-visible' : 'scroll-item-hidden-left'
                                }`}
                            >
                                <div className="space-y-3.5">
                                    <div className="overflow-hidden rounded-xl border border-[#E3DAC7]">
                                        <Photo
                                            src={siteConfig.articles.featured.photoUrl}
                                            alt={siteConfig.articles.featured.title}
                                            aspectRatio="16/9"
                                            className="w-full h-auto rounded-xl shadow-soft img-hover-zoom"
                                        />
                                    </div>
                                    <div className="space-y-2 px-1">
                                        <div className="flex items-center gap-2 text-xs text-piaud-slate-muted flex-wrap">
                                            <span className="bg-[#0F4C3A] text-white px-2.5 py-0.5 rounded-md font-bold text-[11px] group-hover:bg-[#0A3427] transition-colors">
                                                {siteConfig.articles.featured.category}
                                            </span>
                                            <span>{siteConfig.articles.featured.publishedAt}</span>
                                            <span>&bull;</span>
                                            <span>{siteConfig.articles.featured.readTime}</span>
                                        </div>
                                        <h3 className="font-serif text-lg sm:text-xl font-bold text-piaud-slate leading-snug group-hover:text-[#0F4C3A] transition-colors">
                                            {siteConfig.articles.featured.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                            {siteConfig.articles.featured.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </article>

                            {/* List Articles Stack (3-Card Stack Flushed Bottom) */}
                            <div className="lg:col-span-6 flex flex-col justify-between gap-4 h-full">
                                {siteConfig.articles.list.map((article, idx) => (
                                    <article
                                        key={article.id}
                                        className={`neu-card card-interactive rounded-xl p-4 flex-1 flex flex-col justify-center space-y-1.5 group scroll-item stagger-${idx + 1} ${
                                            inViewSections.articles ? 'scroll-item-visible' : 'scroll-item-hidden-right'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 text-xs text-piaud-slate-muted">
                                            <span className="text-[#C2613A] font-bold text-[11px] bg-[#FAF6EC] px-2.5 py-0.5 rounded-md border border-[#E3DAC7] transform group-hover:translate-x-1 transition-transform">
                                                {article.category}
                                            </span>
                                            <span>&bull;</span>
                                            <span>{article.publishedAt}</span>
                                            <span>&bull;</span>
                                            <span>{article.readTime}</span>
                                        </div>
                                        <h3 className="font-serif text-sm sm:text-base font-bold text-piaud-slate leading-snug group-hover:text-[#0F4C3A] transition-colors">
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

            {/* Floating Left: WhatsApp PMB */}
            <FloatingWhatsApp />

            {/* Floating Right: Scroll Progress & Back to Top */}
            <ScrollProgress />
        </div>
    );
}
