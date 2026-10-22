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
                    ivory: '#FFFFFF',
                    'ivory-dark': '#F8FAFC',
                    terracotta: '#A94A24',
                    'terracotta-dark': '#8C3917',
                    slate: '#1F2933',
                    'slate-muted': '#52606D',
                    border: '#E2E8F0',
                },
            },
            borderRadius: {
                DEFAULT: '2px',
                sm: '2px',
                md: '4px',
            },
        },
    },

    plugins: [forms],
};
