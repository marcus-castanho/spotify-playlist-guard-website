import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1DB954',
            light: '#45DE73',
        },
        secondary: {
            main: '#1ED760',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#191414',
        },
        text: {
            primary: '#ffffff',
        },
    },
});

export default theme;
