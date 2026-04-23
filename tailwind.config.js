/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base: '#FAFAF7',
          alt: '#F2F1EC',
          raised: '#FFFFFF',
          dark: '#0B0B0C',
        },
        brand: {
          DEFAULT: '#F79A3F',
          hover: '#E0831F',
          tint50: '#FFF4E8',
          tint100: '#FFE5C7',
        },
        ink: {
          DEFAULT: '#0B0B0C',
          700: '#1F2023',
          500: '#4A4C52',
          300: '#9A9CA2',
        },
        border: {
          subtle: '#E7E5DE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1280px',
      },
      borderRadius: {
        btn: '8px',
        card: '16px',
        block: '24px',
      },
      animation: {
        'scroll-logos': 'scrollLogos 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
      },
      keyframes: {
        scrollLogos: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
