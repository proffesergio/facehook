// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fb: {
          blue: "#1877F2",
          bg: "#F0F2F5",
          card: "#FFFFFF",
          text: "#050505",
          secondary: "#65676B",
          hover: "#E4E6EB",
          active: "#E7F3FF",
        },
      },
    },
  },
  plugins: [],
};
export default config;