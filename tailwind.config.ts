import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cinematic palette: deep blacks + electric blue accent
        ink: {
          900: '#050608',
          800: '#0a0c10',
          700: '#11141a',
          600: '#1a1e26',
        },
        electric: {
          300: '#9ad6ff',
          400: '#5fb4ff',
          500: '#1e90ff',
          600: '#0a6fe6',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Heavy physical depth for glass panels
        'glass': '0 30px 60px -20px rgba(0,0,0,0.7), 0 18px 36px -18px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.06)',
        'glow-blue': '0 0 40px rgba(30,144,255,0.45), 0 0 80px rgba(30,144,255,0.25)',
        'glow-blue-lg': '0 0 60px rgba(30,144,255,0.6), 0 0 120px rgba(30,144,255,0.35), 0 0 200px rgba(30,144,255,0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'pulse-glow': {
          '0%,100%': { boxShadow: '0 0 30px rgba(30,144,255,0.35)' },
          '50%':     { boxShadow: '0 0 60px rgba(30,144,255,0.7)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 3.5s ease-in-out infinite',
        'shimmer':    'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
