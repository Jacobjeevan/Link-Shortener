const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
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
