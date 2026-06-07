import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6', // blue-500
          hover: '#2563eb', // blue-600
          dark: '#1e3a8a', // blue-900
        },
        secondary: {
          DEFAULT: '#f97316', // orange-500
          hover: '#ea580c', // orange-600
          dark: '#7c2d12', // orange-900
        },
        dark: {
          bg: '#0f172a', // slate-900
          card: '#1e293b', // slate-800
          border: '#334155', // slate-700
        }
      },
      borderRadius: {
        card: '1rem',
      },
      fontSize: {
        h1: ['2.5rem', { lineHeight: '3rem', fontWeight: '800' }],
        h2: ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        body: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        small: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
      }
    },
  },
  plugins: [],
};

export default config;
