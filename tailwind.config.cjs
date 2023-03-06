/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#383B42",
        dark: "#22262C",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

module.exports = config;
