import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { AppContextProvider } from '../contexts';
import ErrorBoundary from '../components/ErrorBoundary';
import { ErrorFallback } from '../components/ErrorFallback';
import { appWithTranslation } from 'next-i18next';
import { i18n } from '../../next-i18next.config';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ErrorBoundary fallback={<ErrorFallback />}>
            <Head>
                <title>Spotify Playlist Guard</title>
                <meta
                    name="description"
                    content="An app bot to guard your collaborative playlists"
                />
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

export default appWithTranslation(App, { i18n });
