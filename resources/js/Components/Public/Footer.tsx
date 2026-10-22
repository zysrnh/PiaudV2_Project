import React from 'react';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export const Footer: React.FC = () => {
    const waLink = createWhatsAppLink("Halo Admin, saya ingin mendaftar ke Program Studi S1 PIAUD IAI Persis Bandung.");

    return (
        <footer id="kontak" className="w-full bg-piaud-emerald text-piaud-ivory border-t border-piaud-emerald-dark">
            {/* 8A. CTA Penutup */}
            <div className="border-b border-piaud-emerald-dark/60 bg-piaud-emerald-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="max-w-2xl">
                            <span className="text-xs uppercase tracking-wider text-piaud-ivory/80 font-bold block mb-2">
                                Penerimaan Mahasiswa Baru
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-serif text-piaud-ivory font-bold mb-3 leading-snug">
                                Siap Menjadi Pendidik Generasi Emas yang Berkarakter Islami?
                            </h2>
                            {/* Line length restrained to max-w-[65ch] to avoid eye-fatigue */}
                            <p className="text-sm text-piaud-ivory/90 leading-relaxed max-w-[65ch]">
                                Konsultasikan persyaratan pendaftaran, konversi nilai guru mengajar, serta jadwal perkuliahan reguler dan kelas karyawan dengan tim sekretariat prodi.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-piaud-terracotta hover:bg-piaud-terracotta-dark text-white text-sm font-bold px-6 py-3.5 rounded-sm border border-piaud-terracotta-dark transition-colors duration-150 shadow-sm"
                            >
                                Hubungi CS PMB PIAUD
                            </a>
                            <a
                                href="#kurikulum"
                                className="inline-flex items-center justify-center bg-transparent hover:bg-piaud-emerald text-piaud-ivory text-sm font-semibold px-5 py-3.5 rounded-sm border border-piaud-ivory/40 hover:border-piaud-ivory transition-colors duration-150"
                            >
                                Pelajari Kurikulum
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* 8B. Institutional Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
                    {/* Brand & Address Column (2 cols) */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-piaud-ivory text-piaud-emerald font-serif font-bold text-lg flex items-center justify-center rounded-sm shrink-0">
                                P
                            </div>
                            <div>
                                <p className="font-serif font-bold text-base text-piaud-ivory leading-snug">
                                    S1 PIAUD IAI Persis Bandung
                                </p>
                                <p className="text-xs text-piaud-ivory/90 leading-relaxed mt-0.5">
                                    Fakultas Tarbiyah · Institut Agama Islam Persatuan Islam
                                </p>
                            </div>
                        </div>

                        <p className="text-xs text-piaud-ivory/85 leading-relaxed max-w-[55ch]">
                            {siteConfig.campusAddress}
                        </p>

                        <div className="text-xs space-y-2 text-piaud-ivory/85 pt-2 border-t border-piaud-emerald-dark/70">
                            <p>
                                <strong className="text-white">Telepon Kantor:</strong> {siteConfig.phone}
                            </p>
                            <p>
                                <strong className="text-white">Jam Layanan:</strong> {siteConfig.officeHours}
                            </p>
                            <p>
                                <strong className="text-white">Email:</strong> {siteConfig.email}
                            </p>
                            <p>
                                <strong className="text-white">Akreditasi:</strong> {siteConfig.accreditation.status} ({siteConfig.accreditation.institution}) · Berlaku hingga {siteConfig.accreditation.validUntil}
                            </p>
                        </div>
                    </div>

                    {/* Academic Links */}
                    <div>
                        <h3 className="font-serif text-sm font-bold text-piaud-ivory tracking-wide mb-3">
                            Akademik &amp; Fasilitas
                        </h3>
                        <ul className="space-y-2.5 text-xs text-piaud-ivory/80">
                            {siteConfig.footerLinks.academic.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="hover:text-piaud-ivory hover:underline transition-colors duration-150"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Institutional Links */}
                    <div>
                        <h3 className="font-serif text-sm font-bold text-piaud-ivory tracking-wide mb-3">
                            Kelembagaan
                        </h3>
                        <ul className="space-y-2.5 text-xs text-piaud-ivory/80">
                            {siteConfig.footerLinks.institutional.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="hover:text-piaud-ivory hover:underline transition-colors duration-150"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Portal Links */}
                    <div>
                        <h3 className="font-serif text-sm font-bold text-piaud-ivory tracking-wide mb-3">
                            Layanan Mahasiswa
                        </h3>
                        <ul className="space-y-2.5 text-xs text-piaud-ivory/80">
                            {siteConfig.footerLinks.portal.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="hover:text-piaud-ivory hover:underline transition-colors duration-150"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-6 border-t border-piaud-emerald-dark/60 flex flex-col sm:flex-row items-center justify-between text-xs text-piaud-ivory/70 gap-3">
                    <p>
                        &copy; {new Date().getFullYear()} Program Studi S1 PIAUD IAI Persis Bandung. Hak Cipta Dilindungi Undang-Undang.
                    </p>
                    <p className="text-right">
                        Sistem Informasi &amp; Portal Resmi Program Studi
                    </p>
                </div>
            </div>
        </footer>
    );
};
