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
                // Natural directional shadows without ANY white glowing aura (#ffffff)
                'card': '0 4px 16px -2px rgba(31, 41, 51, 0.08), 0 2px 6px -1px rgba(31, 41, 51, 0.04)',
                'card-hover': '0 16px 32px -4px rgba(15, 76, 58, 0.12), 0 8px 16px -2px rgba(31, 41, 51, 0.06)',
                'soft': '0 2px 8px 0 rgba(31, 41, 51, 0.06)',
                'neu-raised': '0 6px 18px -2px rgba(31, 41, 51, 0.08), 0 2px 6px -1px rgba(31, 41, 51, 0.04)',
                'neu-raised-sm': '0 3px 10px -1px rgba(31, 41, 51, 0.07)',
                'neu-raised-lg': '0 18px 38px -4px rgba(15, 76, 58, 0.14), 0 8px 18px -2px rgba(31, 41, 51, 0.06)',
                'neu-inset': 'inset 0 2px 5px rgba(31, 41, 51, 0.08)',
                'neu-inset-sm': 'inset 0 1px 3px rgba(31, 41, 51, 0.06)',
                'neu-emerald': '0 8px 20px -2px rgba(10, 52, 39, 0.45)',
                'neu-terracotta': '0 8px 20px -2px rgba(194, 97, 58, 0.45)',
            },
            keyframes: {
                // Bold & Confident Spring Motions (60px travel distance, zero opacity fade)
                springUp: {
                    '0%': { transform: 'translateY(60px) scale(0.94)' },
                    '70%': { transform: 'translateY(-6px) scale(1.01)' },
                    '100%': { transform: 'translateY(0) scale(1)' },
                },
                springDown: {
                    '0%': { transform: 'translateY(-40px)' },
                    '70%': { transform: 'translateY(4px)' },
                    '100%': { transform: 'translateY(0)' },
                },
                springPop: {
                    '0%': { transform: 'scale(0.82)' },
                    '65%': { transform: 'scale(1.06)' },
                    '100%': { transform: 'scale(1)' },
                },
                springBounce: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-7px)' },
                },
                gentleWobble: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(-6deg) scale(1.05)' },
                    '75%': { transform: 'rotate(6deg) scale(1.05)' },
                },
            },
            animation: {
                'spring-up': 'springUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                'spring-down': 'springDown 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                'spring-pop': 'springPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                'spring-bounce': 'springBounce 2s ease-in-out infinite',
                'wobble': 'gentleWobble 0.6s ease-in-out',
            },
        },
    },

    plugins: [forms],
};
