/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "0px",
        // => @media (min-width: 0px) { ... }

        xs: "400px",
        // => @media (min-width: 400px) { ... }
      },
    },
  },
  plugins: [],
};
