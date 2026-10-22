import React from 'react';
import { Link } from '@inertiajs/react';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export const Footer: React.FC = () => {
    const waLink = createWhatsAppLink("Halo Admin, saya ingin mendaftar ke Program Studi S1 PIAUD IAI Persis Bandung.");

    const renderLink = (link: { label: string; href: string }) => {
        const isInternal = link.href.startsWith('/') && !link.href.startsWith('//');
        if (isInternal) {
            return (
                <Link
                    href={link.href}
                    className="inline-block hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                    {link.label}
                </Link>
            );
        }
        return (
            <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-block hover:text-white hover:translate-x-1 transition-all duration-200"
            >
                {link.label}
            </a>
        );
    };

    return (
        <footer id="kontak" className="w-full bg-piaud-emerald text-piaud-ivory border-t border-piaud-emerald-dark">
            {/* 8A. CTA Penutup (Structured Box with Clean rounded-lg) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-6 pt-10">
                <div className="bg-piaud-emerald-dark border border-piaud-emerald-light/40 rounded-lg p-8 sm:p-12 shadow-card text-piaud-ivory relative overflow-hidden">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold mb-3 leading-snug">
                                Siap Menjadi Pendidik Generasi Emas yang Berkarakter Islami?
                            </h2>
                            <p className="text-sm text-piaud-ivory/90 leading-relaxed max-w-[65ch]">
                                Konsultasikan persyaratan pendaftaran, konversi nilai guru mengajar, serta jadwal perkuliahan reguler dan kelas karyawan dengan tim prodi.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-piaud-terracotta hover:bg-piaud-terracotta-dark text-white text-xs font-bold px-5 py-3 rounded-md border border-piaud-terracotta-dark transition-all duration-150 shadow-sm hover:shadow"
                            >
                                Hubungi CS PMB PIAUD
                            </a>
                            <Link
                                href="/akademik#kurikulum"
                                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-5 py-3 rounded-md border border-white/20 transition-all duration-150"
                            >
                                Pelajari Kurikulum
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 8B. Institutional Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
                    {/* Brand & Address Column (2 cols) */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-piaud-ivory text-piaud-emerald font-serif font-bold text-lg flex items-center justify-center rounded-md shrink-0 shadow-sm">
                                P
                            </div>
                            <div>
                                <p className="font-serif font-bold text-base text-white leading-snug">
                                    S1 PIAUD IAI Persis Bandung
                                </p>
                                <p className="text-xs text-piaud-ivory/80 leading-relaxed mt-0.5">
                                    Fakultas Tarbiyah · Institut Agama Islam Persatuan Islam
                                </p>
                            </div>
                        </div>

                        <p className="text-xs text-piaud-ivory/85 leading-relaxed max-w-[55ch]">
                            {siteConfig.campusAddress}
                        </p>

                        <div className="text-xs space-y-2 text-piaud-ivory/85 pt-3 border-t border-white/10">
                            <p>
                                <strong className="text-white font-medium">Telepon Kantor:</strong> {siteConfig.phone}
                            </p>
                            <p>
                                <strong className="text-white font-medium">Jam Layanan:</strong> {siteConfig.officeHours}
                            </p>
                            <p>
                                <strong className="text-white font-medium">Email:</strong> {siteConfig.email}
                            </p>
                            <p>
                                <strong className="text-white font-medium">Akreditasi:</strong> {siteConfig.accreditation.status} ({siteConfig.accreditation.institution}) · Berlaku hingga {siteConfig.accreditation.validUntil}
                            </p>
                        </div>
                    </div>

                    {/* Academic Links */}
                    <div>
                        <h3 className="font-serif text-sm font-bold text-white tracking-wide mb-3">
                            Akademik &amp; Fasilitas
                        </h3>
                        <ul className="space-y-2.5 text-xs text-piaud-ivory/80">
                            {siteConfig.footerLinks.academic.map((link) => (
                                <li key={link.label}>
                                    {renderLink(link)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Institutional Links */}
                    <div>
                        <h3 className="font-serif text-sm font-bold text-white tracking-wide mb-3">
                            Kelembagaan
                        </h3>
                        <ul className="space-y-2.5 text-xs text-piaud-ivory/80">
                            {siteConfig.footerLinks.institutional.map((link) => (
                                <li key={link.label}>
                                    {renderLink(link)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Portal Links */}
                    <div>
                        <h3 className="font-serif text-sm font-bold text-white tracking-wide mb-3">
                            Layanan Mahasiswa
                        </h3>
                        <ul className="space-y-2.5 text-xs text-piaud-ivory/80">
                            {siteConfig.footerLinks.portal.map((link) => (
                                <li key={link.label}>
                                    {renderLink(link)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-piaud-ivory/70 gap-3">
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

