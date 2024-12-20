/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "custom": ["Roboto", "sans-serif"],
      },
      colors: {
        "primary-text": "#10B981",
        "primary-bg": "#10B981",
      }
    },
  },
  plugins: [],
}