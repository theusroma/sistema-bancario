/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Isso diz ao Tailwind para escanear todos os arquivos .html, .js, .jsx, .ts e .tsx
    // dentro do diretório 'src' e 'public' para encontrar classes.
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}