import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'brand-blue': {
          DEFAULT: "#2B4C8C",
          dark: "#1E3A6F",
          light: "#3D5FA1",
          50: '#EEF2F9',
          100: '#D5E0F0',
          200: '#AAC1E1',
          300: '#809FD1',
          400: '#5B7FC2',
          500: '#2B4C8C',
          600: '#243F76',
          700: '#1E3361',
          800: '#17284C',
          900: '#111E3A',
        },
        'brand-red': {
          DEFAULT: "#E94B3C",
          dark: "#D63829",
          light: "#ED6358",
          50: '#FEF1F0',
          100: '#FCDAD7',
          200: '#F9B5AE',
          300: '#F58F85',
          400: '#EF6A5C',
          500: '#E94B3C',
          600: '#D63829',
          700: '#B42E21',
          800: '#8F241A',
          900: '#6B1B14',
        },
        primary: {
          DEFAULT: "#2B4C8C",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#E94B3C",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#059669",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
        accent: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config