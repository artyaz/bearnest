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
    extend: {},
  },
  plugins: [],
};
