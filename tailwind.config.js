/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "midway-green-600": "#00726D",
        "midway-green-500": "#E5FFFE",
        "midway-green-700": "#004D49",
        "midway-green-800": "#1F2B2A",
        "disabled-grey": "#9D9B9B",
        "midway-grey-800": "#252525"
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}