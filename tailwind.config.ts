/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        background: "#0A0F1E",
        surface: "#0F1629",
        card: "#121930",
        border: "#1E2A45",
        "border-light": "#243050",
        // Brand primaries
        primary: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          glow: "rgba(37, 99, 235, 0.35)",
        },
        sky: {
          DEFAULT: "#0EA5E9",
          400: "#38BDF8",
          500: "#0EA5E9",
          glow: "rgba(14, 165, 233, 0.3)",
        },
        teal: {
          DEFAULT: "#14B8A6",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          glow: "rgba(20, 184, 166, 0.3)",
        },
        amber: {
          DEFAULT: "#F59E0B",
          400: "#FCD34D",
          500: "#F59E0B",
          glow: "rgba(245, 158, 11, 0.3)",
        },
        slate: {
          950: "#020617",
          900: "#0F172A",
          850: "#172033",
          800: "#1E293B",
          700: "#334155",
          600: "#475569",
          500: "#64748B",
          400: "#94A3B8",
          300: "#CBD5E1",
          200: "#E2E8F0",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "brand-gradient": "linear-gradient(135deg, #2563EB 0%, #0EA5E9 50%, #14B8A6 100%)",
        "hero-gradient": "radial-gradient(ellipse at top, rgba(37,99,235,0.15) 0%, transparent 60%)",
        "card-gradient": "linear-gradient(145deg, rgba(15,22,41,0.9) 0%, rgba(18,25,48,0.8) 100%)",
      },
      boxShadow: {
        "primary-glow": "0 0 30px rgba(37, 99, 235, 0.25), 0 4px 15px rgba(37, 99, 235, 0.15)",
        "sky-glow": "0 0 25px rgba(14, 165, 233, 0.25)",
        "teal-glow": "0 0 25px rgba(20, 184, 166, 0.25)",
        "amber-glow": "0 0 25px rgba(245, 158, 11, 0.25)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0,0,0,0.3)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(37,99,235,0.2)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.08)",
        // Legacy compatibility
        "gold-glow": "0 0 20px rgba(14, 165, 233, 0.25)",
        "premium-glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "purple-glow": "0 0 25px rgba(99, 102, 241, 0.25)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
