/** @type {import('tailwindcss').Config} */
module.exports = {
  // Especifica qué archivos debe escanear Tailwind para encontrar las clases usadas
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Rutas en Next.js
    './components/**/*.{js,ts,jsx,tsx}', // Componentes
    './app/**/*.{js,ts,jsx,tsx}', // Si usas la carpeta 'app'
    './src/**/*.{js,ts,jsx,tsx}', // Si usas la estructura 'src'
  ],
  
  // Extensión de temas si es necesario
  theme: {
    extend: {},
  },
  
  // Plugins adicionales si es necesario
  plugins: [],
  
  // Safelist para garantizar que las clases de color no sean eliminadas
  safelist: [
    'bg-green-100',
    'hover:bg-green-200',
    'bg-red-100',
    'hover:bg-red-200',
    'bg-blue-100',
    'hover:bg-blue-200',
    'border-blue-400', // Si usas bordes dinámicos
    'bg-gray-100',
    'hover:bg-gray-200',
    'bg-gray-800',
    'text-white',
    'bg-gray-900',
    'text-black',
  ],
};
