/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080c",
        card: "#12121a",
        border: "#1e1e2f",
        gold: {
          DEFAULT: "#0ea5e9", // Mapped to beautiful sky blue
          glow: "#38bdf8",
          dark: "#0284c7",
        },
        teal: {
          DEFAULT: "#00E5FF",
          glow: "#80F7FF",
          dark: "#00838F",
        },
        fuchsia: {
          DEFAULT: "#d946ef",
          glow: "#f0abfc",
          dark: "#a21caf",
        },
        indigo: {
          DEFAULT: "#6366f1",
          glow: "#818cf8",
          dark: "#4338ca",
        },
        slate: {
          950: "#020617",
          900: "#0b0f19",
          850: "#111726",
          800: "#1e293b",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gold-teal": "linear-gradient(135deg, #0ea5e9 0%, #00E5FF 100%)",
        "purple-sky": "linear-gradient(to right, #a855f7, #0ea5e9)",
      },
      boxShadow: {
        "gold-glow": "0 0 15px rgba(14, 165, 233, 0.25)",
        "teal-glow": "0 0 25px rgba(0, 229, 255, 0.3)",
        "purple-glow": "0 0 25px rgba(168, 85, 247, 0.3)",
        "sky-glow": "0 0 25px rgba(14, 165, 233, 0.3)",
        "premium-glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: "0.6", transform: "scale(1)" },
          '50%': { opacity: "1", transform: "scale(1.05)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
