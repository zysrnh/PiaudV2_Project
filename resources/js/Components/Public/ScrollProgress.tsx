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
            setIsVisible(scrollTop > 120);
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

    if (!isVisible) return null;

    // Radius & Circumference for circular progress ring
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

    return (
        <aside
            aria-label="Progress scroll dan tombol ke atas"
            className="fixed bottom-6 right-6 z-50 animate-fade-in"
        >
            <button
                type="button"
                onClick={scrollToTop}
                title={`Sudah scroll ${scrollPercent}%. Klik untuk kembali ke atas`}
                className="group relative w-12 h-12 rounded-full neu-card flex items-center justify-center bg-[#FAF6EC] border border-[#E3DAC7] text-[#0F4C3A] hover:text-[#0A3427] shadow-[4px_4px_10px_#D4CCC0,-4px_-4px_10px_#FFFFFF] hover:shadow-[6px_6px_14px_#c8bfb2,-6px_-6px_14px_#FFFFFF] transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0"
            >
                {/* SVG Progress Circle */}
                <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 44 44">
                    {/* Background Track */}
                    <circle
                        cx="22"
                        cy="22"
                        r={radius}
                        fill="transparent"
                        stroke="#E3DAC7"
                        strokeWidth="3"
                        className="opacity-40"
                    />
                    {/* Active Progress Ring */}
                    <circle
                        cx="22"
                        cy="22"
                        r={radius}
                        fill="transparent"
                        stroke="#0F4C3A"
                        strokeWidth="3"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-[stroke-dashoffset] duration-150 ease-out"
                    />
                </svg>

                {/* Inner Content: Upward Arrow (Default) / Percentage (Hover) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="group-hover:hidden text-[#0F4C3A] font-bold text-sm transition-opacity">
                        ↑
                    </span>
                    <span className="hidden group-hover:block font-mono text-[10px] font-bold text-[#0F4C3A] tracking-tighter">
                        {scrollPercent}%
                    </span>
                </div>
            </button>
        </aside>
    );
};
