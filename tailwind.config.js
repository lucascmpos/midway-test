/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "main-700m": "#00726D",
        "disabled-grey": "#9D9B9B",
      },
    },
  },
  plugins: [],
}