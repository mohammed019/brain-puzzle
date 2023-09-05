/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // enable dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: {
          light: {
            500: "#130c13",
            600: "#110a11",
            700: "#0f090f",
          },
          dark: {
            500: "#f7f2f7",
            600: "#ded9de",
            700: "#c5c1c5",
          },
        },
        bg: {
          light: {
            500: "#f7f2f7",
            600: "#ded9de",
            700: "#c5c1c5",
          },
          dark: {
            500: "#130c13",
            600: "#110a11",
            700: "#0f090f",
          },
        },
        primary: {
          light: {
            500: "#523252",
            600: "#492d49",
            700: "#412841",
          },
          dark: {
            500: "#523252",
            600: "#492d49",
            700: "#412841",
          },
        },
        secondary: {
          light: {
            500: "#e5d7e5",
            600: "#cec1ce",
            700: "#b7acb7",
          },
          dark: {
            500: "#160e16",
            600: "#130c13",
            700: "#110b11",
          },
        },
        accent: {
          500: "#362136",
          600: "#301d30",
          700: "#2b1a2b",
        },
      },
    },
  },

  plugins: [],
};
