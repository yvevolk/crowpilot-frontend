/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./Screens/*.js", "./Contexts/*.js"],
  theme: {
    extend: {
      // fontSize: {
      //   xs: '0.75rem',
      //   sm: '0.875rem',
      //   base: '1rem',
      //   lg: '1.125rem',
      //   xl: '1.25rem',
      //   '2xl': '1.5rem',
      //   '3xl': '1.875rem',
      //   '4xl': '2.25rem',
      //   '5xl': '3rem',
      //   '6xl': '4rem',
      // }
    },
    colors: {
      transparent: 'transparent',
      'white': '#FFFCFF',
      'grey': {
        light: '#E9E7E9',
        dark: '#A09FA0',
        DEFAULT: '#CECACE',
      },
      'blue': {
        light: '#D4E2EE',
        dark: '#6A8EAE',
        DEFAULT: '#92BCD6'
      },
      'navy': '#2D3047',
      'black': '#1B1B1E',
      'yellow': {
        DEFAULT: '#E7BB41',
        dark: '#DA9D41'}
    },
  },
  plugins: [],
}

