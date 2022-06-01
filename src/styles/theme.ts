import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
    createTheme({
        palette: {
            primary: {
                main: '#191414',
            },
            secondary: {
                main: '#1DB954',
            },
            background: {
                default: '#121212',
                paper: '#181818',
            },
            text: {
                primary: '#FFFFFF',
                secondary: 'rgba(255, 255, 255, 0.7)',
                disabled: 'rgba(255, 255, 255, 0.5)',
            },
            action: {
                active: '#FFFFFF',
                hover: 'rgba(255, 255, 255, 0.08)',
                selected: 'rgba(255, 255, 255, 0.16)',
                disabled: 'rgba(255, 255, 255, 0.3)',
                disabledBackground: 'rgba(255, 255, 255, 0.12)',
            },
            divider: 'rgba(255, 255, 255, 0.12)',
        },
        typography: {
            fontFamily: [
                '"Helvetica Neue"',
                'Helvetica',
                'Arial',
                'sans-serif',
            ].join(','),
        },
    }),
);

console.log(theme.palette.text);

export default theme;
