/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          border: 'var(--elhalc8n-specular-light)',
          'border-dark': 'var(--elhalc8n-specular-dark)',
        },
      },
    },
  },
  plugins: [],
};

