/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1C1C1E',
          900: '#161618',
          800: '#1C1C1E',
          700: '#2A2A2D',
          600: '#3A3A3E',
        },
        concrete: {
          DEFAULT: '#6E6E73',
          light: '#9A9A9F',
          dark: '#4A4A4E',
        },
        warm: {
          white: '#F7F4EF',
          50: '#FBFAF7',
          100: '#F2EEE7',
        },
        beige: {
          DEFAULT: '#C2A98A',
          light: '#D8C6AE',
          dark: '#A98E6C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(28, 28, 30, 0.18)',
        soft: '0 20px 60px -20px rgba(28, 28, 30, 0.28)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-in': 'fade-in 0.9s ease-out both',
      },
    },
  },
  plugins: [],
}
