import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Photo } from '@/Components/Public/Photo';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export default function Profile() {
    const waLink = createWhatsAppLink("Halo Admin, saya ingin mengetahui lebih banyak tentang Profil Prodi S1 PIAUD IAI Persis Bandung.");

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
                <title>{`Profil & Visi Misi - ${siteConfig.programName} ${siteConfig.institutionName}`}</title>
                <meta
                    name="description"
                    content={`Profil resmi, visi keislaman, misi, pimpinan, dan legalitas Program Studi S1 PIAUD IAI Persis Bandung.`}
                />
            </Head>

            {/* Header Banner with Breadcrumb */}
            <div data-section="header" className="bg-[#0A3427] text-white py-12 md:py-16 border-b border-[#E3DAC7]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-white/70 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span className="text-white/40">/</span>
                        <span className="text-white font-medium">Profil &amp; Visi Misi</span>
                    </nav>
                    <h1 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight ${inView.header ? 'animate-slide-left' : ''}`}>
                        Profil &amp; Kelembagaan Prodi
                    </h1>
                    <p className={`mt-3 text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed ${inView.header ? 'animate-slide-left delay-1' : ''}`}>
                        Mengenal lebih dekat visi keislaman, misi pencapaian, pimpinan prodi, serta legalitas formal Program Studi S1 PIAUD IAI Persis Bandung.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14">
                {/* 1. Sambutan Kaprodi */}
                <section id="sambutan" data-section="sambutan" className="neu-card rounded-2xl p-6 sm:p-10 md:p-12 border border-[#E3DAC7]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
                        {/* Kaprodi Photo Card with Decoupled Smooth Hover */}
                        <div className={`lg:col-span-4 ${inView.sambutan ? 'animate-slide-left' : ''}`}>
                            <figure className="neu-card card-interactive rounded-2xl p-3 sm:p-4 group">
                                <div className="overflow-hidden rounded-xl border border-[#E3DAC7]">
                                    <Photo
                                        src={siteConfig.kaprodi.photoUrl}
                                        alt={`Foto ${siteConfig.kaprodi.name}`}
                                        aspectRatio="3/4"
                                        className="w-full h-auto rounded-xl shadow-soft"
                                    />
                                </div>
                                <figcaption className="mt-3.5 space-y-1 text-center">
                                    <h3 className="font-serif font-bold text-base sm:text-lg text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                        {siteConfig.kaprodi.name}
                                    </h3>
                                    <p className="text-xs text-[#C2613A] font-bold">
                                        {siteConfig.kaprodi.title}
                                    </p>
                                    <p className="text-xs text-piaud-slate-muted pt-1 border-t border-[#E3DAC7]">
                                        Fakultas Tarbiyah · IAI Persis Bandung
                                    </p>
                                </figcaption>
                            </figure>
                        </div>

                        {/* Editorial Text */}
                        <div className={`lg:col-span-8 space-y-5 ${inView.sambutan ? 'animate-slide-right delay-1' : ''}`}>
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate leading-snug">
                                Melahirkan Pendidik yang Menanamkan Tauhid &amp; Adab Sejak Usia Emas
                            </h2>
                            <blockquote className="font-serif text-base sm:text-lg text-piaud-slate font-bold leading-relaxed border-l-4 border-[#C2613A] pl-4 py-1">
                                &ldquo;{siteConfig.kaprodi.pullQuote}&rdquo;
                            </blockquote>
                            <div className="space-y-3.5 text-sm sm:text-base text-piaud-slate-muted leading-relaxed">
                                {siteConfig.kaprodi.content.map((p, idx) => (
                                    <p key={idx}>{p}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Visi & Misi */}
                <section id="visi-misi" data-section="visi-misi" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Visi Card */}
                    <div className={`lg:col-span-5 h-full ${inView['visi-misi'] ? 'animate-slide-left' : ''}`}>
                        <div className="neu-card card-interactive rounded-2xl p-7 sm:p-10 flex flex-col justify-between h-full bg-[#0F4C3A] text-white border border-[#0A3427] shadow-[0_12px_28px_rgba(10,52,39,0.35)] group">
                            <div className="space-y-5">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider uppercase border border-white/20">
                                    <span>Visi Keislaman 2030</span>
                                </div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white group-hover:text-emerald-100 transition-colors">
                                    Visi Program Studi S1 PIAUD
                                </h2>
                                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-serif italic border-l-2 border-[#C2613A] pl-4">
                                    &ldquo;Menjadi program studi yang unggul dan kompetitif di tingkat nasional dalam pengembangan ilmu pendidikan Islam anak usia dini yang berkarakter Qur'ani dan berjiwa technopreneur edukatif pada tahun 2030.&rdquo;
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/20 text-xs text-white/80 space-y-2">
                                <p className="font-bold text-white uppercase tracking-wider text-[11px]">Target Capaian 2030:</p>
                                <p className="leading-relaxed">Akreditasi Unggul · Pusat Riset APE Berkelanjutan · Kemitraan PAUD &amp; RA Nasional</p>
                            </div>
                        </div>
                    </div>

                    {/* Misi Card & Staggered Items */}
                    <div className={`lg:col-span-7 h-full ${inView['visi-misi'] ? 'animate-slide-right delay-1' : ''}`}>
                        <div className="neu-card rounded-2xl p-6 sm:p-8 border border-[#E3DAC7] space-y-5 h-full flex flex-col justify-between bg-[#FAF6EC]">
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                    Misi Program Studi
                                </h2>
                                <p className="text-xs sm:text-sm text-piaud-slate-muted mt-1">
                                    Empat pilar komitmen tridharma perguruan tinggi berlandaskan Al-Qur'an dan Sunnah.
                                </p>
                            </div>

                            <div className="space-y-3.5">
                                {[
                                    {
                                        no: "01",
                                        title: "Pendidikan & Pengajaran Integratif",
                                        desc: "Menyelenggarakan pembelajaran berkualitas yang memadukan pedagogi PAUD modern dengan nilai-nilai aqidah, ibadah, dan akhlak berlandaskan Al-Qur'an dan Sunnah.",
                                    },
                                    {
                                        no: "02",
                                        title: "Penelitian Ilmiah & Terapan",
                                        desc: "Melakukan riset terapan di bidang psikologi perkembangan anak usia dini, asesmen tumbuh kembang, dan inovasi pembuatan Alat Permainan Edukatif (APE).",
                                    },
                                    {
                                        no: "03",
                                        title: "Pengabdian Masyarakat Bermakna",
                                        desc: "Membina dan memberdayakan satuan RA/TK/PAUD serta memberikan pendampingan parenting Islami kepada keluarga dan komunitas masyarakat muslim.",
                                    },
                                    {
                                        no: "04",
                                        title: "Kemitraan & Tata Kelola Unggul",
                                        desc: "Membangun jejaring kolaborasi nasional dan internasional dengan lembaga pendidikan AUD serta mewujudkan tata kelola prodi yang transparan dan akuntabel.",
                                    },
                                ].map((misi) => (
                                    <div
                                        key={misi.no}
                                        className="neu-card card-interactive rounded-xl p-4 flex items-start gap-4 group border border-[#E3DAC7] hover:border-[#0F4C3A]"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[#0F4C3A] text-white font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-soft transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                            {misi.no}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-serif font-bold text-sm sm:text-base text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                                {misi.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                                                {misi.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Nilai Dasar & Legalitas */}
                <section data-section="legalitas" className="neu-card rounded-2xl p-6 sm:p-10 md:p-12 border border-[#E3DAC7]">
                    <div className={`text-center max-w-2xl mx-auto mb-10 space-y-2 ${inView.legalitas ? 'animate-slide-up' : ''}`}>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                            Legalitas &amp; Akreditasi Resmi
                        </h2>
                        <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                            Program Studi S1 PIAUD beroperasi penuh di bawah naungan Kementerian Agama Republik Indonesia dan Badan Akreditasi Nasional.
                        </p>
                    </div>

                    {/* 3 Legalitas Cards with Decoupled Staggered Entrance */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className={inView.legalitas ? 'animate-slide-up delay-1' : ''}>
                            <div className="neu-card card-interactive rounded-2xl p-6 text-center space-y-3 group h-full flex flex-col justify-between border border-[#E3DAC7]">
                                <div className="space-y-2">
                                    <div className="w-12 h-12 mx-auto rounded-xl bg-[#F2ECE0] flex items-center justify-center text-2xl shadow-soft transform group-hover:scale-110 transition-transform duration-300">
                                        🏛️
                                    </div>
                                    <h3 className="font-serif font-bold text-base text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                        Izin Operasional
                                    </h3>
                                    <p className="text-xs text-piaud-slate-muted leading-relaxed">
                                        Kementerian Agama RI &amp; Dirjen Pendidikan Islam (Pendis)
                                    </p>
                                </div>
                                <div>
                                    <span className="inline-block text-[11px] font-bold text-[#0F4C3A] bg-[#FAF6EC] px-3 py-1 rounded-md border border-[#E3DAC7]">
                                        Resmi &amp; Terdaftar
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={inView.legalitas ? 'animate-slide-up delay-2' : ''}>
                            <div className="neu-card card-interactive rounded-2xl p-6 text-center space-y-3 group h-full flex flex-col justify-between border border-[#E3DAC7]">
                                <div className="space-y-2">
                                    <div className="w-12 h-12 mx-auto rounded-xl bg-[#F2ECE0] flex items-center justify-center text-2xl shadow-soft transform group-hover:scale-110 transition-transform duration-300">
                                        📜
                                    </div>
                                    <h3 className="font-serif font-bold text-base text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                        Akreditasi Prodi
                                    </h3>
                                    <p className="text-xs text-piaud-slate-muted leading-relaxed">
                                        {siteConfig.accreditation.status} oleh {siteConfig.accreditation.institution}
                                    </p>
                                </div>
                                <div>
                                    <span className="inline-block text-[11px] font-bold text-[#0F4C3A] bg-[#FAF6EC] px-3 py-1 rounded-md border border-[#E3DAC7]">
                                        Berlaku s.d. {siteConfig.accreditation.validUntil}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={inView.legalitas ? 'animate-slide-up delay-3' : ''}>
                            <div className="neu-card card-interactive rounded-2xl p-6 text-center space-y-3 group h-full flex flex-col justify-between border border-[#E3DAC7]">
                                <div className="space-y-2">
                                    <div className="w-12 h-12 mx-auto rounded-xl bg-[#F2ECE0] flex items-center justify-center text-2xl shadow-soft transform group-hover:scale-110 transition-transform duration-300">
                                        🎓
                                    </div>
                                    <h3 className="font-serif font-bold text-base text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                        Gelar Akademik
                                    </h3>
                                    <p className="text-xs text-piaud-slate-muted leading-relaxed">
                                        Sarjana Pendidikan (S.Pd.) Bidang PAUD
                                    </p>
                                </div>
                                <div>
                                    <span className="inline-block text-[11px] font-bold text-[#C2613A] bg-[#FAF6EC] px-3 py-1 rounded-md border border-[#E3DAC7]">
                                        Jenjang Sarjana (S1)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className={`mt-10 pt-6 border-t border-[#E3DAC7] flex flex-col sm:flex-row items-center justify-between gap-4 ${inView.legalitas ? 'animate-slide-up delay-4' : ''}`}>
                        <p className="text-xs text-piaud-slate-muted text-center sm:text-left">
                            Membutuhkan salinan SK Izin Operasional atau Akreditasi untuk keperluan administrasi dan beasiswa?
                        </p>
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 neu-btn-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
                        >
                            <span>Minta Berkas via WhatsApp</span>
                            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out">→</span>
                        </a>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
