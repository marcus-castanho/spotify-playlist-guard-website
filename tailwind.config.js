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
    },
    plugins: [],
    darkMode: 'class',
};
