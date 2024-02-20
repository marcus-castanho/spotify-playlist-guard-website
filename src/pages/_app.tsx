import React from 'react';
import '@/styles/globals.css';
import NextApp, { AppContext, AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import { AppContextProvider } from '@/contexts';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ErrorFallback } from '@/components/ErrorFallback';
import { appWithTranslation } from 'next-i18next';
import { i18n } from '../../next-i18next.config';
import {
    DEFAULT_THEME,
    THEME_COOKIE_KEY,
    Theme,
} from '@/contexts/ThemeContext';
import { getPageResCookie } from '@/storage/cookies/server';
import { match } from 'ts-pattern';

type AppOwnProps = { initialTheme: Theme };

function App({ Component, pageProps, initialTheme }: AppProps & AppOwnProps) {
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
            <AppContextProvider initialTheme={initialTheme}>
                <Component {...pageProps} />
            </AppContextProvider>
        </ErrorBoundary>
    );
}

App.getInitialProps = async (
    context: AppContext,
): Promise<AppOwnProps & AppInitialProps> => {
    const ctx = await NextApp.getInitialProps(context);
    const reqCtx = context.ctx;
    const themeCookie = getPageResCookie(THEME_COOKIE_KEY, reqCtx);
    const theme = match(themeCookie)
        .with('dark', () => 'dark' as const)
        .with('light', () => 'light' as const)
        .otherwise(() => DEFAULT_THEME);

    return { ...ctx, initialTheme: theme };
};

export default appWithTranslation(App, { i18n });
