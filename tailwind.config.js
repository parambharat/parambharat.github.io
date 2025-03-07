/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Enable dark mode with class strategy
    content: [
        "./layouts/**/*.{html,js}",
        "./static/**/*.js",
        "./assets/css/**/*.css",
        "./**/*.html",
        "./content/**/*.md"
    ],
    theme: {
        extend: {
            fontFamily: {
                terminal: ['"Special Elite"', 'Courier', 'monospace']
            },
            animation: {
                'cursor-blink': 'blink 0.8s infinite'
            },
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0 }
                }
            }
        }
    },
    // Safelist font-terminal to ensure it's included
    safelist: ['font-terminal'],
    plugins: [],
} 