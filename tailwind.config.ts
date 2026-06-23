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
        slate: {
          900: "#0b0f19",
          850: "#111726",
          800: "#1e293b",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gold-teal": "linear-gradient(135deg, #0ea5e9 0%, #00E5FF 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 15px rgba(14, 165, 233, 0.25)",
        "teal-glow": "0 0 15px rgba(0, 229, 255, 0.2)",
        "purple-glow": "0 0 15px rgba(168, 85, 247, 0.25)",
        "sky-glow": "0 0 15px rgba(14, 165, 233, 0.3)",
      }
    },
  },
  plugins: [],
};
export default config;
