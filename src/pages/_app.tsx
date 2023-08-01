import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { AppContextProvider } from '../contexts';
import ErrorBoundary from '../components/ErrorBoundary';
import { ErrorFallback } from '../components/ErrorFallback';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ErrorBoundary fallback={<ErrorFallback />}>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <AppContextProvider>
                <CssBaseline />
                <Component {...pageProps} />
            </AppContextProvider>
        </ErrorBoundary>
    );
};

export default App;
