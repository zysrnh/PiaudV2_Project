import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
    const [scrollPercent, setScrollPercent] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            
            setScrollPercent(Math.min(100, Math.max(0, Math.round(progress))));
            setIsVisible(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Radius & Circumference for circular progress ring
    const radius = 17;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

    return (
        <aside
            aria-label="Progress scroll dan tombol ke atas"
            className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                isVisible ? 'translate-y-0 scale-100 pointer-events-auto' : 'translate-y-16 scale-75 pointer-events-none'
            }`}
        >
            <button
                type="button"
                onClick={scrollToTop}
                title={`Sudah scroll ${scrollPercent}%. Klik untuk kembali ke atas`}
                className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[#FAF6EC] border border-[#E3DAC7] text-[#0F4C3A] hover:text-[#0A3427] shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all duration-200 transform hover:-translate-y-1.5 active:translate-y-1 active:scale-90"
            >
                {/* SVG Progress Circle */}
                <svg className="w-11 h-11 sm:w-12 sm:h-12 -rotate-90 transform" viewBox="0 0 44 44">
                    {/* Background Track */}
                    <circle
                        cx="22"
                        cy="22"
                        r={radius}
                        fill="transparent"
                        stroke="#E3DAC7"
                        strokeWidth="2.5"
                    />
                    {/* Active Progress Ring */}
                    <circle
                        cx="22"
                        cy="22"
                        r={radius}
                        fill="transparent"
                        stroke="#0F4C3A"
                        strokeWidth="2.5"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-[stroke-dashoffset] duration-150 ease-out"
                    />
                </svg>

                {/* Inner Content: Upward Arrow (Default) / Percentage (Hover) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="group-hover:hidden text-[#0F4C3A] font-bold text-xs sm:text-sm transform group-hover:-translate-y-0.5 transition-transform">
                        ↑
                    </span>
                    <span className="hidden group-hover:block font-mono text-[9px] sm:text-[10px] font-bold text-[#0F4C3A] tracking-tighter">
                        {scrollPercent}%
                    </span>
                </div>
            </button>
        </aside>
    );
};
