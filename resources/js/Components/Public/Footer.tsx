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
                    className="inline-flex items-center gap-1 hover:text-white transform hover:translate-x-1.5 active:translate-x-0 transition-transform duration-150"
                >
                    <span className="text-white/40 text-[10px]">›</span>
                    <span>{link.label}</span>
                </Link>
            );
        }
        return (
            <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-1 hover:text-white transform hover:translate-x-1.5 active:translate-x-0 transition-transform duration-150"
            >
                <span className="text-white/40 text-[10px]">›</span>
                <span>{link.label}</span>
            </a>
        );
    };

    return (
        <footer id="kontak" className="w-full bg-[#0F4C3A] text-piaud-ivory border-t border-[#0A3427]">
            {/* 8A. CTA Penutup (Solid Deep Forest Box with Clean Neumorphic & Tactile Buttons) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-6 pt-10">
                <div className="bg-[#0A3427] border border-[#17664F] rounded-2xl p-8 sm:p-12 shadow-neu-raised text-piaud-ivory relative overflow-hidden">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
                        <div className="max-w-2xl space-y-2">
                            <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold leading-snug">
                                Siap Menjadi Pendidik Generasi Emas yang Berkarakter Islami?
                            </h2>
                            <p className="text-sm text-piaud-ivory/90 leading-relaxed max-w-[65ch]">
                                Konsultasikan persyaratan pendaftaran, konversi nilai guru mengajar, serta jadwal perkuliahan reguler dan kelas karyawan dengan tim prodi.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-[#C2613A] hover:bg-[#A64F2D] text-white text-xs font-bold px-6 py-3.5 rounded-xl border border-[#A64F2D] shadow-sm hover:shadow transition-all duration-150 tactile-press"
                            >
                                Hubungi CS PMB PIAUD
                            </a>
                            <Link
                                href="/akademik#kurikulum"
                                className="inline-flex items-center justify-center bg-[#FAF6EC] hover:bg-[#F2ECE0] text-[#0F4C3A] text-xs font-bold px-6 py-3.5 rounded-xl border border-[#E3DAC7] shadow-sm hover:shadow transition-all duration-150 tactile-press"
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
                            <div className="w-11 h-11 bg-[#FAF6EC] rounded-xl flex items-center justify-center p-1.5 shrink-0 shadow-sm border border-[#E3DAC7]/30">
                                <img
                                    src="/images/logo_kampus.png"
                                    alt="Logo PIAUD IAI Persis"
                                    className="w-full h-full object-contain"
                                />
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

                        <div className="text-xs space-y-2 text-piaud-ivory/85 pt-3 border-t border-[#17664F]">
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
                        <ul className="space-y-2 text-xs text-piaud-ivory/80">
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
                        <ul className="space-y-2 text-xs text-piaud-ivory/80">
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
                        <ul className="space-y-2 text-xs text-piaud-ivory/80">
                            {siteConfig.footerLinks.portal.map((link) => (
                                <li key={link.label}>
                                    {renderLink(link)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-6 border-t border-[#17664F] flex flex-col sm:flex-row items-center justify-between text-xs text-piaud-ivory/70 gap-3">
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
