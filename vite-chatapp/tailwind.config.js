/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    theme: {
      extend: {
        colors: {
          custom: {
            "748D92": "#748D92",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
