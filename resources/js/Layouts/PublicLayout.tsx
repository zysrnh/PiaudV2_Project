import React, { PropsWithChildren } from 'react';
import { Navbar } from '@/Components/Public/Navbar';
import { Footer } from '@/Components/Public/Footer';
import { FloatingWhatsApp } from '@/Components/Public/FloatingWhatsApp';
import { ScrollProgress } from '@/Components/Public/ScrollProgress';

interface PublicLayoutProps {
    className?: string;
}

export default function PublicLayout({
    children,
    className = '',
}: PropsWithChildren<PublicLayoutProps>) {
    return (
        <div className="min-h-screen bg-piaud-ivory text-piaud-slate flex flex-col font-sans selection:bg-piaud-emerald selection:text-white relative">
            {/* Top Bar & Main Navbar */}
            <Navbar />

            {/* Main Content with Physics Spring Entrance */}
            <main className={`flex-1 w-full animate-spring-up ${className}`}>
                {children}
            </main>

            {/* Institutional Footer */}
            <Footer />

            {/* Floating Left: WhatsApp PMB */}
            <FloatingWhatsApp />

            {/* Floating Right: Scroll Progress & Back to Top */}
            <ScrollProgress />
        </div>
    );
}
