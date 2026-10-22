import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Public Sans"', 'Inter', ...defaultTheme.fontFamily.sans],
                serif: ['"Source Serif 4"', 'Georgia', ...defaultTheme.fontFamily.serif],
            },
            colors: {
                piaud: {
                    emerald: '#0F4C3A',
                    'emerald-dark': '#0A3427',
                    'emerald-light': '#17664F',
                    ivory: '#FFFFFF',
                    'ivory-dark': '#F8FAFC',
                    terracotta: '#A94A24',
                    'terracotta-dark': '#8C3917',
                    slate: '#1F2933',
                    'slate-muted': '#52606D',
                    border: '#E2E8F0',
                },
            },
            boxShadow: {
                'card': '0 2px 12px -2px rgba(15, 76, 58, 0.06), 0 4px 16px -2px rgba(0, 0, 0, 0.04)',
                'card-hover': '0 12px 28px -4px rgba(15, 76, 58, 0.12), 0 6px 14px -2px rgba(0, 0, 0, 0.06)',
                'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'fade-in': 'fadeIn 0.4s ease-out forwards',
            },
        },
    },

    plugins: [forms],
};
