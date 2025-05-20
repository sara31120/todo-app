/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

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
        background: "var(--color-bg)",
        textDark: "var(--color-text)",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ':root': {
          '--color-bg': '247 247 247',
          '--color-text': '37 37 37',
          '--color-card': '255 255 255',
        },
        '.dark': {
          '--color-bg': '24 24 27',
          '--color-text': '255 255 255',
          '--color-card': '31 31 31',
        },
      });
    }),
  ],
};
