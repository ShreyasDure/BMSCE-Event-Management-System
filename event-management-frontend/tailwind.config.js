export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        navy: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0A2540',
        },
        'indigo-sage': {
          50: '#F5F3FF',
          100: '#E9E5FF',
          200: '#D4CCFF',
          300: '#B8A5FF',
          400: '#9B59B6',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B3FD6',
          800: '#4C1D95',
          900: '#3730A3',
        },
        orange: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}