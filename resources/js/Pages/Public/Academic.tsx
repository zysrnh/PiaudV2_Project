import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export default function Academic() {
    const [activeTab, setActiveTab] = useState<'sem1_2' | 'sem3_4' | 'sem5_6' | 'sem7_8'>('sem1_2');
    const waLink = createWhatsAppLink("Halo Admin, saya ingin konsultasi mengenai Kurikulum & Silabus S1 PIAUD IAI Persis Bandung.");

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
                    content={`Kurikulum 144 SKS, sebaran mata kuliah semester 1-8, fasilitas lab microteaching, dan profil lulusan S1 PIAUD.`}
                />
            </Head>

            {/* Header Banner with Breadcrumb */}
            <div className="bg-gradient-to-r from-piaud-emerald-dark via-piaud-emerald to-piaud-emerald-light text-white py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-white/80 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span>/</span>
                        <span className="text-white font-semibold">Akademik &amp; Kurikulum</span>
                    </nav>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                        Kurikulum &amp; Ekosistem Akademik
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                        Desain kurikulum 144 SKS yang mengintegrasikan psikologi perkembangan sains mutakhir dengan nilai-nilai ketauhidan khas Jam'iyyah Persis.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
                {/* 1. Ringkasan Struktur Akademik */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-piaud-ivory-dark rounded-lg p-5 border border-piaud-border shadow-soft hover:shadow-card transition-all">
                        <span className="text-2xl">📚</span>
                        <h3 className="font-serif font-bold text-lg text-piaud-slate mt-2">144 SKS</h3>
                        <p className="text-xs text-piaud-slate-muted mt-1">Beban total studi sarjana yang tersusun proporsional teori dan praktik lab.</p>
                    </div>

                    <div className="bg-piaud-ivory-dark rounded-lg p-5 border border-piaud-border shadow-soft hover:shadow-card transition-all">
                        <span className="text-2xl">⏱️</span>
                        <h3 className="font-serif font-bold text-lg text-piaud-slate mt-2">8 Semester</h3>
                        <p className="text-xs text-piaud-slate-muted mt-1">Masa studi normal 4 tahun dengan pendampingan dosen wali aktif.</p>
                    </div>

                    <div className="bg-piaud-ivory-dark rounded-lg p-5 border border-piaud-border shadow-soft hover:shadow-card transition-all">
                        <span className="text-2xl">🎓</span>
                        <h3 className="font-serif font-bold text-lg text-piaud-slate mt-2">S.Pd.</h3>
                        <p className="text-xs text-piaud-slate-muted mt-1">Gelar resmi Sarjana Pendidikan dengan kompetensi guru AUD profesional.</p>
                    </div>

                    <div className="bg-piaud-ivory-dark rounded-lg p-5 border border-piaud-border shadow-soft hover:shadow-card transition-all">
                        <span className="text-2xl">🔬</span>
                        <h3 className="font-serif font-bold text-lg text-piaud-slate mt-2">Lab Terpadu</h3>
                        <p className="text-xs text-piaud-slate-muted mt-1">Praktikum Microteaching, loose parts, dan perancangan APE mandiri.</p>
                    </div>
                </section>

                {/* 2. Sebaran Mata Kuliah Per Tingkat / Semester */}
                <section id="kurikulum" className="bg-piaud-ivory-dark rounded-lg p-6 sm:p-10 border border-piaud-border shadow-card">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-3 border-b border-piaud-border">
                        <div>
                            <span className="inline-block bg-piaud-emerald/10 text-piaud-emerald text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-piaud-emerald/20 mb-2">
                                Struktur Mata Kuliah
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                Sebaran Mata Kuliah Kurikulum S1 PIAUD
                            </h2>
                        </div>
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-piaud-emerald hover:text-piaud-emerald-dark"
                        >
                            <span>Minta Silabus Lengkap (PDF)</span>
                            <span>&rarr;</span>
                        </a>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 border-b border-piaud-border pb-3 mb-6">
                        {[
                            { key: 'sem1_2', label: 'Tingkat 1 (Semester 1 & 2)' },
                            { key: 'sem3_4', label: 'Tingkat 2 (Semester 3 & 4)' },
                            { key: 'sem5_6', label: 'Tingkat 3 (Semester 5 & 6)' },
                            { key: 'sem7_8', label: 'Tingkat 4 (Semester 7 & 8)' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as any)}
                                className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all duration-150 ${
                                    activeTab === tab.key
                                        ? 'bg-piaud-emerald text-piaud-ivory shadow-soft font-bold'
                                        : 'bg-piaud-ivory text-piaud-slate border border-piaud-border hover:bg-piaud-ivory/60'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto bg-piaud-ivory rounded-md border border-piaud-border">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-piaud-border text-xs text-piaud-slate-muted uppercase font-bold bg-piaud-ivory-dark">
                                    <th className="py-3 px-4">Kode MK</th>
                                    <th className="py-3 px-4">Nama Mata Kuliah</th>
                                    <th className="py-3 px-4 text-center">Beban SKS</th>
                                    <th className="py-3 px-4">Kategori</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-piaud-border/60 text-piaud-slate">
                                {curriculumData[activeTab].map((item, index) => (
                                    <tr key={index} className="hover:bg-piaud-ivory-dark/40 transition-colors">
                                        <td className="py-3 px-4 font-mono text-xs text-slate-500 font-semibold">{item.code}</td>
                                        <td className="py-3 px-4 font-medium text-piaud-slate">{item.name}</td>
                                        <td className="py-3 px-4 text-center font-bold text-piaud-emerald">{item.sks} SKS</td>
                                        <td className="py-3 px-4">
                                            <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-piaud-ivory-dark text-slate-700 border border-piaud-border">
                                                {item.type}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 3. Profil Lulusan & Peluang Karir */}
                <section id="profil-lulusan" className="bg-piaud-ivory-dark rounded-lg p-6 sm:p-10 border border-piaud-border shadow-card space-y-6">
                    <div>
                        <span className="inline-block bg-amber-100/80 text-piaud-terracotta text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-amber-200 mb-2">
                            Orientasi Karir
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                            Profil Lulusan &amp; Peluang Karir Masa Depan
                        </h2>
                        <p className="text-xs sm:text-sm text-piaud-slate-muted max-w-2xl mt-1">
                            Lulusan S1 PIAUD IAI Persis dibekali kompetensi komprehensif sehingga siap berkiprah di berbagai sektor pendidikan, kepemimpinan kelembagaan, dan industri kreatif edukasi.
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
                            <div key={i} className="bg-piaud-ivory rounded-md p-5 border border-piaud-border shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all space-y-2">
                                <span className="text-2xl">{career.icon}</span>
                                <h3 className="font-serif font-bold text-base text-piaud-slate">{career.title}</h3>
                                <p className="text-xs text-piaud-slate-muted leading-relaxed">{career.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Laboratorium & Fasilitas Pendukung */}
                <section id="lab" className="bg-piaud-emerald text-piaud-ivory rounded-lg p-6 sm:p-10 shadow-card space-y-6 border border-piaud-emerald-dark">
                    <div className="max-w-2xl">
                        <span className="inline-block bg-black/20 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-3">
                            Fasilitas Unggulan
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
                            Laboratorium Microteaching &amp; Studio APE Terpadu
                        </h2>
                        <p className="text-sm text-piaud-ivory/90 leading-relaxed mt-2">
                            Laboratorium dirancang khusus menyerupai lingkungan kelas RA dan sentra bermain nyata, lengkap dengan cermin satu arah (one-way mirror), kamera rekam simulasi, dan ribuan bahan loose parts edukatif.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                        <div className="bg-white/10 rounded-md p-5 border border-white/15 space-y-2">
                            <h4 className="font-serif font-bold text-base text-white">Studio Microteaching</h4>
                            <p className="text-xs text-white/80 leading-relaxed">Fasilitas simulasi mengajar dengan peralatan audio-visual modern untuk evaluasi penampilan mengajar mahasiswa.</p>
                        </div>
                        <div className="bg-white/10 rounded-md p-5 border border-white/15 space-y-2">
                            <h4 className="font-serif font-bold text-base text-white">Workshop Kreasi APE</h4>
                            <p className="text-xs text-white/80 leading-relaxed">Ruang workshop pembuatan media belajar, mainan kayu ramah anak, puzzle balok, dan boneka tangan bercerita.</p>
                        </div>
                        <div className="bg-white/10 rounded-md p-5 border border-white/15 space-y-2">
                            <h4 className="font-serif font-bold text-base text-white">Pojok Asesmen &amp; Konseling</h4>
                            <p className="text-xs text-white/80 leading-relaxed">Ruang observasi perilaku dan simulasi deteksi dini tumbuh kembang anak usia dini berkebutuhan khusus.</p>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
