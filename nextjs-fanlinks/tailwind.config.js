
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4b00e0',
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#4b00e0',
          600: '#3d00b8',
        },
      },
    },
  },
  plugins: [],
}
