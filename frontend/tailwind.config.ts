import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--background)",
      },
      primary: {
          500: '#624CF5',
          50: ' #F6F8FD',
          DEFAULT: '#624CF5',
          foreground: 'hsl(var(--primary-foreground))',
        },
    },
  },
  plugins: [],
} satisfies Config;
