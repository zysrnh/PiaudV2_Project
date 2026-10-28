import React, { useEffect, useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/Components/Public/Navbar';
import { Footer } from '@/Components/Public/Footer';
import { Photo } from '@/Components/Public/Photo';
import { FloatingWhatsApp } from '@/Components/Public/FloatingWhatsApp';
import { ScrollProgress } from '@/Components/Public/ScrollProgress';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export default function Welcome() {
    const waPmbLink = createWhatsAppLink(siteConfig.whatsappDefaultMessage);

    // Senior Front-End Scroll Reveal Observer (Pure Physical Transforms - Zero Fade)
    const [revealedSections, setRevealedSections] = useState<Record<string, boolean>>({
        hero: true,
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.getAttribute('data-section');
                        if (sectionId) {
                            setRevealedSections((prev) => ({ ...prev, [sectionId]: true }));
                        }
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
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

            <main className="flex-1 w-full animate-spring-up">
                {/* 3. HERO SECTION (Warm Ivory & Structured Proportional Layout) */}
                <section data-section="hero" className="bg-[#FAF6EC] border-b border-[#E3DAC7]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-18 lg:py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-stretch">
                            {/* Left Column (7 cols): Direct Misi & Content */}
                            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                                <div className="space-y-5 sm:space-y-6">
                                    <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-piaud-slate tracking-tight leading-tight">
                                        {siteConfig.hero.heading}
                                    </h1>

                                    <p className="text-sm sm:text-base md:text-lg text-piaud-slate-muted leading-relaxed max-w-[65ch]">
                                        {siteConfig.hero.description}
                                    </p>

                                    {/* Two CTAs (Solid Crisp Buttons with Tactile Physics) */}
                                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                                        <a
                                            href={waPmbLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center neu-btn-primary text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-xl transition-all duration-150 tactile-press"
                                        >
                                            {siteConfig.hero.ctaPrimaryText}
                                        </a>
                                        <Link
                                            href="/akademik"
                                            className="inline-flex items-center justify-center neu-btn text-piaud-slate text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl transition-all duration-150 tactile-press"
                                        >
                                            {siteConfig.hero.ctaSecondaryText}
                                        </Link>
                                    </div>
                                </div>

                                {/* Stats & Features Cards Row (Interactive Spring Cards) */}
                                <div className="pt-4 grid grid-cols-3 gap-2.5 sm:gap-4 text-xs">
                                    <div className="neu-card neu-card-hover rounded-xl p-3 sm:p-4 flex flex-col justify-center cursor-default">
                                        <span className="font-bold text-piaud-slate block text-xs sm:text-sm">Sarjana (S.Pd.)</span>
                                        <span className="text-piaud-slate-muted text-[10px] sm:text-[11px]">Gelar Lulusan</span>
                                    </div>
                                    <div className="neu-card neu-card-hover rounded-xl p-3 sm:p-4 flex flex-col justify-center cursor-default">
                                        <span className="font-bold text-piaud-slate block text-xs sm:text-sm">144 SKS (8 Sem)</span>
                                        <span className="text-piaud-slate-muted text-[10px] sm:text-[11px]">Masa Studi</span>
                                    </div>
                                    <div className="neu-card neu-card-hover rounded-xl p-3 sm:p-4 flex flex-col justify-center cursor-default">
                                        <span className="font-bold text-piaud-slate block text-xs sm:text-sm">Reguler &amp; Guru</span>
                                        <span className="text-piaud-slate-muted text-[10px] sm:text-[11px]">Kelas Kuliah</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (5 cols): Crisp Rounded Photo Frame */}
                            <div className="lg:col-span-5 h-full flex flex-col">
                                <figure className="relative neu-card rounded-2xl p-3 sm:p-3.5 transition-all duration-200 h-full flex flex-col justify-center group overflow-hidden">
                                    <Photo
                                        src={siteConfig.hero.photoUrl}
                                        alt={siteConfig.hero.photoAlt}
                                        priority={true}
                                        aspectRatio="auto"
                                        className="w-full h-full min-h-[280px] sm:min-h-[340px] lg:min-h-full object-cover rounded-xl shadow-soft group-hover:scale-103 transition-transform duration-300"
                                    />
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. SAMBUTAN KAPRODI (Warm Cream Alternating Section) */}
                <section
                    id="profil"
                    data-section="kaprodi"
                    className="bg-[#F2ECE0] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center ${revealedSections.kaprodi ? 'spring-reveal' : ''}`}>
                            {/* Kaprodi Photo & Profile */}
                            <div className="lg:col-span-4 space-y-4">
                                <figure className="neu-card rounded-2xl p-4 group">
                                    <Photo
                                        src={siteConfig.kaprodi.photoUrl}
                                        alt={`Foto ${siteConfig.kaprodi.name}`}
                                        aspectRatio="3/4"
                                        className="w-full h-auto rounded-xl shadow-soft group-hover:scale-102 transition-transform duration-200"
                                    />
                                    <figcaption className="mt-3.5 space-y-1 px-1">
                                        <p className="font-serif font-bold text-base sm:text-lg text-piaud-slate">
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

                            {/* Editorial Content */}
                            <div className="lg:col-span-8 space-y-5">
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
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] transform hover:translate-x-1.5 active:translate-x-0 transition-transform shrink-0"
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
                <section
                    id="kurikulum"
                    data-section="pillars"
                    className="bg-[#FAF6EC] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20"
                >
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
                            {siteConfig.pillars.map((pillar, idx) => (
                                <div
                                    key={pillar.number}
                                    className={`neu-card neu-card-hover rounded-2xl p-6 flex flex-col justify-between group cursor-default ${
                                        revealedSections.pillars ? `spring-reveal stagger-${idx + 1}` : ''
                                    }`}
                                >
                                    <div className="space-y-3.5">
                                        <div className="w-10 h-10 rounded-xl bg-[#0F4C3A] text-white font-serif text-lg font-bold flex items-center justify-center shadow-soft transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200">
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
                                                <li key={dIdx} className="flex items-center gap-2 transform group-hover:translate-x-1 transition-transform duration-150">
                                                    <span className="w-1.5 h-1.5 bg-[#C2613A] rounded-full shrink-0"></span>
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
                                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F4C3A] hover:text-[#0A3427] neu-btn px-6 py-3.5 rounded-xl transition-all tactile-press"
                            >
                                <span>Lihat Struktur Kurikulum &amp; Sebaran Mata Kuliah</span>
                                <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 6. DOSEN & TENAGA PENGAJAR (Warm Cream Grid) */}
                <section
                    id="dosen"
                    data-section="lecturers"
                    className="bg-[#F2ECE0] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-3 border-b border-[#E3DAC7]">
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Dosen Pengampu &amp; Pakar Tumbuh Kembang
                                </h2>
                            </div>
                            <Link
                                href="/dosen"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] transform hover:translate-x-1.5 active:translate-x-0 transition-transform self-start md:self-auto"
                            >
                                <span>Lihat Semua Dosen</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>

                        {/* Crisp Responsive Cards Grid with Spring Dynamics */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {siteConfig.lecturers.map((lecturer, index) => (
                                <article
                                    key={index}
                                    className={`neu-card neu-card-hover rounded-2xl p-4 group cursor-default ${
                                        revealedSections.lecturers ? `spring-reveal stagger-${index + 1}` : ''
                                    }`}
                                >
                                    <div className="overflow-hidden rounded-xl border border-[#E3DAC7]">
                                        <Photo
                                            src={lecturer.photoUrl}
                                            alt={`Foto ${lecturer.name}`}
                                            aspectRatio="1/1"
                                            className="w-full h-auto rounded-xl shadow-soft group-hover:scale-106 transition-transform duration-300"
                                        />
                                    </div>

                                    <div className="mt-3.5 space-y-1.5">
                                        <span className="text-[11px] font-bold tracking-wider text-[#C2613A] uppercase block">
                                            {lecturer.role}
                                        </span>
                                        <h3 className="font-serif font-bold text-base text-piaud-slate leading-snug group-hover:text-[#0F4C3A] transition-colors">
                                            {lecturer.name}
                                        </h3>
                                        <div className="pt-2 border-t border-[#E3DAC7] text-xs text-piaud-slate-muted space-y-1">
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
                <section
                    id="galeri"
                    data-section="gallery"
                    className="bg-[#FAF6EC] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-3 border-b border-[#E3DAC7]">
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Galeri Praktikum &amp; Observasi Lapangan
                                </h2>
                            </div>
                            <Link
                                href="/galeri"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] transform hover:translate-x-1.5 active:translate-x-0 transition-transform self-start md:self-auto"
                            >
                                <span>Buka Galeri Lengkap</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {siteConfig.gallery.map((item, index) => (
                                <figure
                                    key={index}
                                    className={`neu-card neu-card-hover rounded-2xl p-3.5 group overflow-hidden cursor-default ${
                                        revealedSections.gallery ? `spring-reveal stagger-${index + 1}` : ''
                                    }`}
                                >
                                    <div className="overflow-hidden rounded-xl border border-[#E3DAC7]">
                                        <Photo
                                            src={item.photoUrl}
                                            alt={item.title}
                                            aspectRatio="4/3"
                                            className="w-full h-auto rounded-xl shadow-soft group-hover:scale-106 transition-transform duration-300"
                                        />
                                    </div>
                                    <figcaption className="mt-2.5 px-1 space-y-1">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#C2613A] block">
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

                {/* 7. ARTIKEL PARENTING ISLAMI (Warm Cream Alternating Section) */}
                <section
                    id="artikel"
                    data-section="articles"
                    className="bg-[#F2ECE0] border-b border-[#E3DAC7] py-12 sm:py-16 md:py-20"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-3 border-b border-[#E3DAC7]">
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Artikel Parenting Islami &amp; Khazanah AUD
                                </h2>
                            </div>
                            <Link
                                href="/artikel"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] transform hover:translate-x-1.5 active:translate-x-0 transition-transform self-start md:self-auto"
                            >
                                <span>Lihat Semua Artikel</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>

                        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch ${revealedSections.articles ? 'spring-reveal' : ''}`}>
                            {/* Featured Article Card */}
                            <article className="lg:col-span-6 neu-card neu-card-hover rounded-2xl p-5 flex flex-col justify-between group h-full cursor-default">
                                <div className="space-y-3.5">
                                    <div className="overflow-hidden rounded-xl border border-[#E3DAC7]">
                                        <Photo
                                            src={siteConfig.articles.featured.photoUrl}
                                            alt={siteConfig.articles.featured.title}
                                            aspectRatio="16/9"
                                            className="w-full h-auto rounded-xl shadow-soft group-hover:scale-104 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="space-y-2 px-1">
                                        <div className="flex items-center gap-2 text-xs text-piaud-slate-muted flex-wrap">
                                            <span className="bg-[#0F4C3A] text-white px-2.5 py-0.5 rounded-md font-bold text-[11px]">
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
                                        className={`neu-card neu-card-hover rounded-xl p-4 flex-1 flex flex-col justify-center space-y-1.5 group cursor-default ${
                                            revealedSections.articles ? `stagger-${idx + 1}` : ''
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 text-xs text-piaud-slate-muted">
                                            <span className="text-[#C2613A] font-bold text-[11px] bg-[#FAF6EC] px-2.5 py-0.5 rounded-md border border-[#E3DAC7]">
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
