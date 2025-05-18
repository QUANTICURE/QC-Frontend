/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom colors for QuantiCure
        primary: {
          50: '#E6F7FA',
          100: '#C0EEF2',
          200: '#97E3EC',
          300: '#6DD9E5',
          400: '#44CFE0',
          500: '#0ABFD0',
          600: '#0891B2',
          700: '#066682',
          800: '#044258',
          900: '#022C3D',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#0891B2',
              '&:hover': {
                color: '#066682',
              },
            },
            strong: {
              color: 'inherit',
            },
            em: {
              color: 'inherit',
            },
            h1: {
              color: 'inherit',
            },
            h2: {
              color: 'inherit',
            },
            h3: {
              color: 'inherit',
            },
            h4: {
              color: 'inherit',
            },
            code: {
              color: '#ef4444',
              backgroundColor: 'rgb(243 244 246)',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.25rem',
              '&::before': {
                content: '""',
              },
              '&::after': {
                content: '""',
              },
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderRadius: '0',
              padding: '0',
            },
            pre: {
              backgroundColor: 'rgb(243 244 246)',
              borderRadius: '0.5rem',
              padding: '1rem',
            },
          },
        },
        invert: {
          css: {
            code: {
              backgroundColor: 'rgb(31 41 55)',
            },
            pre: {
              backgroundColor: 'rgb(31 41 55)',
            },
          },
        },
      },
      boxShadow: {
        subtle: '0 2px 5px 0 rgba(0, 0, 0, 0.05)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'outer-glow': '0 0 15px rgba(10, 191, 208, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        fadeIn: 'fadeIn 0.5s ease-in forwards',
        slideUp: 'slideUp 0.5s ease-out forwards',
        slideDown: 'slideDown 0.3s ease-in-out forwards',
        scale: 'scale 0.2s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};