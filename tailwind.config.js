const { guessProductionMode } = require('@ngneat/tailwind');
const colors = require('tailwindcss/colors');
process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  prefix: '',
  important: ':<USERNAME>',
  // mode: 'jit',
  purge: {
    content: ['./src/**/*.{html,ts,css,scss,sass,less,styl}']
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1440px'
    },
    extend: {
      colors: {
        primary: '#5bc4d6',
        accent: '#4164a9',
        warn: '#ff9966',
        cyan: colors.cyan
      },
      spacing: {
        page: '1.25rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
