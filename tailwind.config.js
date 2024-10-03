/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',  // Si usas Next.js
    './components/**/*.{js,ts,jsx,tsx}',  // Si tienes componentes
    './app/**/*.{js,ts,jsx,tsx}',  // Si usas la nueva carpeta 'app' de Next.js
    './src/**/*.{js,ts,jsx,tsx}',  // Si los archivos están en src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
