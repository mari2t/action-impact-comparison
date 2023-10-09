/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "gradient-teal200-white-red200":
          "linear-gradient(to right, #B2F5EA, #FFFFFF, #FEB2B2)", // teal-200 から 白 そして 白 から red-200 のグラデーション
      }),
    },
  },
  plugins: [require("daisyui")],
};
