/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": "0.65rem",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        marquee2: "marquee2 30s linear infinite",
        logofirst: "logofirst 500ms ease 300ms forwards",
        logolast: "logolast 500ms ease 300ms forwards",
        "fade-in-200": "fade-in 200ms ease 200ms forwards",
        "fade-in": "fade-in 750ms ease-in-out 200ms forwards",
        "portrait-rotate": "portrait-rotate 400ms ease-in-out 200ms forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        logofirst: {
          "0%": { transform: "translateX(25px)", opacity: 0 },
          "100%": { transform: "translateX(0px)", opacity: 1 },
        },
        logolast: {
          "0%": { transform: "translateX(25px)", opacity: 0 },
          "100%": { transform: "translateX(45px)", opacity: 1 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "portrait-rotate": {
          "0%": { opacity: 0, transform: "rotate(-6deg) translateX(-30%)" },
          "100%": { opacity: 1, transform: "rotate(6deg) translateX(0%)" },
        },
      },
    },
    fontFamily: {
      sans: ["Helvetica", "Arial", "sans-serif"],
      heading: ["Geologica", "Bakbak One", "Helvetica", "Arial", "sans-serif"],
    },
  },
  plugins: [],
};
