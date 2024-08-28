/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#EBECF4",
        primary: "#252525",
        secondary: "#E2E2E2",
        extraColor: "#0D1826",
        textColor: "#0C121C",
      },
    },
  },
  plugins: [],
};
