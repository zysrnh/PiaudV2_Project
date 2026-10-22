import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Photo } from '@/Components/Public/Photo';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export default function Profile() {
    const waLink = createWhatsAppLink("Halo Admin, saya ingin mengetahui lebih banyak tentang Profil Prodi S1 PIAUD IAI Persis Bandung.");

    return (
        <PublicLayout>
            <Head>
                <title>{`Profil Program Studi - ${siteConfig.programName} ${siteConfig.institutionName}`}</title>
                <meta
                    name="description"
                    content={`Profil resmi, visi, misi, dan pimpinan Program Studi S1 PIAUD IAI Persis Bandung.`}
                />
            </Head>

            {/* Header Banner with Breadcrumb */}
            <div className="bg-gradient-to-r from-piaud-emerald-dark via-piaud-emerald to-piaud-emerald-light text-white py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-white/80 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span>/</span>
                        <span className="text-white font-semibold">Profil Program Studi</span>
                    </nav>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                        Profil &amp; Kelembagaan Prodi
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                        Mengenal lebih dekat sejarah, visi misi keislaman, pimpinan, dan komitmen Program Studi S1 PIAUD IAI Persis Bandung dalam mencetak pendidik usia emas.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
                {/* 1. Sambutan Kaprodi */}
                <section id="sambutan" className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-4">
                            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-soft">
                                <Photo
                                    src={siteConfig.kaprodi.photoUrl}
                                    alt={`Foto ${siteConfig.kaprodi.name}`}
                                    aspectRatio="3/4"
                                    className="w-full h-auto rounded-xl shadow-soft"
                                />
                                <div className="mt-3.5 space-y-1 text-center">
                                    <h3 className="font-serif font-bold text-lg text-piaud-slate">
                                        {siteConfig.kaprodi.name}
                                    </h3>
                                    <p className="text-xs text-piaud-terracotta font-bold">
                                        {siteConfig.kaprodi.title}
                                    </p>
                                    <p className="text-xs text-piaud-slate-muted">
                                        Fakultas Tarbiyah · IAI Persis Bandung
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-8 space-y-5">
                            <span className="inline-block bg-emerald-50 text-piaud-emerald text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                Kata Pengantar
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate leading-snug">
                                Melahirkan Pendidik yang Menanamkan Tauhid &amp; Adab Sejak Usia Emas
                            </h2>
                            <blockquote className="font-serif text-lg text-piaud-slate/90 italic border-l-4 border-piaud-terracotta pl-4 py-1">
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
                <section id="visi-misi" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Visi Card */}
                    <div className="lg:col-span-5 bg-gradient-to-br from-piaud-emerald to-piaud-emerald-dark text-white rounded-3xl p-8 sm:p-10 shadow-card-hover flex flex-col justify-between">
                        <div className="space-y-4">
                            <span className="inline-block bg-white/10 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
                                Visi Utama
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                                Visi Program Studi S1 PIAUD
                            </h2>
                            <p className="text-sm sm:text-base text-white/95 leading-relaxed pt-2">
                                &ldquo;Menjadi program studi yang unggul dan kompetitif di tingkat nasional dalam pengembangan ilmu pendidikan Islam anak usia dini yang berkarakter Qur'ani dan berjiwa technopreneur edukatif pada tahun 2030.&rdquo;
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/20 text-xs text-white/80 space-y-1">
                            <p className="font-semibold text-white">Target Capaian 2030:</p>
                            <p>Akreditasi Unggul · Pusat Riset APE Berkelanjutan · Kemitraan PAUD Nasional</p>
                        </div>
                    </div>

                    {/* Misi Card */}
                    <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 space-y-6">
                        <div>
                            <span className="inline-block bg-amber-50 text-piaud-terracotta text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                                Rencana Strategis
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                                Misi Program Studi
                            </h2>
                        </div>

                        <div className="space-y-4">
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
                                <div key={misi.no} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-piaud-emerald font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-soft">
                                        {misi.no}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-serif font-bold text-base text-piaud-slate">
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
                </section>

                {/* 3. Nilai Dasar & Legalitas */}
                <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-card">
                    <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                        <span className="inline-block bg-emerald-50 text-piaud-emerald text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                            Kredibilitas Institusi
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-piaud-slate">
                            Legalitas &amp; Akreditasi Resmi
                        </h2>
                        <p className="text-sm text-piaud-slate-muted">
                            Program Studi S1 PIAUD beroperasi penuh di bawah naungan Kementerian Agama Republik Indonesia dan LAMDIK.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 text-center space-y-2 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
                            <span className="text-3xl">🏛️</span>
                            <h3 className="font-serif font-bold text-base text-piaud-slate">Izin Operasional</h3>
                            <p className="text-xs text-piaud-slate-muted">Kementerian Agama RI &amp; Dirjen Pendis</p>
                            <span className="inline-block text-[11px] font-semibold text-piaud-emerald bg-emerald-50 px-2 py-0.5 rounded-full">Resmi &amp; Terdaftar</span>
                        </div>

                        <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 text-center space-y-2 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
                            <span className="text-3xl">📜</span>
                            <h3 className="font-serif font-bold text-base text-piaud-slate">Akreditasi Prodi</h3>
                            <p className="text-xs text-piaud-slate-muted">{siteConfig.accreditation.status} oleh {siteConfig.accreditation.institution}</p>
                            <span className="inline-block text-[11px] font-semibold text-piaud-emerald bg-emerald-50 px-2 py-0.5 rounded-full">Berlaku s.d. {siteConfig.accreditation.validUntil}</span>
                        </div>

                        <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 text-center space-y-2 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
                            <span className="text-3xl">🎓</span>
                            <h3 className="font-serif font-bold text-base text-piaud-slate">Gelar Akademik</h3>
                            <p className="text-xs text-piaud-slate-muted">Sarjana Pendidikan (S.Pd.)</p>
                            <span className="inline-block text-[11px] font-semibold text-piaud-terracotta bg-amber-50 px-2 py-0.5 rounded-full">Jenjang Sarjana S1</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-piaud-slate-muted text-center sm:text-left">
                            Butuh salinan SK Akreditasi untuk keperluan administrasi atau beasiswa?
                        </p>
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-piaud-emerald hover:bg-piaud-emerald-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-soft transition-all"
                        >
                            <span>Minta Berkas via WhatsApp</span>
                            <span>&rarr;</span>
                        </a>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
