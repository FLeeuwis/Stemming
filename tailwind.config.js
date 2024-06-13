/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
      fontFamily: {
        koulen: ["Koulen", "sans-serif"],
        trispace: ["Trispace", "sans-serif"],
      },
    },
  },
  plugins: [],
};
