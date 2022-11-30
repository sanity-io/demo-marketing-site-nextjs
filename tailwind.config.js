const { theme } = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    extend: {
      ...theme.extend,
      colors: {
        theme: '#ace975',
        ...theme.extend.colors,
      },
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
}
