/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Warm neutrals
        cream: {
          50: '#FAF8F5',
          100: '#F5F2ED',
          200: '#EDEAE4',
          300: '#E5E0D8',
          400: '#D4CFC5',
        },
        ink: {
          50: '#F5F5F4',
          100: '#E7E5E4',
          200: '#D6D3D1',
          300: '#A8A29E',
          400: '#78716C',
          500: '#57534E',
          600: '#44403C',
          700: '#292524',
          800: '#1C1917',
          900: '#1A1814',
        },
        // Domain colors - refined
        health: {
          DEFAULT: '#059669',
          light: '#D1FAE5',
          dark: '#047857',
        },
        family: {
          DEFAULT: '#2563EB',
          light: '#DBEAFE',
          dark: '#1D4ED8',
        },
        learning: {
          DEFAULT: '#7C3AED',
          light: '#EDE9FE',
          dark: '#6D28D9',
        },
        // Priority colors
        priority: {
          high: '#DC2626',
          medium: '#D97706',
          low: '#6B7280',
        },
        // Accent
        accent: {
          DEFAULT: '#B45309',
          light: '#FEF3C7',
          dark: '#92400E',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(26, 24, 20, 0.04), 0 4px 8px rgba(26, 24, 20, 0.04), 0 8px 16px rgba(26, 24, 20, 0.02)',
        'soft-lg': '0 2px 4px rgba(26, 24, 20, 0.06), 0 8px 16px rgba(26, 24, 20, 0.06), 0 16px 32px rgba(26, 24, 20, 0.04)',
        'glow-health': '0 0 20px rgba(5, 150, 105, 0.15)',
        'glow-family': '0 0 20px rgba(37, 99, 235, 0.15)',
        'glow-learning': '0 0 20px rgba(124, 58, 237, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in': 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
