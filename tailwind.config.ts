import type { Config } from "tailwindcss";

const config: Config = {
  // Add this line to force Tailwind to use the .dark CSS class on <html>
  darkMode: "class", 
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0B0B",
        charcoal: "#161616",
        bone: "#F5F5F5",
        bronze: "#C5A880",
        ember: "#A96E49",
        neutral: {
          50: "#faf9f6",
          100: "#f5f3ed",
          200: "#e8e5db",
          300: "#d4cfc4",
          400: "#b8b0a0",
          500: "#9a9080",
          600: "#6b6357",
          700: "#4a453d",
          800: "#2d2a25",
          900: "#161616",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        border: "var(--border)",
        ring: "var(--ring)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(197,168,128,.24), 0 18px 70px rgba(0,0,0,.45)",
        "gold-glow": "0 0 20px rgba(197, 168, 128, 0.15)",
      },
      letterSpacing: {
        editorial: ".16em",
      },
      borderRadius: {
        sm: "calc(var(--radius) - 2px)",
        md: "var(--radius)",
        lg: "calc(var(--radius) + 4px)",
      },
    },
  },
  plugins: [],
};

export default config;