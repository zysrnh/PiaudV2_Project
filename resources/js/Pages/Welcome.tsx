import React from 'react';
import { Head } from '@inertiajs/react';
import { Navbar } from '@/Components/Public/Navbar';
import { Footer } from '@/Components/Public/Footer';
import { Photo } from '@/Components/Public/Photo';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export default function Welcome() {
    const waPmbLink = createWhatsAppLink(siteConfig.whatsappDefaultMessage);

    return (
        <div className="min-h-screen bg-piaud-ivory text-piaud-slate flex flex-col font-sans">
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
                {/* 3. HERO SECTION (Asymmetric 7/5 Grid) */}
                <section className="border-b border-piaud-border bg-piaud-ivory">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                            {/* Left Column (7 cols): Direct Misi & Accreditation Badge */}
                            <div className="lg:col-span-7 space-y-6">
                                {/* Accreditation Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-piaud-ivory-dark border border-piaud-border text-xs text-piaud-slate font-semibold rounded-sm">
                                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                                    <span>{siteConfig.accreditation.status} · {siteConfig.accreditation.institution}</span>
                                    <span className="text-piaud-slate-muted hidden sm:inline">
                                        ({siteConfig.accreditation.certificateNumber})
                                    </span>
                                </div>

                                <h1 className="font-serif font-bold text-piaud-slate tracking-tight">
                                    {siteConfig.hero.heading}
                                </h1>

                                {/* Line length restrained to max-w-[65ch] for optimal readability */}
                                <p className="text-base sm:text-lg text-piaud-slate-muted leading-relaxed max-w-[65ch]">
                                    {siteConfig.hero.description}
                                </p>

                                {/* Two CTAs (High Contrast Terracotta + Ivory Secondary) */}
                                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                    <a
                                        href={waPmbLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center bg-piaud-terracotta hover:bg-piaud-terracotta-dark text-white text-sm font-bold px-7 py-3.5 rounded-sm border border-piaud-terracotta-dark transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-piaud-terracotta"
                                    >
                                        {siteConfig.hero.ctaPrimaryText}
                                    </a>
                                    <a
                                        href="#kurikulum"
                                        className="inline-flex items-center justify-center bg-piaud-ivory-dark hover:bg-piaud-border text-piaud-slate text-sm font-semibold px-6 py-3.5 rounded-sm border border-piaud-border transition-colors duration-150"
                                    >
                                        {siteConfig.hero.ctaSecondaryText}
                                    </a>
                                </div>

                                <div className="pt-5 border-t border-piaud-border flex items-center gap-6 text-xs text-piaud-slate-muted flex-wrap">
                                    <div>
                                        <span className="font-bold text-piaud-slate block">Gelar Lulusan</span>
                                        <span className="text-piaud-slate-muted">Sarjana Pendidikan (S.Pd.)</span>
                                    </div>
                                    <div className="w-px h-8 bg-piaud-border"></div>
                                    <div>
                                        <span className="font-bold text-piaud-slate block">Masa Studi</span>
                                        <span className="text-piaud-slate-muted">8 Semester (144 SKS)</span>
                                    </div>
                                    <div className="w-px h-8 bg-piaud-border"></div>
                                    <div>
                                        <span className="font-bold text-piaud-slate block">Kelas Perkuliahan</span>
                                        <span className="text-piaud-slate-muted">Reguler &amp; Guru Mengajar</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (5 cols): Direct clean figure without nested card boxes */}
                            <div className="lg:col-span-5">
                                <figure className="relative">
                                    <Photo
                                        src={siteConfig.hero.photoUrl}
                                        alt={siteConfig.hero.photoAlt}
                                        priority={true}
                                        aspectRatio="4/3"
                                        className="w-full h-auto rounded-sm shadow-sm"
                                    />
                                    <figcaption className="mt-3 px-1 text-xs text-piaud-slate-muted flex items-center justify-between font-medium">
                                        <span>Dokumentasi Laboratorium PAUD</span>
                                        <span>IAI Persis Bandung</span>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. SAMBUTAN KAPRODI (Editorial Layout Tanpa Cliché Side-Tab Border) */}
                <section id="profil" className="border-b border-piaud-border bg-piaud-ivory-dark">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Kaprodi Photo & Profile (Direct Figure without nested cards) */}
                            <div className="lg:col-span-4 space-y-4">
                                <figure className="relative">
                                    <Photo
                                        src={siteConfig.kaprodi.photoUrl}
                                        alt={`Foto ${siteConfig.kaprodi.name}`}
                                        aspectRatio="3/4"
                                        className="w-full h-auto rounded-sm shadow-sm"
                                    />
                                    <figcaption className="mt-3 space-y-1">
                                        <p className="font-serif font-bold text-lg text-piaud-slate">
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

                            {/* Editorial Content (Strict Heading Hierarchy h2 -> h3) */}
                            <div className="lg:col-span-8 space-y-6">
                                <div>
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-piaud-emerald mb-3">
                                        Sambutan Ketua Program Studi
                                    </h2>
                                    {/* Pure Typographic Pullquote (No thick green side-tab line) */}
                                    <blockquote className="font-serif text-2xl sm:text-3xl text-piaud-slate font-bold leading-snug">
                                        &ldquo;{siteConfig.kaprodi.pullQuote}&rdquo;
                                    </blockquote>
                                </div>

                                {/* Line length restrained to max-w-[65ch] */}
                                <div className="space-y-4 text-sm sm:text-base text-piaud-slate leading-relaxed max-w-[65ch]">
                                    {siteConfig.kaprodi.content.map((paragraph, index) => (
                                        <p key={index} className="text-piaud-slate-muted">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-piaud-border flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-sm bg-piaud-emerald text-piaud-ivory flex items-center justify-center font-serif text-xs font-bold shrink-0">
                                        PS
                                    </div>
                                    <p className="text-xs text-piaud-slate-muted font-medium">
                                        Komitmen kurikulum berbasis Al-Qur'an, As-Sunnah, dan standar keilmuan PAUD modern.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. PILAR KEUNGGULAN (Asymmetric 2-Column with Restrained Line Length) */}
                <section id="kurikulum" className="border-b border-piaud-border bg-piaud-ivory">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Sticky Left Column (5 cols) */}
                            <div className="lg:col-span-5 lg:sticky lg:top-24 self-start space-y-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-piaud-terracotta block">
                                    Diferensiasi Akademik
                                </span>
                                <h2 className="font-serif text-3xl font-bold text-piaud-slate leading-tight">
                                    Tiga Pilar Pendidikan Holistik Calon Guru AUD
                                </h2>
                                <p className="text-sm text-piaud-slate-muted leading-relaxed max-w-[55ch]">
                                    Struktur kurikulum dan fasilitas dirancang untuk memastikan setiap lulusan memiliki kemampuan mendidik, membimbing adab, dan menciptakan media ajar interaktif secara mandiri.
                                </p>
                                <div className="pt-2">
                                    <a
                                        href={waPmbLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-piaud-emerald hover:text-piaud-emerald-dark underline underline-offset-4"
                                    >
                                        <span>Unduh Rencana Pembelajaran Semester (RPS) via WA</span>
                                        <span>&rarr;</span>
                                    </a>
                                </div>
                            </div>

                            {/* Numbered Right Column (7 cols) */}
                            <div className="lg:col-span-7 divide-y divide-piaud-border border-t lg:border-t-0 border-piaud-border">
                                {siteConfig.pillars.map((pillar) => (
                                    <div key={pillar.number} className="py-8 first:pt-0 last:pb-0 space-y-4">
                                        <div className="flex items-baseline gap-4">
                                            <span className="font-serif text-3xl sm:text-4xl font-bold text-piaud-emerald shrink-0">
                                                {pillar.number}
                                            </span>
                                            <h3 className="font-serif text-lg sm:text-xl font-bold text-piaud-slate">
                                                {pillar.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-piaud-slate-muted leading-relaxed pl-12 max-w-[65ch]">
                                            {pillar.description}
                                        </p>
                                        <ul className="pl-12 space-y-2 text-xs text-piaud-slate font-medium">
                                            {pillar.deliverables.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-piaud-terracotta rounded-full shrink-0"></span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. DOSEN & TENAGA PENGAJAR (Flat Single Card Layout, No Nested Boxes) */}
                <section id="dosen" className="border-b border-piaud-border bg-piaud-ivory-dark">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 border-b border-piaud-border pb-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-piaud-emerald block mb-1">
                                    Tenaga Pendidik
                                </span>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Dosen Pengampu &amp; Pakar Tumbuh Kembang
                                </h2>
                            </div>
                            <p className="text-xs text-piaud-slate-muted max-w-md leading-relaxed">
                                Praktisi dan akademisi tersertifikasi di bidang pendidikan Islam, psikologi anak usia dini, dan perancangan media belajar kreatif.
                            </p>
                        </div>

                        {/* Flat Grid Dosen (Clean Single Card without nested borders) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {siteConfig.lecturers.map((lecturer, index) => (
                                <article
                                    key={index}
                                    className="bg-piaud-ivory border border-piaud-border rounded-sm p-4 flex flex-col justify-between"
                                >
                                    <div>
                                        <Photo
                                            src={lecturer.photoUrl}
                                            alt={`Foto ${lecturer.name}`}
                                            aspectRatio="1/1"
                                            className="w-full h-auto rounded-sm mb-4"
                                        />
                                        <span className="text-xs font-bold tracking-wider uppercase text-piaud-terracotta block">
                                            {lecturer.role}
                                        </span>
                                        <h3 className="font-serif font-bold text-base text-piaud-slate mt-1.5 leading-snug">
                                            {lecturer.name}
                                        </h3>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-piaud-border text-xs text-piaud-slate-muted space-y-1">
                                        <p className="font-mono text-xs text-piaud-slate-muted">
                                            NIP: {lecturer.nip}
                                        </p>
                                        <p className="text-piaud-slate font-semibold">
                                            {lecturer.expertise}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* GALERI DOKUMENTASI (Clean Figure Grid, Fixed Heading Level h3) */}
                <section id="galeri" className="border-b border-piaud-border bg-piaud-ivory">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 border-b border-piaud-border pb-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-piaud-emerald block mb-1">
                                    Dokumentasi Kegiatan
                                </span>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Galeri Praktikum &amp; Observasi Lapangan
                                </h2>
                            </div>
                            <p className="text-xs text-piaud-slate-muted max-w-md leading-relaxed">
                                Dokumentasi nyata kegiatan mahasiswa dalam pembuatan alat permainan edukatif, pentas kreativitas anak, dan simulasi microteaching.
                            </p>
                        </div>

                        {/* Flat Figure Grid 4 Kolom (No nested card boxes, generous spacing) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {siteConfig.gallery.map((item, index) => (
                                <figure
                                    key={index}
                                    className="border border-piaud-border bg-piaud-ivory-dark rounded-sm p-3 flex flex-col justify-between"
                                >
                                    <Photo
                                        src={item.photoUrl}
                                        alt={item.title}
                                        aspectRatio="4/3"
                                        className="w-full h-auto rounded-sm"
                                    />
                                    <figcaption className="mt-4 pt-2 border-t border-piaud-border/70 space-y-1">
                                        <span className="text-xs font-bold uppercase tracking-wider text-piaud-terracotta block">
                                            {item.category}
                                        </span>
                                        {/* Changed from h4 to h3 to fix SKIPPED HEADING LEVEL */}
                                        <h3 className="font-serif font-bold text-sm text-piaud-slate line-clamp-2 leading-snug">
                                            {item.title}
                                        </h3>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. ARTIKEL PARENTING ISLAMI (Clean Divided List, Max Line Length Restraint) */}
                <section id="artikel" className="border-b border-piaud-border bg-piaud-ivory-dark">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 border-b border-piaud-border pb-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-piaud-terracotta block mb-1">
                                    Wawasan &amp; Edukasi
                                </span>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Artikel Parenting Islami &amp; Khazanah AUD
                                </h2>
                            </div>
                            <span className="text-xs text-piaud-slate-muted">
                                Publikasi riset terapan dan panduan pengasuhan dari civitas akademika PIAUD.
                            </span>
                        </div>

                        {/* 1 Featured (Left 6 cols) + 3 List (Right 6 cols) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Featured Article (Single clean card) */}
                            <article className="lg:col-span-6 border border-piaud-border bg-piaud-ivory rounded-sm p-5 space-y-4">
                                <Photo
                                    src={siteConfig.articles.featured.photoUrl}
                                    alt={siteConfig.articles.featured.title}
                                    aspectRatio="16/9"
                                    className="w-full h-auto rounded-sm"
                                />
                                <div className="space-y-2.5">
                                    <div className="flex items-center gap-3 text-xs text-piaud-slate-muted flex-wrap">
                                        <span className="bg-piaud-emerald text-piaud-ivory px-2.5 py-0.5 rounded-sm font-bold text-xs">
                                            {siteConfig.articles.featured.category}
                                        </span>
                                        <span>{siteConfig.articles.featured.publishedAt}</span>
                                        <span>&bull;</span>
                                        <span>{siteConfig.articles.featured.readTime}</span>
                                    </div>
                                    <h3 className="font-serif text-lg sm:text-xl font-bold text-piaud-slate leading-snug">
                                        {siteConfig.articles.featured.title}
                                    </h3>
                                    <p className="text-sm text-piaud-slate-muted leading-relaxed max-w-[65ch]">
                                        {siteConfig.articles.featured.excerpt}
                                    </p>
                                </div>
                            </article>

                            {/* 3 List Articles (Clean divided list, no nested cards) */}
                            <div className="lg:col-span-6 divide-y divide-piaud-border border border-piaud-border bg-piaud-ivory rounded-sm">
                                {siteConfig.articles.list.map((article) => (
                                    <article key={article.id} className="p-5 space-y-2 hover:bg-piaud-ivory-dark transition-colors duration-150">
                                        <div className="flex items-center gap-2 text-xs text-piaud-slate-muted">
                                            <span className="text-piaud-terracotta font-bold text-xs">
                                                {article.category}
                                            </span>
                                            <span>&bull;</span>
                                            <span>{article.publishedAt}</span>
                                            <span>&bull;</span>
                                            <span>{article.readTime}</span>
                                        </div>
                                        <h3 className="font-serif text-base font-bold text-piaud-slate leading-snug">
                                            {article.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed line-clamp-2 max-w-[65ch]">
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
