/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      boxShadow: {
        // 'custom-xl': '0 0 20px 5px rgba(255, 255, 255, 0.5)',
        'custom-xl': '0 0 20px 5px rgba(0, 0, 0, 0.5)',
      },
      colors: {
        'black-dark':'#00000050',
        'dull-white': '#FFFFFFB3',
        'white-light': '#FFFFFF30',
        'white-medium': '#FFFFFF40',
        'neon-blue': '#2FB8FF',
      },
      rotate:{
        '35': '35deg',
      }
    },
  },
  rules: [
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
  ],
  plugins: [],
}

