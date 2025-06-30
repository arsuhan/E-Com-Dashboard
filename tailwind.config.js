// export default {
//     content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
//     theme: {
//       extend: {},
//     },
//     plugins: [],
//   };

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['selector', '[class*="app-dark"]'],
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    plugins: [require('tailwindcss-primeui')],
    theme: {
        screens: {
            xs: '320px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        }
    }
};
