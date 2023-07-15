import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '../contexts/AuthContext';
import { QueryProvider } from '../contexts/QueryContext';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <QueryProvider>
                <Head>
                    <meta
                        name="viewport"
                        content="initial-scale=1, width=device-width"
                    />
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </QueryProvider>
        </AuthProvider>
    );
};

export default App;
