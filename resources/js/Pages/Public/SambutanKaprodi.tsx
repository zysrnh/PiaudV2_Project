import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Photo } from '@/Components/Public/Photo';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export default function SambutanKaprodi() {
    const waLink = createWhatsAppLink("Halo Admin, saya ingin konsultasi mengenai program studi S1 PIAUD IAI Persis Bandung.");

    const [inView, setInView] = useState<Record<string, boolean>>({
        header: true,
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
        <PublicLayout>
            <Head>
                <title>{`Sambutan Ketua Program Studi - ${siteConfig.programName} ${siteConfig.institutionName}`}</title>
                <meta
                    name="description"
                    content={`Sambutan resmi Ketua Program Studi S1 PIAUD IAI Persis Bandung mengenai arah pendidikan guru anak usia dini berbasis Qur'ani dan pedagogi modern.`}
                />
            </Head>

            {/* 1. Header Banner */}
            <div data-section="header" className="bg-[#0A3427] text-white py-12 md:py-16 border-b border-[#E3DAC7]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-white/70 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span className="text-white/40">/</span>
                        <Link href="/profil" className="hover:text-white transition-colors">Profil</Link>
                        <span className="text-white/40">/</span>
                        <span className="text-white font-medium">Sambutan Kaprodi</span>
                    </nav>
                    <h1 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight ${inView.header ? 'animate-slide-left' : ''}`}>
                        Sambutan Ketua Program Studi
                    </h1>
                    <p className={`mt-3 text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed ${inView.header ? 'animate-slide-left delay-1' : ''}`}>
                        Mendidik dengan keteladanan ruhiyah, menanamkan benih aqidah sejak usia emas, dan mencetak arsitek peradaban masa depan.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
                {/* 2. Main Editorial Speech Section */}
                <section data-section="speech" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column (4 cols): Leader Profile Card */}
                    <div className={`lg:col-span-4 space-y-6 ${inView.speech ? 'animate-slide-left' : ''}`}>
                        <figure className="neu-card card-interactive rounded-2xl p-4 sm:p-5 group">
                            <div className="overflow-hidden rounded-xl border border-[#E3DAC7]">
                                <Photo
                                    src={siteConfig.kaprodi.photoUrl}
                                    alt={`Foto ${siteConfig.kaprodi.name}`}
                                    aspectRatio="3/4"
                                    className="w-full h-auto rounded-xl shadow-soft"
                                />
                            </div>
                            <figcaption className="mt-4 space-y-1 text-center">
                                <h2 className="font-serif font-bold text-lg sm:text-xl text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                    {siteConfig.kaprodi.name}
                                </h2>
                                <p className="text-xs text-[#C2613A] font-bold">
                                    {siteConfig.kaprodi.title}
                                </p>
                                <p className="text-xs text-piaud-slate-muted pt-1 border-t border-[#E3DAC7]">
                                    Fakultas Tarbiyah · IAI Persis Bandung
                                </p>
                            </figcaption>
                        </figure>

                        {/* Executive Identity Card */}
                        <div className="neu-card rounded-2xl p-5 border border-[#E3DAC7] space-y-3.5 text-xs text-piaud-slate-muted bg-[#FAF6EC]">
                            <h3 className="font-serif font-bold text-sm text-piaud-slate border-b border-[#E3DAC7] pb-2">
                                Profil Kepemimpinan Prodi
                            </h3>
                            <div className="space-y-2">
                                <div>
                                    <span className="font-bold text-piaud-slate block">Keahlian Akademik:</span>
                                    <span>Psikologi Perkembangan Anak &amp; Kurikulum PAUD Islami</span>
                                </div>
                                <div>
                                    <span className="font-bold text-piaud-slate block">Fokus Riset:</span>
                                    <span>Metodologi Penanaman Fitrah Tauhid &amp; Parenting Qur'ani</span>
                                </div>
                                <div>
                                    <span className="font-bold text-piaud-slate block">Layanan Konsultasi Mahasiswa:</span>
                                    <span>Senin – Kamis, 09.00 – 14.00 WIB (Ruang Kaprodi)</span>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-[#E3DAC7]">
                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 neu-btn text-piaud-slate font-bold py-2.5 px-3 rounded-xl transition-all cursor-pointer text-xs"
                                >
                                    <span>Hubungi Melalui WhatsApp</span>
                                    <span>→</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (8 cols): Complete Speech Content */}
                    <div className={`lg:col-span-8 ${inView.speech ? 'animate-slide-right delay-1' : ''}`}>
                        <article className="neu-card rounded-2xl p-6 sm:p-10 md:p-12 border border-[#E3DAC7] space-y-6 bg-[#FAF6EC]">
                            <div className="space-y-2 border-b border-[#E3DAC7] pb-5">
                                <span className="text-xs font-bold tracking-widest text-[#C2613A] uppercase block">
                                    Naskah Resmi Sambutan
                                </span>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate leading-snug">
                                    Mencetak Guru Teladan yang Menjaga Fitrah Usia Emas
                                </h2>
                            </div>

                            {/* Bismillah & Salam */}
                            <div className="font-serif text-piaud-slate space-y-1">
                                <p className="text-base sm:text-lg font-bold text-[#0F4C3A]">
                                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                                </p>
                                <p className="text-sm sm:text-base font-semibold">
                                    Assalamu’alaikum Warahmatullahi Wabarakatuh
                                </p>
                            </div>

                            {/* Major Pullquote */}
                            <blockquote className="font-serif text-lg sm:text-xl text-piaud-slate font-bold leading-relaxed border-l-4 border-[#C2613A] pl-5 py-2 bg-[#F2ECE0]/60 rounded-r-xl">
                                &ldquo;{siteConfig.kaprodi.pullQuote}&rdquo;
                            </blockquote>

                            {/* Speech Paragraphs */}
                            <div className="space-y-4 text-sm sm:text-base text-piaud-slate-muted leading-relaxed font-sans">
                                <p>
                                    Puji syukur senantiasa kita panjatkan ke hadirat Allah Subhanahu wa Ta'ala atas limpahan rahmat, taufiq, dan hidayah-Nya. Shalawat serta salam semoga tercurah limpahkan kepada uswatun hasanah kita, Nabi Muhammad Shallallahu 'Alaihi Wasallam, para keluarga, sahabat, dan pengikutnya hingga akhir zaman.
                                </p>

                                <p>
                                    Selamat datang di portal resmi Program Studi S1 Pendidikan Islam Anak Usia Dini (PIAUD) Fakultas Tarbiyah Institut Agama Islam Persatuan Islam (IAI Persis) Bandung. Kehadiran portal ini merupakan ikhtiar kami dalam membuka ruang komunikasi, transparansi informasi, serta jembatan silaturahmi bagi segenap sivitas akademika, orang tua, dan masyarakat luas.
                                </p>

                                <p>
                                    Anak usia dini (0–6 tahun) merupakan masa keemasan (<em>golden age</em>) yang tidak akan terulang kembali. Pada masa inilah fondasi aqidah, pembiasaan akhlakul karimah, serta potensi kecerdasan motorik dan kognitif dibangun secara fundamental. Oleh sebab itu, guru RA dan TK bukan sekadar tenaga pengajar biasa, melainkan <strong>arsitek peradaban pertama</strong> yang menggoreskan nilai-nilai tauhid dalam jiwa anak.
                                </p>

                                <p>
                                    Program Studi S1 PIAUD IAI Persis Bandung didesain secara khusus untuk menjawab tantangan tersebut. Kami memadukan keilmuan pedagogi modern berbasis sains tumbuh kembang anak dengan nilai-nilai syariat Islam yang luhur khas Jam'iyyah Persatuan Islam. Mahasiswa tidak hanya dididik untuk menguasai teori di ruang kuliah, melainkan digembleng secara intensif di Laboratorium Microteaching, workshop pembuatan Alat Permainan Edukatif (APE), hingga magang langsung di jaringan Raudhatul Athfal (RA) se-Jawa Barat.
                                </p>

                                <p>
                                    Kami mengundang putra-putri terbaik bangsa, para pendidik yang berjiwa ikhlas, serta siapa saja yang memiliki kecintaan tulus pada dunia anak, untuk melangkah bersama kami. Mari bersama-sama kita ikhtiarkan hadirnya generasi penerus yang sholeh, cerdas, beradab, dan siap menyongsong masa depan umat yang gemilang.
                                </p>

                                <p className="pt-2">
                                    Semoga Allah Subhanahu wa Ta'ala senantiasa meridhoi setiap langkah dan amal ibadah kita semua.
                                </p>
                            </div>

                            {/* Sign-off */}
                            <div className="pt-6 border-t border-[#E3DAC7] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-piaud-slate">
                                        Wassalamu’alaikum Warahmatullahi Wabarakatuh
                                    </p>
                                    <p className="text-xs text-piaud-slate-muted">
                                        Bandung, {new Date().getFullYear()}
                                    </p>
                                </div>
                                <div className="space-y-1 sm:text-right">
                                    <p className="text-xs text-piaud-slate-muted uppercase tracking-wider font-bold">
                                        Ketua Program Studi S1 PIAUD
                                    </p>
                                    <p className="font-serif font-bold text-base sm:text-lg text-piaud-slate">
                                        {siteConfig.kaprodi.name}
                                    </p>
                                    <p className="text-xs text-[#C2613A] font-semibold">
                                        IAI Persis Bandung
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                {/* 3. Three Pillars of Leadership Commitment */}
                <section data-section="commitments" className="space-y-8">
                    <div className={`text-center max-w-2xl mx-auto space-y-2 ${inView.commitments ? 'animate-slide-up' : ''}`}>
                        <span className="text-xs font-bold tracking-widest text-[#C2613A] uppercase block">
                            Komitmen Kepemimpinan
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                            Fokus Pengembangan Prodi Menuju 2030
                        </h2>
                        <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                            Arah strategis pembinaan mahasiswa dan penguatan tridharma perguruan tinggi di S1 PIAUD IAI Persis Bandung.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className={inView.commitments ? 'animate-slide-up delay-1' : ''}>
                            <div className="neu-card card-interactive rounded-2xl p-6 sm:p-7 space-y-3.5 h-full flex flex-col justify-between group">
                                <div className="space-y-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#0F4C3A] text-white font-serif text-lg font-bold flex items-center justify-center shadow-soft transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                        01
                                    </div>
                                    <h3 className="font-serif text-base sm:text-lg font-bold text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                        Keteladanan Ruhiyah &amp; Karakter Qur'ani
                                    </h3>
                                    <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                        Menjadikan ketakwaan dan adab Islami sebagai pondasi utama seluruh proses belajar mengajar calon pendidik usia dini.
                                    </p>
                                </div>
                                <div className="pt-3 border-t border-[#E3DAC7] text-xs font-semibold text-[#0F4C3A]">
                                    Fokus: Aqidah &amp; Akhlakul Karimah
                                </div>
                            </div>
                        </div>

                        <div className={inView.commitments ? 'animate-slide-up delay-2' : ''}>
                            <div className="neu-card card-interactive rounded-2xl p-6 sm:p-7 space-y-3.5 h-full flex flex-col justify-between group">
                                <div className="space-y-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#0F4C3A] text-white font-serif text-lg font-bold flex items-center justify-center shadow-soft transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                        02
                                    </div>
                                    <h3 className="font-serif text-base sm:text-lg font-bold text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                        Laboratorium Mutakhir &amp; APE Edukatif
                                    </h3>
                                    <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                        Penyediaan sarana microteaching canggih dan workshop pembuatan media ajar anak ramah lingkungan berbasis technopreneur.
                                    </p>
                                </div>
                                <div className="pt-3 border-t border-[#E3DAC7] text-xs font-semibold text-[#0F4C3A]">
                                    Fokus: Skill Praktik &amp; Karya Nyata
                                </div>
                            </div>
                        </div>

                        <div className={inView.commitments ? 'animate-slide-up delay-3' : ''}>
                            <div className="neu-card card-interactive rounded-2xl p-6 sm:p-7 space-y-3.5 h-full flex flex-col justify-between group">
                                <div className="space-y-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#0F4C3A] text-white font-serif text-lg font-bold flex items-center justify-center shadow-soft transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                        03
                                    </div>
                                    <h3 className="font-serif text-base sm:text-lg font-bold text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                        Jejaring Kemitraan &amp; Penyaluran Kerja
                                    </h3>
                                    <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                        Kolaborasi aktif dengan jaringan Raudhatul Athfal (RA) dan TK Islam untuk memastikan lulusan langsung terserap di dunia kerja.
                                    </p>
                                </div>
                                <div className="pt-3 border-t border-[#E3DAC7] text-xs font-semibold text-[#0F4C3A]">
                                    Fokus: Relevansi &amp; Karir Lulusan
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Bottom Navigation & CTA Row */}
                <section className="neu-card rounded-2xl p-8 sm:p-10 border border-[#E3DAC7] flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F2ECE0]">
                    <div className="space-y-1 text-center sm:text-left">
                        <h3 className="font-serif font-bold text-lg text-piaud-slate">
                            Ingin Mengetahui Kurikulum dan Pendaftaran?
                        </h3>
                        <p className="text-xs sm:text-sm text-piaud-slate-muted">
                            Kunjungi informasi kurikulum lengkap atau hubungi layanan PMB kami.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/akademik"
                            className="neu-btn text-piaud-slate text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer"
                        >
                            <span>Lihat Kurikulum &amp; SKS</span>
                            <span className="ml-1.5">→</span>
                        </Link>
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neu-btn-primary text-white text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer"
                        >
                            <span>Konsultasi PMB via WhatsApp</span>
                            <span className="ml-1.5">→</span>
                        </a>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
