import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export default function Contact() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [interest, setInterest] = useState('Pendaftaran Mahasiswa Baru (PMB)');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formattedMsg = `Halo Admin PMB PIAUD IAI Persis Bandung,%0A%0ASaya ingin berkonsultasi:%0A- Nama: ${encodeURIComponent(name)}%0A- Kontak: ${encodeURIComponent(phone)}%0A- Topik: ${encodeURIComponent(interest)}%0A- Pesan: ${encodeURIComponent(message)}`;
        window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${formattedMsg}`, '_blank');
        setIsSubmitted(true);
    };

    return (
        <PublicLayout>
            <Head>
                <title>{`Hubungi Kami - ${siteConfig.programName} ${siteConfig.institutionName}`}</title>
                <meta
                    name="description"
                    content={`Hubungi sekretariat dan layanan konsultasi PMB Program Studi S1 PIAUD IAI Persis Bandung.`}
                />
            </Head>

            {/* Header Banner with Breadcrumb */}
            <div className="bg-gradient-to-r from-piaud-emerald-dark via-piaud-emerald to-piaud-emerald-light text-white py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-white/80 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span>/</span>
                        <span className="text-white font-semibold">Hubungi Kami</span>
                    </nav>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                        Layanan Kontak &amp; Konsultasi PMB
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                        Konsultasikan pendaftaran mahasiswa baru, konversi ijazah guru, jadwal perkuliahan, atau kemitraan lembaga bersama tim sekretariat prodi.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
                {/* 1. Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-all space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-piaud-emerald flex items-center justify-center text-xl shadow-soft">
                            📍
                        </div>
                        <h3 className="font-serif font-bold text-base text-piaud-slate">Lokasi Kampus</h3>
                        <p className="text-xs text-piaud-slate-muted leading-relaxed">{siteConfig.campusAddress}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-all space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-piaud-emerald flex items-center justify-center text-xl shadow-soft">
                            💬
                        </div>
                        <h3 className="font-serif font-bold text-base text-piaud-slate">WhatsApp PMB</h3>
                        <p className="text-xs text-piaud-slate-muted">Respon cepat via admin resmi prodi</p>
                        <a
                            href={createWhatsAppLink("Halo Admin, saya ingin konsultasi pendaftaran")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs font-bold text-piaud-emerald hover:underline pt-1"
                        >
                            +{siteConfig.whatsappNumber} &rarr;
                        </a>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-all space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-piaud-emerald flex items-center justify-center text-xl shadow-soft">
                            📞
                        </div>
                        <h3 className="font-serif font-bold text-base text-piaud-slate">Telepon Kantor</h3>
                        <p className="text-xs text-piaud-slate-muted">Layanan kantor fakultas tarbiyah</p>
                        <p className="text-xs font-bold text-piaud-slate pt-1">{siteConfig.phone}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-all space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-piaud-emerald flex items-center justify-center text-xl shadow-soft">
                            ⏰
                        </div>
                        <h3 className="font-serif font-bold text-base text-piaud-slate">Jam Kerja</h3>
                        <p className="text-xs text-piaud-slate-muted leading-relaxed">{siteConfig.officeHours}</p>
                        <span className="inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            Layanan Terbuka
                        </span>
                    </div>
                </div>

                {/* 2. Interactive Form & Map Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Form (7 cols) */}
                    <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-card">
                        <span className="inline-block bg-amber-50 text-piaud-terracotta text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                            Formulir Konsultasi
                        </span>
                        <h2 className="font-serif text-2xl font-bold text-piaud-slate mb-6">
                            Kirim Pesan ke Tim Program Studi
                        </h2>

                        {isSubmitted && (
                            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-piaud-emerald text-xs space-y-1">
                                <p className="font-bold">Terima kasih! Pesan Anda telah diteruskan ke WhatsApp.</p>
                                <p>Admin kami akan segera menanggapi konsultasi Anda.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-piaud-slate mb-1">
                                    Nama Lengkap <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Contoh: Aisyah Humaira, S.Pd."
                                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-piaud-emerald"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-piaud-slate mb-1">
                                        Nomor WhatsApp / HP <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Contoh: 081234567890"
                                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-piaud-emerald"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-piaud-slate mb-1">
                                        Topik Konsultasi
                                    </label>
                                    <select
                                        value={interest}
                                        onChange={(e) => setInterest(e.target.value)}
                                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-piaud-emerald bg-white"
                                    >
                                        <option>Pendaftaran Mahasiswa Baru (PMB)</option>
                                        <option>Program Kelas Guru Mengajar / Karyawan</option>
                                        <option>Konversi Nilai / Pindahan</option>
                                        <option>Kemitraan Laboratorium &amp; Sekolah</option>
                                        <option>Layanan Legalisir Ijazah &amp; Akademik</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-piaud-slate mb-1">
                                    Pesan / Pertanyaan <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Tuliskan pertanyaan Anda mengenai jadwal kuliah, biaya, atau persyaratan..."
                                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-piaud-emerald"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center bg-piaud-terracotta hover:bg-piaud-terracotta-dark text-white text-sm font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                Kirim Konsultasi via WhatsApp &rarr;
                            </button>
                        </form>
                    </div>

                    {/* Maps & Additional Info (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card space-y-4">
                            <h3 className="font-serif font-bold text-base text-piaud-slate">
                                Peta Lokasi Kampus
                            </h3>
                            <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-100 flex items-center justify-center">
                                <iframe
                                    title="Peta IAI Persis Bandung"
                                    src="https://maps.google.com/maps?q=IAI+Persis+Bandung+Jl+Ciganitri+No+2&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                />
                            </div>
                            <p className="text-xs text-piaud-slate-muted leading-relaxed">
                                Kampus IAI Persis Bandung berlokasi strategis di kawasan pendidikan Bandung Selatan, mudah diakses melalui Gerbang Tol Buahbatu.
                            </p>
                        </div>

                        {/* FAQ Box */}
                        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-3">
                            <h4 className="font-serif font-bold text-sm text-piaud-slate">Pertanyaan Sering Ditanyakan (FAQ)</h4>
                            <div className="space-y-2 text-xs text-piaud-slate-muted">
                                <div>
                                    <p className="font-semibold text-piaud-slate">Apakah ada kelas sore/malam untuk guru PAUD?</p>
                                    <p>Ya, tersedia kelas khusus bagi guru yang sudah aktif mengajar di RA/TK dengan jadwal fleksibel.</p>
                                </div>
                                <div className="pt-2 border-t border-slate-200">
                                    <p className="font-semibold text-piaud-slate">Apakah menerima mahasiswa pindahan?</p>
                                    <p>Menerima pindahan dengan sistem konversi nilai transkrip dari prodi yang relevan.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
