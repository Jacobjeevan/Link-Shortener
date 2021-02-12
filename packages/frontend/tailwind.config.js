const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: defaultTheme.fontFamily,
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
