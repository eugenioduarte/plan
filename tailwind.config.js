/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f8f9fa",
        primary: "#252525",
        secondary: "#f8f9fa",
        extraColor: "#0D1826",
        textColor: "#0C121C",
      },
    },
  },
  plugins: [],
};
