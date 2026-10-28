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
            <div className="bg-piaud-emerald-dark text-white py-10 md:py-12 border-b border-piaud-border/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-piaud-ivory/70 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span className="text-piaud-ivory/40">/</span>
                        <span className="text-white font-medium">Hubungi Kami</span>
                    </nav>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                        Layanan Kontak &amp; Konsultasi PMB
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-piaud-ivory/85 max-w-2xl leading-relaxed">
                        Konsultasikan pendaftaran mahasiswa baru, konversi ijazah guru, jadwal perkuliahan, atau kemitraan lembaga bersama tim sekretariat prodi.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
                {/* 1. Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-piaud-ivory rounded-lg p-6 border border-piaud-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all space-y-2 group">
                        <div className="w-10 h-10 rounded-md bg-[#0F4C3A]/10 text-[#0F4C3A] border border-[#0F4C3A]/20 flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
                            <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        </div>
                        <h3 className="font-serif font-bold text-base text-piaud-slate">Lokasi Kampus</h3>
                        <p className="text-xs text-piaud-slate-muted leading-relaxed">{siteConfig.campusAddress}</p>
                    </div>

                    <div className="bg-piaud-ivory rounded-lg p-6 border border-piaud-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all space-y-2 group">
                        <div className="w-10 h-10 rounded-md bg-[#0F4C3A]/10 text-[#0F4C3A] border border-[#0F4C3A]/20 flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
                            <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                            </svg>
                        </div>
                        <h3 className="font-serif font-bold text-base text-piaud-slate">WhatsApp PMB</h3>
                        <p className="text-xs text-piaud-slate-muted">Respon cepat via admin resmi prodi</p>
                        <a
                            href={createWhatsAppLink("Halo Admin, saya ingin konsultasi pendaftaran")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs font-bold text-[#0F4C3A] hover:text-[#0A3427] hover:underline pt-1 transition-colors"
                        >
                            +{siteConfig.whatsappNumber} &rarr;
                        </a>
                    </div>

                    <div className="bg-piaud-ivory rounded-lg p-6 border border-piaud-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all space-y-2 group">
                        <div className="w-10 h-10 rounded-md bg-[#0F4C3A]/10 text-[#0F4C3A] border border-[#0F4C3A]/20 flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
                            <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                            </svg>
                        </div>
                        <h3 className="font-serif font-bold text-base text-piaud-slate">Telepon Kantor</h3>
                        <p className="text-xs text-piaud-slate-muted">Layanan kantor fakultas tarbiyah</p>
                        <p className="text-xs font-bold text-piaud-slate pt-1">{siteConfig.phone}</p>
                    </div>

                    <div className="bg-piaud-ivory rounded-lg p-6 border border-piaud-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all space-y-2 group">
                        <div className="w-10 h-10 rounded-md bg-[#0F4C3A]/10 text-[#0F4C3A] border border-[#0F4C3A]/20 flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
                            <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <h3 className="font-serif font-bold text-base text-piaud-slate">Jam Kerja</h3>
                        <p className="text-xs text-piaud-slate-muted leading-relaxed">{siteConfig.officeHours}</p>
                        <span className="inline-block text-[11px] font-bold text-[#0F4C3A] uppercase tracking-wider">
                            Layanan Terbuka
                        </span>
                    </div>
                </div>

                {/* 2. Interactive Form & Map Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Form (7 cols) */}
                    <div className="lg:col-span-7 bg-piaud-ivory-dark rounded-lg p-8 sm:p-10 border border-piaud-border shadow-soft">
                        <h2 className="font-serif text-2xl font-bold text-piaud-slate mb-6">
                            Kirim Pesan ke Tim Program Studi
                        </h2>

                        {isSubmitted && (
                            <div className="mb-6 p-4 rounded-md bg-emerald-50 border border-emerald-200 text-piaud-emerald text-xs space-y-1">
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
                                    className="w-full text-sm px-4 py-2.5 rounded-md border border-piaud-border bg-piaud-ivory focus:bg-white focus:outline-none focus:ring-1 focus:ring-piaud-emerald focus:border-piaud-emerald transition-all"
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
                                        className="w-full text-sm px-4 py-2.5 rounded-md border border-piaud-border bg-piaud-ivory focus:bg-white focus:outline-none focus:ring-1 focus:ring-piaud-emerald focus:border-piaud-emerald transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-piaud-slate mb-1">
                                        Topik Konsultasi
                                    </label>
                                    <select
                                        value={interest}
                                        onChange={(e) => setInterest(e.target.value)}
                                        className="w-full text-sm px-4 py-2.5 rounded-md border border-piaud-border bg-piaud-ivory focus:bg-white focus:outline-none focus:ring-1 focus:ring-piaud-emerald focus:border-piaud-emerald transition-all"
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
                                    className="w-full text-sm px-4 py-2.5 rounded-md border border-piaud-border bg-piaud-ivory focus:bg-white focus:outline-none focus:ring-1 focus:ring-piaud-emerald focus:border-piaud-emerald transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center bg-piaud-terracotta hover:bg-piaud-terracotta-dark text-white text-sm font-bold py-3.5 px-6 rounded-md shadow-sm border border-piaud-terracotta-dark transition-all duration-200"
                            >
                                Kirim Konsultasi via WhatsApp &rarr;
                            </button>
                        </form>
                    </div>

                    {/* Maps & Additional Info (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-piaud-ivory rounded-lg p-6 border border-piaud-border shadow-soft space-y-4">
                            <h3 className="font-serif font-bold text-base text-piaud-slate">
                                Peta Lokasi Kampus
                            </h3>
                            <div className="w-full h-64 rounded-md overflow-hidden border border-piaud-border relative bg-piaud-ivory-dark flex items-center justify-center">
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
                        <div className="bg-piaud-ivory-dark rounded-lg p-6 border border-piaud-border space-y-3">
                            <h4 className="font-serif font-bold text-sm text-piaud-slate">Pertanyaan Sering Ditanyakan (FAQ)</h4>
                            <div className="space-y-2 text-xs text-piaud-slate-muted">
                                <div>
                                    <p className="font-semibold text-piaud-slate">Apakah ada kelas sore/malam untuk guru PAUD?</p>
                                    <p>Ya, tersedia kelas khusus bagi guru yang sudah aktif mengajar di RA/TK dengan jadwal fleksibel.</p>
                                </div>
                                <div className="pt-2 border-t border-piaud-border">
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
