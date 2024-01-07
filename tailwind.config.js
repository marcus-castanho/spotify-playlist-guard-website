const {
    tailwindColorsConfig: colors,
    tailwindScreensConfig: screens,
    tailwindShadowsConfig: shadows,
    tailwindSpacingConfig: spacing,
    tailwindFontFamilyConfig: fontFamily,
    tailwindFontSizeConfig: fontSize,
    tailwindFontWeightConfig: fontWeight,
} = require('./src/styles/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {},
        colors,
        screens,
        boxShadow: shadows,
        spacing,
        fontFamily,
        fontSize,
        fontWeight,
        keyframes: {
            spin: {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};
