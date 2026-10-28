import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { siteConfig, createWhatsAppLink } from '@/data/piaud';

export const Navbar: React.FC = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const { url } = usePage();

    const waLink = createWhatsAppLink(siteConfig.whatsappDefaultMessage);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSubmenu = (label: string) => {
        setOpenSubmenu(openSubmenu === label ? null : label);
    };

    const isActive = (href: string) => {
        if (href === '/') return url === '/';
        const cleanHref = href.split('#')[0];
        return url === cleanHref || url.startsWith(cleanHref + '/');
    };

    return (
        <header className="w-full bg-[#FAF6EC] border-b border-[#E3DAC7] sticky top-0 z-40 shadow-soft">
            {/* 1. Top Bar (Solid Deep Forest Emerald) */}
            <div className={`bg-piaud-emerald text-piaud-ivory border-b border-piaud-emerald-dark text-xs leading-normal transition-all duration-200 ${isScrolled ? 'py-1' : 'py-1.5 sm:py-2'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
                    {/* Left: Institution & Program Identity */}
                    <div className="flex items-center gap-2 truncate">
                        <span className="font-bold tracking-wider uppercase text-white text-[11px] sm:text-xs shrink-0">
                            {siteConfig.institutionName}
                        </span>
                        <span className="text-white/40 hidden md:inline">|</span>
                        <span className="text-white/90 font-medium hidden md:inline truncate text-[11px] sm:text-xs">
                            {siteConfig.facultyName} · {siteConfig.programName}
                        </span>
                    </div>

                    {/* Right: Phone Number & White SVG Social Media Icons */}
                    <div className="flex items-center gap-3 sm:gap-4 text-xs text-white/90 shrink-0">
                        <a 
                            href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`} 
                            className="hidden sm:inline-flex items-center gap-1.5 text-white/90 hover:text-white transition-colors tactile-press"
                        >
                            <svg className="w-3.5 h-3.5 fill-current opacity-80" viewBox="0 0 24 24">
                                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                            </svg>
                            <span className="font-semibold text-white text-[11px] sm:text-xs">{siteConfig.phone}</span>
                        </a>

                        <span className="hidden sm:inline text-white/40">|</span>

                        {/* White SVG Social Icons with Interactive Spring Hover */}
                        <div className="flex items-center gap-3">
                            {/* Instagram */}
                            <a
                                href="https://instagram.com/piaud_iaipersis"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-white transform hover:scale-125 hover:-translate-y-0.5 active:scale-95 transition-all duration-150"
                                title="Instagram PIAUD"
                            >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>

                            {/* YouTube */}
                            <a
                                href="https://youtube.com/@piaudiaipersis"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-white transform hover:scale-125 hover:-translate-y-0.5 active:scale-95 transition-all duration-150"
                                title="YouTube PIAUD"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a
                                href="https://facebook.com/piaud.iaipersis"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-white transform hover:scale-125 hover:-translate-y-0.5 active:scale-95 transition-all duration-150"
                                title="Facebook PIAUD"
                            >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>

                            {/* WhatsApp Direct Icon */}
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-white transform hover:scale-125 hover:-translate-y-0.5 active:scale-95 transition-all duration-150"
                                title="WhatsApp Resmi"
                            >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Navbar with Dynamic Responsive Height */}
            <nav className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16 py-2' : 'h-18 sm:h-20 py-3'}`}>
                {/* Brand Identity with Official Campus Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5 sm:gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-piaud-terracotta rounded-md py-1 min-w-0 tactile-press"
                >
                    <img
                        src="/images/logo_kampus.png"
                        alt="Logo IAI Persis Bandung"
                        className={`w-auto object-contain shrink-0 group-hover:scale-105 transition-all duration-200 ${isScrolled ? 'h-8 sm:h-10' : 'h-9 sm:h-11 md:h-12'}`}
                    />
                    <div className="flex flex-col min-w-0">
                        <span className="font-bold text-sm sm:text-base md:text-lg leading-tight text-piaud-slate tracking-tight group-hover:text-piaud-emerald transition-colors font-sans truncate">
                            PIAUD IAI Persis
                        </span>
                        <span className="text-[10px] sm:text-xs text-piaud-slate-muted font-medium mt-0.5 hidden sm:block truncate">
                            S1 Pendidikan Islam Anak Usia Dini
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center gap-1.5">
                    {siteConfig.navigation.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <div key={item.label} className="relative group">
                                {item.submenu ? (
                                    <div className="flex items-center">
                                        <Link
                                            href={item.href}
                                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 tactile-press ${
                                                active
                                                    ? 'text-piaud-emerald bg-piaud-ivory-dark border border-piaud-border font-bold shadow-sm'
                                                    : 'text-piaud-slate hover:text-piaud-emerald hover:bg-piaud-ivory-dark'
                                            }`}
                                        >
                                            <span>{item.label}</span>
                                            <span className="text-xs text-piaud-slate-muted group-hover:text-piaud-emerald transition-transform duration-200 group-hover:rotate-180">▾</span>
                                        </Link>

                                        {/* Desktop Dropdown Submenu */}
                                        <div className="absolute top-full left-0 mt-2 w-60 bg-[#FAF6EC] border border-[#E3DAC7] rounded-xl shadow-card-hover p-2 transform origin-top scale-95 translate-y-1 invisible group-hover:visible group-hover:scale-100 group-hover:translate-y-0 transition-transform duration-200 z-50">
                                            {item.submenu.map((sub) => (
                                                <Link
                                                    key={sub.label}
                                                    href={sub.href}
                                                    className="block px-3.5 py-2.5 text-xs text-piaud-slate hover:text-piaud-emerald hover:bg-piaud-ivory-dark rounded-lg transition-colors duration-150 font-medium active:translate-x-1"
                                                >
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`inline-flex items-center px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 tactile-press ${
                                            active
                                                ? 'text-piaud-emerald bg-piaud-ivory-dark border border-piaud-border font-bold shadow-sm'
                                                : 'text-piaud-slate hover:text-piaud-emerald hover:bg-piaud-ivory-dark'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Mobile Menu Button with Animated Rotating Icon */}
                <div className="flex items-center lg:hidden">
                    <button
                        type="button"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        aria-expanded={isMobileOpen}
                        aria-label={isMobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                        className="p-2 text-piaud-slate hover:bg-piaud-ivory-dark border border-piaud-border rounded-md transition-all duration-200 active:scale-90"
                    >
                        <svg
                            className={`w-5 h-5 transform transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                                isMobileOpen ? 'rotate-90 scale-105' : 'rotate-0'
                            }`}
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

            {/* Mobile Drawer with Smooth Open (Slide Down) & Close (Slide Up) Animation */}
            <div
                className={`lg:hidden grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#F2ECE0] ${
                    isMobileOpen ? 'grid-rows-[1fr] border-t border-[#E3DAC7]' : 'grid-rows-[0fr] border-t-0'
                }`}
            >
                <div
                    className={`min-h-0 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isMobileOpen ? 'translate-y-0 py-3.5 px-4' : '-translate-y-4 py-0 px-4'
                    }`}
                >
                    <div className="flex flex-col space-y-1">
                        {siteConfig.navigation.map((item, index) => {
                            const active = isActive(item.href);
                            return (
                                <div
                                    key={item.label}
                                    style={{
                                        transitionDelay: isMobileOpen ? `${index * 30}ms` : '0ms',
                                    }}
                                    className={`pb-1 border-b border-[#E3DAC7]/60 transform transition-transform duration-250 ease-out ${
                                        isMobileOpen ? 'translate-x-0' : '-translate-x-3'
                                    }`}
                                >
                                    {item.submenu ? (
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => toggleSubmenu(item.label)}
                                                className={`w-full flex items-center justify-between py-2.5 px-3 text-sm font-semibold rounded-lg transition-all active:scale-[0.98] ${
                                                    active ? 'text-piaud-emerald bg-[#FAF6EC] font-bold shadow-sm' : 'text-piaud-slate hover:bg-[#FAF6EC]'
                                                }`}
                                            >
                                                <span>{item.label}</span>
                                                <span className={`text-xs transition-transform duration-250 ${openSubmenu === item.label ? 'rotate-180' : ''}`}>▼</span>
                                            </button>
                                            {openSubmenu === item.label && (
                                                <div className="pl-4 py-1.5 space-y-1 bg-[#FAF6EC] rounded-md mt-1 border border-[#E3DAC7] animate-spring-down">
                                                    {item.submenu.map((sub) => (
                                                        <Link
                                                            key={sub.label}
                                                            href={sub.href}
                                                            onClick={() => setIsMobileOpen(false)}
                                                            className="block py-2 px-3 text-xs text-piaud-slate hover:text-piaud-emerald font-medium rounded active:translate-x-1"
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
                                            className={`block py-2.5 px-3 text-sm font-semibold rounded-lg transition-all active:scale-[0.98] ${
                                                active ? 'text-piaud-emerald bg-[#FAF6EC] font-bold shadow-sm' : 'text-piaud-slate hover:bg-[#FAF6EC]'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </header>
    );
};
