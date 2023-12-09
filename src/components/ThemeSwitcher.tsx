import { useTheme } from '@/contexts/ThemeContext';
import React, { FC } from 'react';
import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';

export const ThemeSwitcher: FC = () => {
    const { theme, switchTheme } = useTheme();
    const alternativeTheme = theme === 'dark' ? 'light' : 'dark';
    const icon =
        theme === 'dark' ? (
            <SunIcon size={24} fillColor="white" />
        ) : (
            <MoonIcon size={24} />
        );

    return (
        <button
            aria-label="theme-switcher-button"
            onClick={() => switchTheme(alternativeTheme)}
        >
            {icon}
        </button>
    );
};
