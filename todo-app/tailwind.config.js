/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        brand: "rgba(108, 99, 255, 1)",
        background: "rgba(247, 247, 247, 1)",
        textDark: "rgba(37, 37, 37, 1)",
      },
    },
  },
  plugins: [],
};
