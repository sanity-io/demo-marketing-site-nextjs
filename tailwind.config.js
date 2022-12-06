const { theme } = require('@sanity/demo/tailwind')

const screen = [360, 600, 900, 1200, 1800, 2400]

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './remotion/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    screens: {
      sm: `${screen[0]}px`,
      md: `${screen[1]}px`,
      lg: `${screen[2]}px`,
      xl: `${screen[3]}px`,
      '2xl': `${screen[4]}px`,
      '3xl': `${screen[5]}px`,
    },
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/typography'),
  ],
}
