import React, { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-[#FAF6EC] flex flex-col justify-center items-center py-10 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#0F4C3A] selection:text-white">
            {/* Header Brand */}
            <div className="mb-6 text-center">
                <Link href="/" className="inline-flex flex-col items-center gap-3 group">
                    <img
                        src="/images/logo_kampus.png"
                        alt="Logo IAI Persis Bandung"
                        className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                    <div>
                        <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#0F4C3A] tracking-tight">
                            IAI PERSIS BANDUNG
                        </h1>
                        <p className="text-xs text-[#5C6B73] font-medium mt-0.5">
                            Program Studi Pendidikan Islam Anak Usia Dini (PIAUD)
                        </p>
                    </div>
                </Link>
            </div>

            {/* Form Card */}
            <div className="w-full sm:max-w-md bg-white border border-[#E3DAC7] rounded-2xl p-6 sm:p-8 shadow-[0_12px_28px_rgba(31,41,51,0.06)]">
                {children}
            </div>

            {/* Back to Home Link */}
            <div className="mt-6 text-center">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F4C3A] hover:text-[#0A3427] hover:underline transition-colors"
                >
                    <span>← Kembali ke Halaman Utama</span>
                </Link>
            </div>
        </div>
    );
}
