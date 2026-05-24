/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ap: {
          bg: '#f7faf9',
          surface: '#ffffff',
          text: '#172124',
          muted: '#5c6b70',
          line: '#d7e2df',
          primary: '#0f766e',
          primaryDark: '#135f86',
          warning: '#9a6700',
          warningBg: '#fff7df',
          danger: '#b42318',
          dangerBg: '#fff0ef',
        },
      },
    },
  },
  plugins: [],
};
