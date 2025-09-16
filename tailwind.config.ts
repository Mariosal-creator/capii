// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0B0F17",          // Fondo oscuro principal
        neon: {
          purple: "#A855F7",
          blue: "#38BDF8",
          purpleSoft: "#C084FC",
          blueSoft: "#60A5FA",
        },
        textc: {
          primary: "#E6E8EE",
          secondary: "#9AA3B2",
        },
      },
      boxShadow: {
        neon: "0 0 22px rgba(168,85,247,.55)",
        neonLg: "0 0 30px rgba(56,189,248,.70)",
      },
    },
  },
  plugins: [],
};

export default config;
