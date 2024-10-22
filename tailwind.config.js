/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
    },
  },
  plugins: [],
};
