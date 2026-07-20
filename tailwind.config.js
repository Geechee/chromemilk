/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {
    colors: {
      milk: { 50: '#faf8ff', 100: '#f3effe', 200: '#e9e0fd', 500: '#a78bfa', 600: '#7c3aed', 700: '#6d28d9', 900: '#3b0764' },
      ink: { 50: '#f8f8f8', 100: '#e8e8e8', 200: '#d4d4d4', 400: '#888', 600: '#444', 800: '#1a1a1a', 900: '#0a0a0a', 950: '#050505' }
    }
  }},
  plugins: [],
}
