import { ThemeConfig } from 'tailwindcss/types/config';

export type Screen = keyof typeof screens;

export const screens = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const;

export const tailwindScreensConfig: ThemeConfig['screens'] = {
    ...screens,
};
