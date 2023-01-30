/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#040227",
        primary: "#FF6363",
        blackOpacity: "rgba(0,0,0,0.5)",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
      },
      fontFamily: {
        body: "Nunito",
      },
    },
  },
  plugins: [],
};
