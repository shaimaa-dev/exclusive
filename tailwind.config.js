/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "320px",   // موبايل صغير
      sm: "375px",   // موبايل متوسط
      sml: "500px",  // موبايل أكبر
      md: "667px",   // موبايل كبير
      lg: "768px",   // تابلت
      lgl: "1024px", // لابتوب صغير
      xl: "1280px",  // لابتوب متوسط
      "2xl": "1536px" // شاشات كبيرة
    },
    extend: {
      colors: {
        semigreen: " var(--text-semi-green)",
        buttoncolor: "var(--button-colors)",
      },
    },
  },
  plugins: [],
}
