import React, { PropsWithChildren } from 'react';
import { Navbar } from '@/Components/Public/Navbar';
import { Footer } from '@/Components/Public/Footer';

interface PublicLayoutProps {
    className?: string;
}

export default function PublicLayout({
    children,
    className = '',
}: PropsWithChildren<PublicLayoutProps>) {
    return (
        <div className="min-h-screen bg-piaud-ivory text-piaud-slate flex flex-col font-sans selection:bg-piaud-emerald selection:text-white">
            {/* Top Bar & Main Navbar */}
            <Navbar />

            {/* Main Content with Smooth Fade-in-up Entrance Animation */}
            <main className={`flex-1 w-full animate-fade-in-up ${className}`}>
                {children}
            </main>

            {/* Institutional Footer */}
            <Footer />
        </div>
    );
}
