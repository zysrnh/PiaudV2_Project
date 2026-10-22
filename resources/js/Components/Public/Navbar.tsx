import React, { useState } from 'react';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export const Navbar: React.FC = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const waLink = createWhatsAppLink(siteConfig.whatsappDefaultMessage);

    const toggleSubmenu = (label: string) => {
        setOpenSubmenu(openSubmenu === label ? null : label);
    };

    return (
        <header className="w-full bg-piaud-ivory border-b border-piaud-border sticky top-0 z-40">
            {/* 1. Top Bar */}
            <div className="bg-piaud-emerald text-piaud-ivory border-b border-piaud-emerald-dark text-xs leading-normal">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="font-semibold tracking-wide uppercase">
                            {siteConfig.institutionName}
                        </span>
                        <span className="text-piaud-ivory/40">|</span>
                        <span className="text-piaud-ivory/90">
                            {siteConfig.facultyName} · {siteConfig.programName}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-piaud-ivory/90 flex-wrap">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                            <span>{siteConfig.accreditation.status} ({siteConfig.accreditation.institution})</span>
                        </span>
                        <span className="hidden sm:inline text-piaud-ivory/40">|</span>
                        <span className="inline-flex items-center gap-1">
                            <span>Telp:</span>
                            <span className="font-semibold text-white">{siteConfig.phone}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* 2. Main Navbar */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
                {/* Brand Monogram */}
                <a
                    href="#"
                    className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-piaud-terracotta"
                >
                    <div className="w-10 h-10 bg-piaud-emerald text-piaud-ivory flex items-center justify-center font-serif text-lg font-bold rounded-sm border border-piaud-emerald-dark shrink-0">
                        P
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif font-bold text-base sm:text-lg leading-tight text-piaud-slate tracking-tight">
                            PIAUD IAI Persis
                        </span>
                        <span className="text-xs text-piaud-slate font-semibold uppercase tracking-wider mt-0.5">
                            S1 Pendidikan Islam Anak Usia Dini
                        </span>
                    </div>
                </a>

                {/* Desktop Nav Links (Text Size: text-sm font-semibold) */}
                <div className="hidden xl:flex items-center gap-6">
                    {siteConfig.navigation.map((item) => (
                        <div key={item.label} className="relative group">
                            {item.submenu ? (
                                <div className="flex items-center gap-1.5 py-2 cursor-pointer">
                                    <a
                                        href={item.href}
                                        className="text-sm font-semibold text-piaud-slate hover:text-piaud-emerald transition-colors duration-150"
                                    >
                                        {item.label}
                                    </a>
                                    <span className="text-xs text-piaud-slate-muted group-hover:text-piaud-emerald">▾</span>

                                    {/* Desktop Dropdown Submenu */}
                                    <div className="absolute top-full left-0 mt-1 w-52 bg-piaud-ivory border border-piaud-border rounded-sm shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                                        {item.submenu.map((sub) => (
                                            <a
                                                key={sub.label}
                                                href={sub.href}
                                                className="block px-4 py-2.5 text-sm text-piaud-slate hover:bg-piaud-ivory-dark hover:text-piaud-emerald border-b border-piaud-border last:border-b-0 transition-colors duration-150 font-medium"
                                            >
                                                {sub.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <a
                                    href={item.href}
                                    className="text-sm font-semibold text-piaud-slate hover:text-piaud-emerald transition-colors duration-150 py-2 border-b-2 border-transparent hover:border-piaud-emerald"
                                >
                                    {item.label}
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right CTA Button (High Contrast Solid Terracotta) */}
                <div className="hidden sm:flex items-center gap-3">
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-piaud-terracotta hover:bg-piaud-terracotta-dark text-white text-sm font-bold px-5 py-2.5 rounded-sm transition-colors duration-150 border border-piaud-terracotta-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-piaud-terracotta"
                    >
                        <span>WhatsApp PMB</span>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center xl:hidden">
                    <button
                        type="button"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        aria-expanded={isMobileOpen}
                        aria-label="Buka menu navigasi"
                        className="p-2 text-piaud-slate hover:bg-piaud-ivory-dark border border-piaud-border rounded-sm transition-colors duration-150"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                        >
                            {isMobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Flat Drawer */}
            {isMobileOpen && (
                <div className="xl:hidden border-t border-piaud-border bg-piaud-ivory-dark px-4 pt-3 pb-5 space-y-2">
                    <div className="flex flex-col space-y-1">
                        {siteConfig.navigation.map((item) => (
                            <div key={item.label} className="border-b border-piaud-border/50 pb-1">
                                {item.submenu ? (
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => toggleSubmenu(item.label)}
                                            className="w-full flex items-center justify-between py-2 px-3 text-sm font-semibold text-piaud-slate hover:bg-piaud-ivory rounded-sm"
                                        >
                                            <span>{item.label}</span>
                                            <span className="text-xs">{openSubmenu === item.label ? '▲' : '▼'}</span>
                                        </button>
                                        {openSubmenu === item.label && (
                                            <div className="pl-4 py-1 space-y-1 bg-piaud-ivory/50 rounded-sm">
                                                {item.submenu.map((sub) => (
                                                    <a
                                                        key={sub.label}
                                                        href={sub.href}
                                                        onClick={() => setIsMobileOpen(false)}
                                                        className="block py-2 px-3 text-sm text-piaud-slate hover:text-piaud-emerald font-medium"
                                                    >
                                                        {sub.label}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <a
                                        href={item.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className="block py-2 px-3 text-sm font-semibold text-piaud-slate hover:bg-piaud-ivory rounded-sm transition-colors duration-150"
                                    >
                                        {item.label}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="pt-2">
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center bg-piaud-terracotta hover:bg-piaud-terracotta-dark text-white text-sm font-bold py-3 px-4 rounded-sm transition-colors duration-150 border border-piaud-terracotta-dark"
                        >
                            Konsultasi WhatsApp PMB
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};
