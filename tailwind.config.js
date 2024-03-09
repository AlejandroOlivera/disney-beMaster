/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#142864",
          "secondary": "#007aff",
          "accent": "#00ec00",
          "neutral": "#14143c",
          "base-100": "#f3f4f6",
          "info": "#0592ff",
          "success": "#009700",
          "warning": "#9d6600",
          "error": "#ee3340",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

