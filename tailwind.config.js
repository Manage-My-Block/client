/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "corporate", "dark", "dracula"], // included themes
    darkTheme: "dark", // name of one of the included themes used for dark mode
    logs: false // turn off console info
  },
}

