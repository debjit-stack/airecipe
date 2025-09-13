/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // This is the line you need to add
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}