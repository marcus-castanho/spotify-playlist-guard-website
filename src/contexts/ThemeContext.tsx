import React, { ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';

export type ThemeProviderProps = {
    children?: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
    return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}
