module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            screens: {
                xs: "320px",
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ["active"],
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
