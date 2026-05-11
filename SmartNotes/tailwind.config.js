/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#F5F5F2",

        card: {
          pink: "#D9A5B3",
          purple: "#C9B6E4",
          yellow: "#E8C07D",
          cyan: "#9FD5D1",
        },

        text: {
          primary: "#111111",
          secondary: "#6B6B6B",
          light: "#9CA3AF",
        },

        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#ECEBE7",
        },

        border: {
          light: "#E5E5E5",
        },

        accent: {
          black: "#000000",
          white: "#FFFFFF",
        },
      },

      borderRadius: {
        card: "22px",
        button: "18px",
      },

      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },

  plugins: [],
}