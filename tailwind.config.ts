import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        primary: '#0a0a0a', // Neutral 950 (Almost Black)
        accent: '#FF6B00', // Electric Orange (High Saturation)
        light: '#fafafa', // Neutral 50 (Almost White)

        // Extended Brand Palette
        brand: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#FF8C33',
          500: '#FF6B00',
          600: '#E55F00',
          700: '#CC5500',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        }
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.3s ease-out',
      }
    },
  },
  plugins: [],
}
export default config
