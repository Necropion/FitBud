// tailwind.config.js
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],

    theme: {
        extend: {
            colors: {
                primary: "#000000", // black as the primary
                accent: "#f97316",  // orange-500
                "muted-foreground": "#9ca3af", // optional: for light grey text
            },
        },
    },
    plugins: [],
}
