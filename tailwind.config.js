/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1E1E1E",
        text: "#FFFFFF",
        primary: "#DCF8C6",
        secondary: "#333333",
        primaryText: "#000000",
        secondaryText: "#FFFFFF",
        accent: "#4CAF50",
      },
    },
  },
  plugins: [],
};
