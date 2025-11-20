import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        gold: {
          DEFAULT: "#FFD700",
          light: "#FFE55C",
          dark: "#FFA500",
        },
        dark: {
          DEFAULT: "#0a0a0a",
          lighter: "#1a1a1a",
          light: "#2a2a2a",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gold": "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
        "gradient-dark": "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 3s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        glow: {
          "0%": {
            boxShadow: "0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px #FFD700",
          },
          "100%": {
            boxShadow: "0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFA500",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
