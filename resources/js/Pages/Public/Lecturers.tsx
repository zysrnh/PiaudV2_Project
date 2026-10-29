import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Photo } from '@/Components/Public/Photo';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

interface LecturerItem {
    id?: number;
    name: string;
    nip: string;
    role: string;
    expertise: string;
    photoUrl: string;
}

interface LecturersProps {
    dbLecturers?: LecturerItem[];
}

export default function Lecturers({ dbLecturers }: LecturersProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const waLink = createWhatsAppLink("Halo Admin, saya ingin menanyakan jadwal bimbingan atau kontak dosen PIAUD IAI Persis Bandung.");

    const allLecturers: LecturerItem[] = (dbLecturers && dbLecturers.length > 0)
        ? dbLecturers
        : [
            ...siteConfig.lecturers,
            {
                name: "Drs. H. Mamat Rahmat, M.Ag.",
                nip: "197203152002121002",
                role: "Dosen Senior",
                expertise: "Pendidikan Karakter & Pemikiran Jam'iyyah Persis",
                photoUrl: "/images/piaud/team-2.jpg",
            },
            {
                name: "Dian Permana, M.Pd.",
                nip: "198807212019031008",
                role: "Dosen Keahlian Khusus",
                expertise: "Media Pembelajaran Digital & Storytelling AUD",
                photoUrl: "/images/piaud/team-3.jpg",
            },
            {
                name: "Fitri Nurhayati, M.Pd.",
                nip: "199104102021042011",
                role: "Dosen Keahlian Khusus",
                expertise: "Manajemen PAUD Inklusif & Supervisi Kelas",
                photoUrl: "/images/piaud/team-4.jpg",
            },
            {
                name: "Dr. H. Wildan Hasan, M.Pd.I.",
                nip: "197608142006041003",
                role: "Dosen Tamu Pakar",
                expertise: "Filsafat Pendidikan Islam & Kebijakan Kurikulum",
                photoUrl: "/images/piaud/team-1.jpg",
            },
        ];

    const filtered = allLecturers.filter(
        (l) =>
            l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <PublicLayout>
            <Head>
                <title>{`Direktori Dosen & Pakar - ${siteConfig.programName} ${siteConfig.institutionName}`}</title>
                <meta
                    name="description"
                    content={`Direktori lengkap dosen pengampu dan pakar pendidikan anak usia dini S1 PIAUD IAI Persis Bandung.`}
                />
            </Head>

            {/* Header Banner with Breadcrumb */}
            <div className="bg-piaud-emerald-dark text-white py-10 md:py-12 border-b border-piaud-border/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-piaud-ivory/70 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span className="text-piaud-ivory/40">/</span>
                        <span className="text-white font-medium">Direktori Dosen</span>
                    </nav>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                        Dosen Pengampu &amp; Tenaga Pendidik
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-piaud-ivory/85 max-w-2xl leading-relaxed">
                        Akademisi, psikolog tumbuh kembang anak, dan praktisi perancangan media belajar yang berdedikasi membimbing calon sarjana PIAUD.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
                {/* Search Bar & Counter */}
                <div className="bg-piaud-ivory-dark rounded-lg p-4 sm:p-5 border border-piaud-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-piaud-slate">
                        <span className="font-bold text-piaud-emerald text-base">{filtered.length}</span>
                        <span className="text-piaud-slate-muted text-xs sm:text-sm">Dosen &amp; Pakar Tersedia</span>
                    </div>

                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama atau keahlian dosen..."
                            className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 rounded-md border border-piaud-border bg-piaud-ivory focus:outline-none focus:ring-1 focus:ring-piaud-emerald transition-all"
                        />
                        <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
                    </div>
                </div>

                {/* Lecturers Grid with Clean rounded-lg Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filtered.map((lecturer, index) => (
                        <article
                            key={index}
                            className="bg-piaud-ivory rounded-lg p-4 border border-piaud-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-200 group flex flex-col justify-between"
                        >
                            <div>
                                <Photo
                                    src={lecturer.photoUrl}
                                    alt={`Foto ${lecturer.name}`}
                                    aspectRatio="1/1"
                                    className="w-full h-auto rounded-md shadow-soft"
                                />

                                <div className="mt-3.5 space-y-1.5">
                                    <span className="inline-block text-[11px] font-bold tracking-wider text-piaud-terracotta uppercase bg-amber-100/70 px-2 py-0.5 rounded border border-amber-200/60">
                                        {lecturer.role}
                                    </span>
                                    <h3 className="font-serif font-bold text-base text-piaud-slate leading-snug group-hover:text-piaud-emerald transition-colors">
                                        {lecturer.name}
                                    </h3>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-piaud-border/70 text-xs space-y-1">
                                <p className="font-mono text-[11px] text-slate-500">
                                    NIP: {lecturer.nip}
                                </p>
                                <p className="text-piaud-slate font-semibold text-xs leading-relaxed">
                                    {lecturer.expertise}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Research Focus Card */}
                <section className="bg-piaud-ivory-dark rounded-lg p-6 sm:p-10 border border-piaud-border shadow-card">
                    <div className="max-w-2xl space-y-2">
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate leading-tight">
                            Fokus Penelitian Unggulan Civitas Akademika
                        </h2>
                        <p className="text-xs sm:text-sm text-piaud-slate-muted leading-relaxed">
                            Riset dosen PIAUD IAI Persis menitikberatkan pada integrasi kurikulum Islam, rekayasa alat peraga edukatif ramah anak, dan kesehatan psikososial anak di satuan PAUD.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                        <div className="bg-piaud-ivory rounded-md p-5 border border-piaud-border shadow-soft">
                            <span className="text-2xl">🌱</span>
                            <h4 className="font-serif font-bold text-base text-piaud-slate mt-2">Parenting &amp; Fitrah Tauhid</h4>
                            <p className="text-xs text-piaud-slate-muted mt-1 leading-relaxed">Metodologi pengasuhan berbasis Al-Qur'an dan sunnah untuk keluarga muda muslim.</p>
                        </div>
                        <div className="bg-piaud-ivory rounded-md p-5 border border-piaud-border shadow-soft">
                            <span className="text-2xl">🧩</span>
                            <h4 className="font-serif font-bold text-base text-piaud-slate mt-2">Inovasi APE Loose Parts</h4>
                            <p className="text-xs text-piaud-slate-muted mt-1 leading-relaxed">Eksplorasi bahan alam dan daur ulang ramah lingkungan untuk stimulasi sensori motorik.</p>
                        </div>
                        <div className="bg-piaud-ivory rounded-md p-5 border border-piaud-border shadow-soft">
                            <span className="text-2xl">📊</span>
                            <h4 className="font-serif font-bold text-base text-piaud-slate mt-2">Deteksi Dini Tumbuh Kembang</h4>
                            <p className="text-xs text-piaud-slate-muted mt-1 leading-relaxed">Instrumen asesmen perkembangan bahasa, motorik, dan emosi anak usia 0-6 tahun.</p>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
