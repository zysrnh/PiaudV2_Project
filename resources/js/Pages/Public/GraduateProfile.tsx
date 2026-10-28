import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export default function GraduateProfile() {
    const waLink = createWhatsAppLink("Halo Admin, saya ingin konsultasi mengenai prospek karir dan profil lulusan S1 PIAUD IAI Persis Bandung.");

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

    const profiles = [
        {
            icon: "👩‍🏫",
            title: "Pendidik RA / TK / PAUD Profesional",
            badge: "Pilar Utama Pedagogik",
            role: "Guru Sentra & Wali Kelas Unggulan",
            desc: "Pendidik anak usia dini berakhlakul karimah yang menguasai metodologi pembelajaran ramah anak, kurikulum berbasis fitrah, serta pemanfaatan media edukatif kontekstual.",
            competencies: [
                "Perancangan modul ajar berbasis kurikulum merdeka & kurikulum khas Persatuan Islam",
                "Manajemen kelas ramah anak dengan pendekatan sentra dan loose parts",
                "Asesmen autentik perkembangan kognitif, fisik-motorik, bahasa, dan sosio-emosional anak",
                "Metodologi tahfidz & pengenalan dasar Al-Qur'an usia dini yang menyenangkan",
            ],
            careerTracks: [
                "Guru Kelas / Sentra di RA & TK Islam",
                "Pendidik Kelompok Bermain (KB) & Tempat Penitipan Anak (TPA)",
                "Tutor Lembaga Pendidikan Non-Formal Anak",
            ],
        },
        {
            icon: "🏢",
            title: "Kepala & Pengelola Satuan PAUD",
            badge: "Pilar Manajerial",
            role: "Leader & Manajer Lembaga PAUD",
            desc: "Pimpinan satuan pendidikan anak usia dini yang memiliki kecakapan manajerial, kepemimpinan transformatif, tata kelola akreditasi, dan kewirausahaan institusi.",
            competencies: [
                "Manajemen kelembagaan satuan PAUD/RA berbasis standar BAN-PDM",
                "Tata kelola keuangan, administrasi kepegawaian, dan penyusunan RAPBS",
                "Supervisi pedagogik guru dan evaluasi program pembelajaran semesteran",
                "Pembangunan jejaring kemitraan strategis dengan orang tua dan instansi pemerintah",
            ],
            careerTracks: [
                "Kepala Sekolah RA / TK / KB Islam",
                "Manajer Operasional Daycare & Sentra Edukasi Anak",
                "Pengawas & Konsultan Tata Kelola Lembaga PAUD",
            ],
        },
        {
            icon: "🧸",
            title: "Technopreneur & Desainer Media APE",
            badge: "Pilar Kreatif & Industri",
            role: "Inovator Alat Permainan Edukatif",
            desc: "Wirausahawan edukasi yang memadukan kreativitas estetika, pedagogi anak, dan prinsip technopreneurship untuk merancang media belajar dan mainan edukatif ramah anak.",
            competencies: [
                "Rancang bangun Alat Permainan Edukatif (APE) berbasis bahan alam dan loose parts",
                "Produksi buku cerita anak Islami bergambar (children picture book)",
                "Pengembangan konten digital interaktif, animasi edukasi, dan aplikasi parenting",
                "Pemasaran produk edukasi, sertifikasi standar keamanan SNI mainan, dan branding",
            ],
            careerTracks: [
                "Owner / Desainer Studio Produksi APE",
                "Penulis & Ilustrator Buku Bacaan Anak Usia Dini",
                "Content Creator & Edu-influencer Pendidikan Anak",
            ],
        },
        {
            icon: "🤝",
            title: "Konsultan Parenting & Tumbuh Kembang",
            badge: "Pilar Konseling & Dakwah",
            role: "Fasilitator Keluarga Sakinah",
            desc: "Konselor dan mitra orang tua yang memiliki keahlian dalam pendampingan pengasuhan anak usia emas, deteksi dini kebutuhan khusus, dan konseling keluarga Islami.",
            competencies: [
                "Deteksi dini dan skrining tumbuh kembang anak usia 0-6 tahun (DDST & Denver II)",
                "Konseling pengasuhan berbasis sunnah nabawiyah dan psikologi perkembangan modern",
                "Penyelenggaraan kelas parenting, workshop keayahbundaan, dan mediasi stimulasi anak",
                "Rujukan awal penanganan anak dengan hambatan sensori atau neurodevelopmental",
            ],
            careerTracks: [
                "Konsultan Tumbuh Kembang di Klinik / Pusat Terapi Anak",
                "Narasumber & Fasilitator Parenting Komunitas & Lembaga Dakwah",
                "Trainer Pengasuhan Anak Usia Emas bagi Orang Tua Muda",
            ],
        },
    ];

    const cplList = [
        {
            category: "Sikap & Karakter Islami (CPL-S)",
            items: [
                "Bertaqwa kepada Allah SWT dan menjunjung tinggi nilai-nilai syariat Islam berdasarkan Al-Qur'an dan As-Sunnah.",
                "Memiliki integritas moral, amanah, dan keteladanan ruhiyah khas Jam'iyyah Persatuan Islam.",
                "Menunjukkan komitmen tinggi terhadap kemajuan peradaban umat melalui pendidikan generasi awal.",
            ],
        },
        {
            category: "Penguasaan Pengetahuan (CPL-P)",
            items: [
                "Menguasai konsep teoritis psikologi perkembangan anak, neurosains usia dini, dan pedagogi fitrah.",
                "Memahami regulasi nasional PAUD, standar kurikulum terpadu, dan instrumen akreditasi kelembagaan.",
                "Menguasai prinsip ergonomi dan standar higienitas dalam perancangan lingkungan dan mainan anak.",
            ],
        },
        {
            category: "Keterampilan Khusus (CPL-KK)",
            items: [
                "Mampu memproduksi media APE inovatif dari bahan kayu, tekstil flanel, dan loose parts ramah lingkungan.",
                "Mampu melaksanakan simulasi microteaching dengan performa pedagogi teruji secara audio-visual.",
                "Mampu melakukan asesmen deteksi dini gangguan sensori-motorik dan merancang stimulasi individual.",
            ],
        },
        {
            category: "Keterampilan Umum (CPL-KU)",
            items: [
                "Mampu menerapkan pemikiran logis, kritis, sistematis, dan inovatif dalam konteks riset terapan PAUD.",
                "Mampu mengambil keputusan manajerial yang tepat berdasarkan analisis data dan observasi lapangan.",
                "Mampu berkomunikasi efektif secara lisan maupun tertulis dengan orang tua, anak, dan masyarakat luas.",
            ],
        },
    ];

    return (
        <PublicLayout>
            <Head>
                <title>{`Profil Lulusan & Prospek Karir - ${siteConfig.programName} ${siteConfig.institutionName}`}</title>
                <meta
                    name="description"
                    content={`Profil lulusan, peluang karir, capaian pembelajaran (CPL), dan skema sertifikasi S1 PIAUD IAI Persis Bandung. Siap berkarir sebagai pendidik profesional, manajer PAUD, desainer APE, dan konsultan parenting.`}
                />
            </Head>

            {/* 1. Header Banner */}
            <div data-section="header" className="bg-[#0A3427] text-white py-12 md:py-16 border-b border-[#E3DAC7]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-white/70 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span className="text-white/40">/</span>
                        <Link href="/akademik" className="hover:text-white transition-colors">Akademik</Link>
                        <span className="text-white/40">/</span>
                        <span className="text-white font-medium">Profil Lulusan &amp; Karir</span>
                    </nav>
                    <div className="inline-block px-3 py-1 bg-white/10 rounded-lg text-xs font-semibold text-[#E3DAC7] tracking-wider uppercase mb-3">
                        Relevansi &amp; Daya Saing Kerja
                    </div>
                    <h1 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight ${inView.header ? 'animate-slide-left' : ''}`}>
                        Profil Lulusan &amp; Peluang Karir Masa Depan
                    </h1>
                    <p className={`mt-3 text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed ${inView.header ? 'animate-slide-left delay-1' : ''}`}>
                        Lulusan S1 PIAUD IAI Persis Bandung dipersiapkan menjadi praktisi unggul bergelar Sarjana Pendidikan (S.Pd) yang dibekali sertifikasi kompetensi pedagogik, keahlian technopreneur media anak, dan akhlak Qur'ani.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

                {/* 2. Key Metrics & Degree Strip */}
                <section data-section="metrics" className={inView.metrics ? 'animate-slide-up' : ''}>
                    <div className="neu-card rounded-2xl p-6 sm:p-8 border border-[#E3DAC7] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-piaud-slate-muted uppercase tracking-wider block">Gelar Akademik</span>
                            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C3A]">S.Pd</div>
                            <span className="text-[11px] text-piaud-slate-muted block">Sarjana Pendidikan Islam</span>
                        </div>
                        <div className="space-y-1 border-l border-[#E3DAC7]/80">
                            <span className="text-xs font-bold text-piaud-slate-muted uppercase tracking-wider block">Beban Studi</span>
                            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C2613A]">144 SKS</div>
                            <span className="text-[11px] text-piaud-slate-muted block">8 Semester Reguler / Karyawan</span>
                        </div>
                        <div className="space-y-1 border-l border-[#E3DAC7]/80">
                            <span className="text-xs font-bold text-piaud-slate-muted uppercase tracking-wider block">Pilar Karir</span>
                            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C3A]">4 Jalur Utama</div>
                            <span className="text-[11px] text-piaud-slate-muted block">Pendidik, Manajer, Desainer, Konsultan</span>
                        </div>
                        <div className="space-y-1 border-l border-[#E3DAC7]/80">
                            <span className="text-xs font-bold text-piaud-slate-muted uppercase tracking-wider block">Jaringan Mitra</span>
                            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C2613A]">100+ RA &amp; TK</div>
                            <span className="text-[11px] text-piaud-slate-muted block">Mitra Magang &amp; Serapan Kerja</span>
                        </div>
                    </div>
                </section>

                {/* 3. Deep Dive 4 Profil Utama */}
                <section data-section="profiles" className="space-y-8">
                    <div className={`text-center max-w-2xl mx-auto space-y-2 ${inView.profiles ? 'animate-slide-up' : ''}`}>
                        <span className="text-xs font-bold tracking-widest text-[#C2613A] uppercase block">
                            Bidang Pekerjaan &amp; Keahlian
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                            Empat Profil Utama Lulusan
                        </h2>
                        <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                            Kurikulum dirancang holistik agar lulusan tidak hanya terpaku menjadi pengajar di kelas, tetapi juga mampu memimpin institusi dan berwirausaha secara mandiri.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {profiles.map((p, idx) => (
                            <div key={idx} className={inView.profiles ? `animate-slide-up delay-${(idx % 2) + 1}` : ''}>
                                <div className="neu-card card-interactive rounded-2xl p-7 sm:p-8 border border-[#E3DAC7] space-y-6 h-full flex flex-col justify-between group">
                                    <div className="space-y-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-[#F2ECE0] flex items-center justify-center text-3xl shadow-soft group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                                {p.icon}
                                            </div>
                                            <span className="inline-block px-3 py-1 bg-[#F2ECE0] border border-[#E3DAC7] rounded-lg text-[10px] font-bold text-[#0F4C3A] tracking-wider uppercase">
                                                {p.badge}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="font-serif font-bold text-xl text-piaud-slate group-hover:text-[#0F4C3A] transition-colors leading-snug">
                                                {p.title}
                                            </h3>
                                            <p className="text-xs font-semibold text-[#C2613A] mt-1">
                                                Peran: {p.role}
                                            </p>
                                            <p className="text-xs sm:text-sm text-piaud-slate-muted mt-2 leading-relaxed">
                                                {p.desc}
                                            </p>
                                        </div>

                                        {/* Kompetensi Inti */}
                                        <div className="space-y-2 pt-2 border-t border-[#E3DAC7]">
                                            <span className="text-xs font-bold text-piaud-slate block">
                                                Kompetensi &amp; Keahlian Unggulan:
                                            </span>
                                            <ul className="space-y-1.5">
                                                {p.competencies.map((c, i) => (
                                                    <li key={i} className="text-xs text-piaud-slate-muted flex items-start gap-2">
                                                        <span className="text-[#0F4C3A] font-bold mt-0.5">✓</span>
                                                        <span>{c}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Career Tracks */}
                                    <div className="pt-4 border-t border-[#E3DAC7] space-y-2">
                                        <span className="text-[11px] font-bold text-piaud-slate-muted uppercase tracking-wider block">
                                            Prospek Penempatan &amp; Karir:
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {p.careerTracks.map((track, i) => (
                                                <span key={i} className="px-2.5 py-1 bg-[#FAF6EC] border border-[#E3DAC7] rounded-md text-[11px] font-medium text-piaud-slate">
                                                    {track}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Capaian Pembelajaran Lulusan (CPL) */}
                <section data-section="cpl" className="space-y-8">
                    <div className={`text-center max-w-2xl mx-auto space-y-2 ${inView.cpl ? 'animate-slide-up' : ''}`}>
                        <span className="text-xs font-bold tracking-widest text-[#C2613A] uppercase block">
                            Standar Mutu LAMDIK
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                            Capaian Pembelajaran Lulusan (CPL)
                        </h2>
                        <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                            Parameter kualifikasi lulusan mengacu pada Kerangka Kualifikasi Nasional Indonesia (KKNI) Level 6 dan standar Asosiasi PGPAUD/PIAUD se-Indonesia.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {cplList.map((cpl, idx) => (
                            <div key={idx} className={inView.cpl ? `animate-slide-up delay-${idx + 1}` : ''}>
                                <div className="neu-card rounded-2xl p-6 border border-[#E3DAC7] space-y-4 h-full bg-[#FAF6EC]">
                                    <div className="flex items-center gap-3 border-b border-[#E3DAC7] pb-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#0F4C3A] text-white flex items-center justify-center font-bold text-xs">
                                            0{idx + 1}
                                        </div>
                                        <h3 className="font-serif font-bold text-base text-piaud-slate">
                                            {cpl.category}
                                        </h3>
                                    </div>
                                    <ul className="space-y-2.5">
                                        {cpl.items.map((item, i) => (
                                            <li key={i} className="text-xs text-piaud-slate-muted flex items-start gap-2.5 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#C2613A] mt-1.5 flex-shrink-0"></span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Skema Sertifikasi Pendamping Ijazah (.neu-card-emerald) */}
                <section data-section="skpi" className={inView.skpi ? 'animate-slide-up' : ''}>
                    <div className="neu-card-emerald rounded-2xl p-7 sm:p-10 md:p-12 border border-[#0A3427] space-y-8 text-white shadow-[0_12px_28px_rgba(10,52,39,0.35)]">
                        <div className="max-w-2xl space-y-2">
                            <span className="text-xs font-bold tracking-widest text-[#E3DAC7] uppercase block">
                                Nilai Tambah Alumni
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
                                Surat Keterangan Pendamping Ijazah (SKPI)
                            </h2>
                            <p className="text-sm text-white/90 leading-relaxed pt-1">
                                Setiap lulusan tidak hanya membawa ijazah akademik dan transkrip nilai, melainkan dibekali portofolio sertifikasi kompetensi terapan yang diakui oleh mitra kelembagaan:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="bg-white/10 rounded-xl p-6 border border-white/15 space-y-2.5 hover:bg-white/15 transition-colors">
                                <div className="text-2xl">📜</div>
                                <h3 className="font-serif font-bold text-base text-white">Sertifikat Desain Media APE</h3>
                                <p className="text-xs text-white/80 leading-relaxed">
                                    Bukti kompetensi pembuatan alat permainan edukatif kayu, kain flanel, dan loose parts ramah anak sesuai standar ergonomi.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6 border border-white/15 space-y-2.5 hover:bg-white/15 transition-colors">
                                <div className="text-2xl">🎓</div>
                                <h3 className="font-serif font-bold text-base text-white">Sertifikat Pengajaran Sentra</h3>
                                <p className="text-xs text-white/80 leading-relaxed">
                                    Lisensi keahlian manajemen pembelajaran sentra, microteaching berkamera, dan evaluasi capaian fitrah anak usia dini.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6 border border-white/15 space-y-2.5 hover:bg-white/15 transition-colors">
                                <div className="text-2xl">🩺</div>
                                <h3 className="font-serif font-bold text-base text-white">Sertifikat P3K Anak &amp; Sensori</h3>
                                <p className="text-xs text-white/80 leading-relaxed">
                                    Keahlian penanganan kedaruratan kesehatan fisik anak di lingkungan sekolah serta skrining dasar gangguan sensori-motorik.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. CTA & Bottom Nav */}
                <section className="neu-card rounded-2xl p-8 sm:p-10 border border-[#E3DAC7] flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F2ECE0]">
                    <div className="space-y-1 text-center sm:text-left">
                        <h3 className="font-serif font-bold text-lg text-piaud-slate">
                            Ingin Tahu Rincian Mata Kuliah &amp; Fasilitas Praktikum?
                        </h3>
                        <p className="text-xs sm:text-sm text-piaud-slate-muted">
                            Pelajari sebaran kurikulum 144 SKS atau lihat langsung studio laboratorium APE kami.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/akademik#kurikulum"
                            className="neu-btn text-piaud-slate text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer"
                        >
                            <span>Kurikulum &amp; SKS</span>
                            <span className="ml-1.5">→</span>
                        </Link>
                        <Link
                            href="/laboratorium-ape"
                            className="neu-btn-primary text-white text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer"
                        >
                            <span>Studio &amp; Lab APE</span>
                            <span className="ml-1.5">→</span>
                        </Link>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
