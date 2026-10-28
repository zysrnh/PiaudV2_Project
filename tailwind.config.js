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
                sans: ['"Plus Jakarta Sans"', 'Inter', ...defaultTheme.fontFamily.sans],
                serif: ['"Lora"', 'Georgia', ...defaultTheme.fontFamily.serif],
            },
            colors: {
                piaud: {
                    emerald: '#0F4C3A',
                    'emerald-dark': '#0A3427',
                    'emerald-light': '#17664F',
                    ivory: '#FAF6EC',
                    'ivory-dark': '#F2ECE0',
                    terracotta: '#C2613A',
                    'terracotta-dark': '#A64F2D',
                    slate: '#1F2933',
                    'slate-muted': '#52606D',
                    border: '#E3DAC7',
                },
            },
            boxShadow: {
                'card': '0 2px 6px -1px rgba(31, 41, 51, 0.08), 0 1px 3px -1px rgba(31, 41, 51, 0.05)',
                'card-hover': '0 8px 16px -2px rgba(15, 76, 58, 0.12), 0 3px 6px -1px rgba(0, 0, 0, 0.06)',
                'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
                'neu-raised': '6px 6px 14px #d8d1c4, -6px -6px 14px #ffffff',
                'neu-raised-sm': '3px 3px 8px #d8d1c4, -3px -3px 8px #ffffff',
                'neu-raised-lg': '10px 10px 22px #d5cec0, -10px -10px 22px #ffffff',
                'neu-inset': 'inset 3px 3px 6px #d8d1c4, inset -3px -3px 6px #ffffff',
                'neu-inset-sm': 'inset 2px 2px 4px #d8d1c4, inset -2px -2px 4px #ffffff',
                'neu-emerald': '5px 5px 12px #0a3427, -4px -4px 10px #14644d',
                'neu-terracotta': '5px 5px 12px #8c3917, -4px -4px 10px #e07952',
            },
            keyframes: {
                // Interactive Physics Springs (Zero Opacity/Fade)
                springUp: {
                    '0%': { transform: 'translateY(36px) scale(0.97)' },
                    '68%': { transform: 'translateY(-4px) scale(1.006)' },
                    '100%': { transform: 'translateY(0) scale(1)' },
                },
                springDown: {
                    '0%': { transform: 'translateY(-24px)' },
                    '68%': { transform: 'translateY(3px)' },
                    '100%': { transform: 'translateY(0)' },
                },
                springPop: {
                    '0%': { transform: 'scale(0.86)' },
                    '65%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1)' },
                },
                springBounce: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                gentleWobble: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(-5deg) scale(1.04)' },
                    '75%': { transform: 'rotate(5deg) scale(1.04)' },
                },
            },
            animation: {
                'spring-up': 'springUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'spring-down': 'springDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'spring-pop': 'springPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                'spring-bounce': 'springBounce 2s ease-in-out infinite',
                'wobble': 'gentleWobble 0.6s ease-in-out',
            },
        },
    },

    plugins: [forms],
};
