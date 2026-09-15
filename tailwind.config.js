/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Preflight desactivado para no alterar el diseño propio de la app (estilo "candy").
  corePlugins: { preflight: false },
  theme: {
    extend: {},
  },
  plugins: [],
}
