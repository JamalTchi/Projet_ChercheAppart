/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        background: '#F3F4F6',
        textPrimary: '#111827',
        textSecondary: '#6B7280',
      },
    },
  },
  plugins: [],
};

