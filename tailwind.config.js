/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "schabo": "Schabo",
      "e-ukraine": "e-Ukraine",
    },
    screens: {
      "tablet": "768px",
      "laptop": "1024px",
      "desktop": "1920px",
    },
    extend: {},
  },
  plugins: [],
};
