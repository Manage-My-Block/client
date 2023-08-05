/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      height: {
        screen: ['100vh', '100dvh'],
      },
    },
    fontFamily: {
      'logo': ['Montserrat']
    }
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin')
  ],
  daisyui: {
    themes: true, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    // themes: ["light", "corporate", "dark", "dracula"], // specify list to include only these themes
    darkTheme: "dark", // name of one of the included themes used for dark mode
    logs: false // turn off console info
  },
}

