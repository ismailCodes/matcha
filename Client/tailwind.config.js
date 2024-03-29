module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat'],
      },
      colors: {
        roseMatcha: '#F03A66',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
      boxShadow: ['active'],
    },
  },
  plugins: [],
};
