module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        emr: "#1e824c",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
