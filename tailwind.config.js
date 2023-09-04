/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // enable dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: {
          light: "#130c13",
          dark: "#f7f2f7",
        },
        bg: {
          light: "#f7f2f7",
          dark: "#130c13",
        },
        primary: {
          light: "#523252",
          "light-600": "#521252",
          dark: "#523252",
          "dark-600": "#521252",
        },
        secondary: {
          light: "#e5d7e5",
          dark: "#160e16",
        },
        accent: {
          light: "#362136",
          dark: "#362136",
        },
      },
    },
  },

  plugins: [],
};
