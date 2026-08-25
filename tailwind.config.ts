import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A3A6E',
          600: '#274B88',
        },
        accent: {
          DEFAULT: '#F4C542',
        },
        whatsapp: {
          DEFAULT: '#25D366',
        },
        umep: {
          text: '#0B1320',
          bg: '#F3F6F9',
          border: '#E3E9EF',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        ticker: 'ticker 4.5s cubic-bezier(0.22, 1, 0.36, 1) 1 both',
        'spin-forward': 'spinForward 4.5s cubic-bezier(0.22, 1, 0.36, 1) 1 both',
        'spin-reverse': 'spinReverse 4.5s cubic-bezier(0.22, 1, 0.36, 1) 1 both',
        'logo-pulse': 'logoPulse 4s ease-in-out 1',
      },
      keyframes: {
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-12rem)' },
        },
        spinForward: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(12deg)' },
        },
        spinReverse: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-12deg)' },
        },
        logoPulse: {
          '0%, 100%': { opacity: '0.08' },
          '50%': { opacity: '0.15' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
