/** @type {import('tailwindcss').Config}*/



module.exports = {
  content: ["./src/**/**/*.{jsx,css}"],
  theme: {
    extend: {
      height: {
        "w-card": 'calc(100vw + 2rem)',
        "w-image": "calc(100vw - 6rem)",
        600: '600px',
        360: '360px',
      },
      width: {
        600: '600px',
        360: '360px',
      },
      fontFamily: {
        "title-font": ["bree-serif", "sans-serif"],
      },
      colors: {
        "primary-color": '#225A1B',
        "primary-alt": '#003000',
        "secondary-color": '#003000',
        "alt-bg": '#D9D9D9',
        "alt-bg-2": '#F2F2F2',
      },

    }
  }
} 
