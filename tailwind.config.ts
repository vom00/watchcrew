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
        base: {
          950: "#06060B",
          900: "#0C0C14",
          850: "#10101C",
          800: "#13131F",
          700: "#1A1A2E",
          600: "#24243A",
          500: "#2F2F48",
        },
        accent: {
          cyan: "#00F0FF",
          "cyan-dim": "#00A8B3",
          coral: "#FF3366",
          "coral-dim": "#CC2952",
          violet: "#8B5CF6",
          "violet-dim": "#6D42D6",
          lime: "#39FF14",
          "lime-dim": "#2ACC10",
          amber: "#FFB800",
          "amber-dim": "#CC9300",
          red: "#FF2D2D",
          pink: "#FF006E",
          // Keep backwards-compatible aliases
          orange: "#FF3366",
          "orange-light": "#FF6690",
          blue: "#00F0FF",
          "blue-light": "#66F7FF",
          purple: "#8B5CF6",
          gold: "#FFB800",
          "gold-light": "#FFD54F",
          green: "#39FF14",
          "green-light": "#80FF5C",
        },
        glass: {
          4: "rgba(255, 255, 255, 0.04)",
          8: "rgba(255, 255, 255, 0.08)",
          12: "rgba(255, 255, 255, 0.12)",
        },
      },
      fontFamily: {
        display: ["'Rajdhani'", "system-ui", "sans-serif"],
        body: ["'Outfit'", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-fire": "linear-gradient(135deg, #FF3366, #FFB800)",
        "gradient-xp": "linear-gradient(135deg, #00F0FF, #8B5CF6)",
        "gradient-gold": "linear-gradient(135deg, #FFB800, #FF8C00)",
        "gradient-streak": "linear-gradient(135deg, #39FF14, #00F0FF)",
        "gradient-dark": "linear-gradient(180deg, #06060B 0%, #0C0C14 100%)",
        "gradient-neon": "linear-gradient(135deg, #00F0FF, #8B5CF6, #FF3366)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 240, 255, 0.3)",
        "glow-orange": "0 0 20px rgba(255, 51, 102, 0.3)",
        "glow-gold": "0 0 20px rgba(255, 184, 0, 0.3)",
        "glow-green": "0 0 20px rgba(57, 255, 20, 0.3)",
        "glow-purple": "0 0 20px rgba(139, 92, 246, 0.3)",
        glass: "0 2px 16px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.4)",
        elevated: "0 8px 32px rgba(0, 0, 0, 0.65), 0 2px 6px rgba(0, 0, 0, 0.5)",
        neon: "0 0 20px rgba(0, 240, 255, 0.15), 0 0 60px rgba(0, 240, 255, 0.05)",
        "neon-coral": "0 0 20px rgba(255, 51, 102, 0.15), 0 0 60px rgba(255, 51, 102, 0.05)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        "confetti-fall": "confetti-fall 1.5s ease-out forwards",
        "progress-fill": "progress-fill 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "slide-up": "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        float: "float 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "neon-flicker": "neon-flicker 4s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "300% 0" },
          "100%": { backgroundPosition: "-300% 0" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(-20px) rotate(0deg) scale(1)", opacity: "1" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg) scale(0.3)", opacity: "0" },
        },
        "progress-fill": {
          "0%": { width: "0%", opacity: "0.5" },
          "100%": { width: "var(--progress-width)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.92)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.12", filter: "blur(12px)" },
          "50%": { opacity: "0.3", filter: "blur(16px)" },
        },
        "neon-flicker": {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.8" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.9" },
          "97%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
