import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Neutrais escuros obsidian/grafite (remove o tom azul chapado padrão)
        slate: {
          950: "#08090d",
          900: "#0f1118",
          850: "#141720",
          800: "#1c202d",
          750: "#232838",
          700: "#2f364a",
          600: "#47526b",
          500: "#64748b",
          400: "#94a3b8",
          300: "#cbd5e1",
          200: "#e2e8f0",
          100: "#f1f5f9",
        },
        // Verde meio azulado (Teal / Turquesa / Emerald) para letras e detalhes
        emerald: {
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
        teal: {
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
        },
        cyan: {
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
        },
        amber: {
          400: "#fbbf24",
          500: "#f59e0b",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
