import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export default function Academic() {
    const [activeTab, setActiveTab] = useState<'sem1_2' | 'sem3_4' | 'sem5_6' | 'sem7_8'>('sem1_2');
    const waLink = createWhatsAppLink("Halo Admin, saya ingin konsultasi mengenai Kurikulum & Silabus S1 PIAUD IAI Persis Bandung.");

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

    const curriculumData = {
        sem1_2: [
            { code: "PIAUD-101", name: "Ulumul Qur'an & Tafsir Ayat AUD", sks: 3, type: "Wajib Prodi" },
            { code: "PIAUD-102", name: "Psikologi Perkembangan Anak Usia Dini", sks: 3, type: "Inti Keilmuan" },
            { code: "PIAUD-103", name: "Filsafat & Teori Pendidikan Islam", sks: 2, type: "Institut" },
            { code: "PIAUD-104", name: "Landasan Pedagogi PAUD", sks: 3, type: "Inti Keilmuan" },
            { code: "PIAUD-105", name: "Bahasa Arab Dasar untuk Anak", sks: 2, type: "Khas Persis" },
            { code: "PIAUD-106", name: "Kesehatan & Gizi Anak Usia Dini", sks: 3, type: "Praktikum" },
            { code: "PIAUD-107", name: "Pancasila & Kewarganegaraan", sks: 2, type: "Nasional" },
        ],
        sem3_4: [
            { code: "PIAUD-201", name: "Metodologi Penanaman Aqidah & Akhlak Usia Emas", sks: 3, type: "Khas Persis" },
            { code: "PIAUD-202", name: "Perancangan Alat Permainan Edukatif (APE)", sks: 3, type: "Lab Praktikum" },
            { code: "PIAUD-203", name: "Pengembangan Motorik Kasar & Halus AUD", sks: 3, type: "Inti Keilmuan" },
            { code: "PIAUD-204", name: "Pengembangan Bahasa & Literasi Awal Anak", sks: 3, type: "Inti Keilmuan" },
            { code: "PIAUD-205", name: "Seni Musik, Gerak & Lagu Anak Islami", sks: 3, type: "Praktikum" },
            { code: "PIAUD-206", name: "Manajemen Kelembagaan RA / TK / PAUD", sks: 3, type: "Manajerial" },
        ],
        sem5_6: [
            { code: "PIAUD-301", name: "Laboratorium Microteaching (Praktik Mengajar)", sks: 4, type: "Lab Unggulan" },
            { code: "PIAUD-302", name: "Deteksi Dini Tumbuh Kembang & Anak Berkebutuhan Khusus", sks: 3, type: "Keahlian" },
            { code: "PIAUD-303", name: "Metodologi Penelitian Pendidikan AUD", sks: 3, type: "Riset" },
            { code: "PIAUD-304", name: "Parenting Islami Berbasis Keluarga", sks: 3, type: "Khas Persis" },
            { code: "PIAUD-305", name: "Technopreneurship Media Edukasi AUD", sks: 3, type: "Kewirausahaan" },
            { code: "PIAUD-306", name: "Asesmen dan Evaluasi Pembelajaran AUD", sks: 3, type: "Inti Keilmuan" },
        ],
        sem7_8: [
            { code: "PIAUD-401", name: "Praktik Pengalaman Lapangan (PPL) Terpadu", sks: 4, type: "Lapangan" },
            { code: "PIAUD-402", name: "Kuliah Kerja Nyata (KKN) Tematik PAUD", sks: 4, type: "Pengabdian" },
            { code: "PIAUD-403", name: "Seminar Proposal Skripsi", sks: 2, type: "Tugas Akhir" },
            { code: "PIAUD-404", name: "Skripsi & Ujian Munaqasyah", sks: 6, type: "Tugas Akhir" },
        ],
    };

    return (
        <PublicLayout>
            <Head>
                <title>{`Akademik & Kurikulum - ${siteConfig.programName} ${siteConfig.institutionName}`}</title>
                <meta
                    name="description"
                    content={`Kurikulum 144 SKS, sebaran mata kuliah semester 1-8, fasilitas lab microteaching, dan profil lulusan S1 PIAUD IAI Persis Bandung.`}
                />
            </Head>

            {/* 1. Header Banner */}
            <div data-section="header" className="bg-[#0A3427] text-white py-12 md:py-16 border-b border-[#E3DAC7]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-white/70 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span className="text-white/40">/</span>
                        <span className="text-white font-medium">Akademik &amp; Kurikulum</span>
                    </nav>
                    <h1 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight ${inView.header ? 'animate-slide-left' : ''}`}>
                        Kurikulum &amp; Ekosistem Akademik
                    </h1>
                    <p className={`mt-3 text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed ${inView.header ? 'animate-slide-left delay-1' : ''}`}>
                        Desain kurikulum 144 SKS yang mengintegrasikan psikologi perkembangan sains mutakhir dengan nilai-nilai ketauhidan khas Jam'iyyah Persatuan Islam.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
                {/* 2. Ringkasan Struktur Akademik (4 Decoupled Cards) */}
                <section data-section="ringkasan" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className={inView.ringkasan ? 'animate-slide-up delay-1' : ''}>
                        <div className="neu-card card-interactive rounded-2xl p-6 group h-full flex flex-col justify-between border border-[#E3DAC7]">
                            <div className="space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-[#F2ECE0] flex items-center justify-center text-2xl shadow-soft transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    📚
                                </div>
                                <h3 className="font-serif font-bold text-xl text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                    144 SKS
                                </h3>
                                <p className="text-xs text-piaud-slate-muted leading-relaxed">
                                    Beban total studi sarjana yang tersusun proporsional antara teori keislaman dan praktik laboratorium.
                                </p>
                            </div>
                            <div className="pt-3 mt-4 border-t border-[#E3DAC7] text-[11px] font-bold text-[#0F4C3A]">
                                Struktur Kurikulum Nasional &amp; Prodi
                            </div>
                        </div>
                    </div>

                    <div className={inView.ringkasan ? 'animate-slide-up delay-2' : ''}>
                        <div className="neu-card card-interactive rounded-2xl p-6 group h-full flex flex-col justify-between border border-[#E3DAC7]">
                            <div className="space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-[#F2ECE0] flex items-center justify-center text-2xl shadow-soft transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    ⏱️
                                </div>
                                <h3 className="font-serif font-bold text-xl text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                    8 Semester
                                </h3>
                                <p className="text-xs text-piaud-slate-muted leading-relaxed">
                                    Masa studi normal 4 tahun dengan bimbingan dosen wali aktif dan evaluasi capaian per semester.
                                </p>
                            </div>
                            <div className="pt-3 mt-4 border-t border-[#E3DAC7] text-[11px] font-bold text-[#0F4C3A]">
                                Masa Studi Efektif &amp; Terarah
                            </div>
                        </div>
                    </div>

                    <div className={inView.ringkasan ? 'animate-slide-up delay-3' : ''}>
                        <div className="neu-card card-interactive rounded-2xl p-6 group h-full flex flex-col justify-between border border-[#E3DAC7]">
                            <div className="space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-[#F2ECE0] flex items-center justify-center text-2xl shadow-soft transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    🎓
                                </div>
                                <h3 className="font-serif font-bold text-xl text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                    S.Pd.
                                </h3>
                                <p className="text-xs text-piaud-slate-muted leading-relaxed">
                                    Gelar resmi Sarjana Pendidikan dengan kompetensi pedagogik guru AUD profesional dan bersertifikasi.
                                </p>
                            </div>
                            <div className="pt-3 mt-4 border-t border-[#E3DAC7] text-[11px] font-bold text-[#C2613A]">
                                Ijazah Resmi Kemenag &amp; BAN-PT
                            </div>
                        </div>
                    </div>

                    <div className={inView.ringkasan ? 'animate-slide-up delay-4' : ''}>
                        <div className="neu-card card-interactive rounded-2xl p-6 group h-full flex flex-col justify-between border border-[#E3DAC7]">
                            <div className="space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-[#F2ECE0] flex items-center justify-center text-2xl shadow-soft transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    🔬
                                </div>
                                <h3 className="font-serif font-bold text-xl text-piaud-slate group-hover:text-[#0F4C3A] transition-colors">
                                    Lab Terpadu
                                </h3>
                                <p className="text-xs text-piaud-slate-muted leading-relaxed">
                                    Fasilitas mandiri: Microteaching berkamera, workshop APE, dan studio loose parts ramah anak.
                                </p>
                            </div>
                            <div className="pt-3 mt-4 border-t border-[#E3DAC7] text-[11px] font-bold text-[#0F4C3A]">
                                Praktikum Aplikatif Berkualitas
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Sebaran Mata Kuliah Per Tingkat / Semester */}
                <section id="kurikulum" data-section="kurikulum" className="neu-card rounded-2xl p-6 sm:p-10 border border-[#E3DAC7] space-y-6 bg-[#FAF6EC]">
                    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E3DAC7] ${inView.kurikulum ? 'animate-slide-left' : ''}`}>
                        <div>
                            <span className="text-xs font-bold tracking-widest text-[#C2613A] uppercase block">
                                Struktur Pembelajaran
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                Sebaran Mata Kuliah Kurikulum S1 PIAUD
                            </h2>
                            <p className="text-xs sm:text-sm text-piaud-slate-muted mt-1">
                                Klik tingkat semester untuk melihat daftar mata kuliah, kode, SKS, dan kategori keilmuan.
                            </p>
                        </div>
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] transition-colors cursor-pointer shrink-0"
                        >
                            <span>Minta Silabus Lengkap (PDF)</span>
                            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out">→</span>
                        </a>
                    </div>

                    {/* Flat Tabs */}
                    <div className="flex flex-wrap gap-2.5 pb-2">
                        {[
                            { key: 'sem1_2', label: 'Tingkat 1 (Semester 1 & 2)' },
                            { key: 'sem3_4', label: 'Tingkat 2 (Semester 3 & 4)' },
                            { key: 'sem5_6', label: 'Tingkat 3 (Semester 5 & 6)' },
                            { key: 'sem7_8', label: 'Tingkat 4 (Semester 7 & 8)' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key as any)}
                                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                                    activeTab === tab.key
                                        ? 'bg-[#0F4C3A] text-white font-bold shadow-sm'
                                        : 'bg-[#FAF6EC] text-piaud-slate border border-[#E3DAC7] hover:bg-[#F2ECE0]'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Table with Flat Clean Styling & Staggered Row Animation on Tab Switch */}
                    <div className="overflow-x-auto rounded-xl border border-[#E3DAC7] bg-[#FAF6EC]">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-[#E3DAC7] text-xs text-piaud-slate-muted uppercase font-bold bg-[#F2ECE0]">
                                    <th className="py-3.5 px-4 sm:px-5">Kode MK</th>
                                    <th className="py-3.5 px-4 sm:px-5">Nama Mata Kuliah</th>
                                    <th className="py-3.5 px-4 sm:px-5 text-center">Beban SKS</th>
                                    <th className="py-3.5 px-4 sm:px-5">Kategori</th>
                                </tr>
                            </thead>
                            <tbody key={activeTab} className="divide-y divide-[#E3DAC7]/70 text-piaud-slate">
                                {curriculumData[activeTab].map((item, index) => (
                                    <tr
                                        key={item.code}
                                        style={{ animationDelay: `${index * 45}ms` }}
                                        className="hover:bg-[#F2ECE0]/60 transition-colors animate-table-row"
                                    >
                                        <td className="py-3.5 px-4 sm:px-5 font-mono text-xs text-slate-500 font-semibold">{item.code}</td>
                                        <td className="py-3.5 px-4 sm:px-5 font-medium text-piaud-slate">{item.name}</td>
                                        <td className="py-3.5 px-4 sm:px-5 text-center font-bold text-[#0F4C3A]">{item.sks} SKS</td>
                                        <td className="py-3.5 px-4 sm:px-5">
                                            <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#FAF6EC] text-slate-700 border border-[#E3DAC7]">
                                                {item.type}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 4. Profil Lulusan & Peluang Karir (4 Decoupled Cards) */}
                <section id="profil-lulusan" data-section="profil-lulusan" className="space-y-8">
                    <div className={`text-center max-w-2xl mx-auto space-y-2 ${inView['profil-lulusan'] ? 'animate-slide-up' : ''}`}>
                        <span className="text-xs font-bold tracking-widest text-[#C2613A] uppercase block">
                            Relevansi Kompetensi
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                            Profil Lulusan &amp; Peluang Karir Masa Depan
                        </h2>
                        <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                            Lulusan S1 PIAUD IAI Persis dibekali kompetensi komprehensif sehingga siap berkiprah di sektor pendidikan, kepemimpinan kelembagaan, dan industri kreatif edukasi.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: "👩‍🏫",
                                title: "Pendidik RA / TK / PAUD Profesional",
                                desc: "Guru kelas dan wali sentra berkarakter Islami yang mampu merancang media pembelajaran ramah anak dan kurikulum berbasis fitrah.",
                            },
                            {
                                icon: "🏢",
                                title: "Kepala & Pengelola Lembaga PAUD",
                                desc: "Pimpinan manajerial yang menguasai akreditasi PAUD, tata kelola keuangan, dan supervisi pedagogik satuan pendidikan usia dini.",
                            },
                            {
                                icon: "🧸",
                                title: "Technopreneur & Desainer Media APE",
                                desc: "Wirausahawan kreatif pembuat Alat Permainan Edukatif, buku cerita bergambar Islami, serta konten digital edukasi anak.",
                            },
                            {
                                icon: "🤝",
                                title: "Konsultan Parenting Islami",
                                desc: "Fasilitator dan konselor tumbuh kembang keluarga yang mendampingi orang tua dalam penanganan problem pengasuhan anak usia emas.",
                            },
                        ].map((career, i) => (
                            <div key={i} className={inView['profil-lulusan'] ? `animate-slide-up delay-${i + 1}` : ''}>
                                <div className="neu-card card-interactive rounded-2xl p-6 border border-[#E3DAC7] space-y-3 group h-full flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <div className="w-12 h-12 rounded-xl bg-[#F2ECE0] flex items-center justify-center text-2xl shadow-soft transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                            {career.icon}
                                        </div>
                                        <h3 className="font-serif font-bold text-base text-piaud-slate group-hover:text-[#0F4C3A] transition-colors leading-snug">
                                            {career.title}
                                        </h3>
                                        <p className="text-xs text-piaud-slate-muted leading-relaxed">
                                            {career.desc}
                                        </p>
                                    </div>
                                    <div className="pt-3 border-t border-[#E3DAC7] text-[11px] font-bold text-[#0F4C3A]">
                                        Prospek Karir Utama
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center pt-2">
                        <Link
                            href="/profil-lulusan"
                            className="neu-btn text-piaud-slate text-xs font-bold px-6 py-3 rounded-xl transition-all hover:text-[#0F4C3A] flex items-center gap-2 cursor-pointer"
                        >
                            <span>Eksplorasi Detail CPL &amp; Prospek Karir Selengkapnya</span>
                            <span className="text-[#0F4C3A]">→</span>
                        </Link>
                    </div>
                </section>

                {/* 5. Laboratorium & Fasilitas Pendukung (.neu-card-emerald) */}
                <section id="lab" data-section="lab" className={inView.lab ? 'animate-slide-up' : ''}>
                    <div className="neu-card-emerald rounded-2xl p-7 sm:p-10 md:p-12 border border-[#0A3427] space-y-8 text-white shadow-[0_12px_28px_rgba(10,52,39,0.35)]">
                        <div className="max-w-2xl space-y-2">
                            <span className="text-xs font-bold tracking-widest text-[#E3DAC7] uppercase block">
                                Fasilitas Unggulan Laboratorium
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
                                Laboratorium Microteaching &amp; Studio APE Terpadu
                            </h2>
                            <p className="text-sm text-white/90 leading-relaxed pt-1">
                                Laboratorium dirancang khusus menyerupai lingkungan kelas RA dan sentra bermain nyata, lengkap dengan cermin satu arah (one-way mirror), kamera rekam simulasi, dan ribuan bahan loose parts edukatif.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="bg-white/10 rounded-xl p-6 border border-white/15 space-y-2 hover:bg-white/15 transition-colors">
                                <h3 className="font-serif font-bold text-base text-white">Studio Microteaching</h3>
                                <p className="text-xs text-white/80 leading-relaxed">
                                    Fasilitas simulasi mengajar dengan peralatan audio-visual modern untuk evaluasi performa pedagogik mahasiswa secara objektif.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6 border border-white/15 space-y-2 hover:bg-white/15 transition-colors">
                                <h3 className="font-serif font-bold text-base text-white">Workshop Kreasi APE</h3>
                                <p className="text-xs text-white/80 leading-relaxed">
                                    Ruang produksi media belajar, mainan kayu ramah anak, puzzle balok, dan boneka tangan bercerita berbasis technopreneur.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6 border border-white/15 space-y-2 hover:bg-white/15 transition-colors">
                                <h3 className="font-serif font-bold text-base text-white">Pojok Asesmen &amp; Konseling</h3>
                                <p className="text-xs text-white/80 leading-relaxed">
                                    Ruang observasi perilaku dan simulasi deteksi dini tumbuh kembang anak usia dini berkebutuhan khusus secara profesional.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15">
                            <p className="text-xs text-white/80">
                                Ingin melihat katalog produk APE karya mahasiswa dan alur riset praktikum?
                            </p>
                            <Link
                                href="/laboratorium-ape"
                                className="bg-white text-[#0F4C3A] hover:bg-[#E3DAC7] text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-soft"
                            >
                                <span>Katalog Karya APE &amp; Detail Studio</span>
                                <span>→</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 6. Bottom Navigation & CTA Row */}
                <section className="neu-card rounded-2xl p-8 sm:p-10 border border-[#E3DAC7] flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F2ECE0]">
                    <div className="space-y-1 text-center sm:text-left">
                        <h3 className="font-serif font-bold text-lg text-piaud-slate">
                            Tertarik Bergabung dengan S1 PIAUD IAI Persis Bandung?
                        </h3>
                        <p className="text-xs sm:text-sm text-piaud-slate-muted">
                            Konsultasikan konversi SKS, jadwal perkuliahan reguler/guru, atau pendaftaran mahasiswa baru.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/dosen"
                            className="neu-btn text-piaud-slate text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer"
                        >
                            <span>Lihat Dosen Pengampu</span>
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
