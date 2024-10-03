module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-green-100',
    'bg-red-100',
    'bg-blue-100',
    'hover:bg-green-200',
    'hover:bg-red-200',
    'hover:bg-blue-200',
  ],
}
