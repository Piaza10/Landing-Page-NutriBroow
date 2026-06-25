/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        broow: {
          black: "#070707",
          charcoal: "#121212",
          orange: "#ff6b1a",
          amber: "#ffc247",
          cream: "#fff8e6",
        },
      },
      boxShadow: {
        glow: "0 0 34px rgba(255, 107, 26, 0.24)",
      },
    },
  },
  plugins: [],
};
