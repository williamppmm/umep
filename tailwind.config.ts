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
        ticker: 'ticker 30s linear infinite',
        'spin-forward': 'spinForward 30s linear infinite',
        'spin-reverse': 'spinReverse 50s linear infinite',
        'logo-pulse': 'logoPulse 6s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        spinForward: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        spinReverse: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
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
