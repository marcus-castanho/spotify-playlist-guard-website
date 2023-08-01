import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { AppContextProvider } from '../contexts';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
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
        </>
    );
};

export default App;
