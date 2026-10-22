import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export const Navbar: React.FC = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const { url } = usePage();

    const waLink = createWhatsAppLink(siteConfig.whatsappDefaultMessage);

    const toggleSubmenu = (label: string) => {
        setOpenSubmenu(openSubmenu === label ? null : label);
    };

    const isActive = (href: string) => {
        if (href === '/') return url === '/';
        const cleanHref = href.split('#')[0];
        return url === cleanHref || url.startsWith(cleanHref + '/');
    };

    return (
        <header className="w-full bg-white/95 backdrop-blur-md border-b border-piaud-border sticky top-0 z-40 shadow-soft">
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
                        <span className="inline-flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded-full">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
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
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 py-3 flex items-center justify-between">
                {/* Brand Monogram */}
                <Link
                    href="/"
                    className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-piaud-terracotta rounded-xl p-1"
                >
                    <div className="w-11 h-11 bg-gradient-to-br from-piaud-emerald to-piaud-emerald-dark text-piaud-ivory flex items-center justify-center font-serif text-xl font-bold rounded-xl border border-piaud-emerald-dark shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200">
                        P
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif font-bold text-base sm:text-lg leading-tight text-piaud-slate tracking-tight group-hover:text-piaud-emerald transition-colors">
                            PIAUD IAI Persis
                        </span>
                        <span className="text-xs text-piaud-slate-muted font-medium mt-0.5">
                            S1 Pendidikan Islam Anak Usia Dini
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden xl:flex items-center gap-1.5">
                    {siteConfig.navigation.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <div key={item.label} className="relative group">
                                {item.submenu ? (
                                    <div className="flex items-center">
                                        <Link
                                            href={item.href}
                                            className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                                active
                                                    ? 'text-piaud-emerald bg-emerald-50/80 shadow-soft font-bold'
                                                    : 'text-piaud-slate hover:text-piaud-emerald hover:bg-slate-50'
                                            }`}
                                        >
                                            <span>{item.label}</span>
                                            <span className="text-xs text-piaud-slate-muted group-hover:text-piaud-emerald transition-transform group-hover:rotate-180">▾</span>
                                        </Link>

                                        {/* Desktop Dropdown Submenu */}
                                        <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-card-hover p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                            {item.submenu.map((sub) => (
                                                <Link
                                                    key={sub.label}
                                                    href={sub.href}
                                                    className="block px-3.5 py-2 text-sm text-piaud-slate hover:text-piaud-emerald hover:bg-emerald-50/70 rounded-xl transition-all duration-150 font-medium"
                                                >
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`inline-flex items-center px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                            active
                                                ? 'text-piaud-emerald bg-emerald-50/80 shadow-soft font-bold'
                                                : 'text-piaud-slate hover:text-piaud-emerald hover:bg-slate-50'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Right CTA Button (3D Raised Shadow) */}
                <div className="hidden sm:flex items-center gap-3">
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-piaud-terracotta hover:bg-piaud-terracotta-dark text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border border-piaud-terracotta-dark/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-piaud-terracotta"
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
                        className="p-2.5 text-piaud-slate hover:bg-slate-100 border border-piaud-border rounded-xl transition-colors duration-150 shadow-soft"
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

            {/* Mobile Rounded Drawer */}
            {isMobileOpen && (
                <div className="xl:hidden border-t border-piaud-border bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-card-hover">
                    <div className="flex flex-col space-y-1">
                        {siteConfig.navigation.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <div key={item.label} className="pb-1">
                                    {item.submenu ? (
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => toggleSubmenu(item.label)}
                                                className={`w-full flex items-center justify-between py-2.5 px-3.5 text-sm font-semibold rounded-xl transition-colors ${
                                                    active ? 'text-piaud-emerald bg-emerald-50 font-bold' : 'text-piaud-slate hover:bg-slate-50'
                                                }`}
                                            >
                                                <span>{item.label}</span>
                                                <span className="text-xs">{openSubmenu === item.label ? '▲' : '▼'}</span>
                                            </button>
                                            {openSubmenu === item.label && (
                                                <div className="pl-4 py-1.5 space-y-1 bg-slate-50/70 rounded-xl mt-1">
                                                    {item.submenu.map((sub) => (
                                                        <Link
                                                            key={sub.label}
                                                            href={sub.href}
                                                            onClick={() => setIsMobileOpen(false)}
                                                            className="block py-2 px-3 text-sm text-piaud-slate hover:text-piaud-emerald font-medium rounded-lg"
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileOpen(false)}
                                            className={`block py-2.5 px-3.5 text-sm font-semibold rounded-xl transition-colors ${
                                                active ? 'text-piaud-emerald bg-emerald-50 font-bold' : 'text-piaud-slate hover:bg-slate-50'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="pt-2">
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center bg-piaud-terracotta hover:bg-piaud-terracotta-dark text-white text-sm font-bold py-3 px-4 rounded-xl transition-all duration-150 shadow-md border border-piaud-terracotta-dark"
                        >
                            Konsultasi WhatsApp PMB
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};
