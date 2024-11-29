const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: "#001158", // Dark Blue
        secondary: "#206EBB", // Medium Blue
        accent1: "#47A8DA", // Lighter Blue
        accent2: "#6DC7EB", // Even Lighter Blue
        accent3: "#9FE1F7", // Soft Light Blue
        accent4: "#C7F0FB", // Lightest Blue
        accent5: "#eff9fc", // Lightest Blue
      },
      animation: {
        "spin-slow": "spin 4s linear infinite",
        zigzag: "zigzag 1.5s ease-in-out infinite",
        sharp: "sharp 1.2s infinite",
        "pulse-glow": "pulse-glow 2s infinite",
      },
      keyframes: {
        zigzag: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        sharp: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 1 },
        },
        "pulse-glow": {
          "0%, 100%": { transform: "scale(1)", opacity: 0.1 },
          "50%": { transform: "scale(1.2)", opacity: 0.3 },
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
