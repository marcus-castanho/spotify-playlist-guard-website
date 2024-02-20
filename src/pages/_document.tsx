import React from 'react';
import {
    DEFAULT_THEME,
    THEME_COOKIE_KEY,
    Theme,
} from '@/contexts/ThemeContext';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from 'next/document';
import { match } from 'ts-pattern';

class MyDocument extends Document {
    static initialTheme: Theme;

    static getCookie(ctx: DocumentContext, key: string) {
        const cookiesStr = ctx.req?.headers.cookie || '';
        const cookiesArr = cookiesStr.split(';');
        const cookieStr =
            cookiesArr.find((cookie) => {
                const cookieKey = cookie.split('=')[0];
                return cookieKey === key;
            }) || '';
        const value = cookieStr.split('=')[1];

        return value;
    }

    static async getInitialProps(
        ctx: DocumentContext,
    ): Promise<DocumentInitialProps> {
        const originalRenderPage = ctx.renderPage;
        const initialTheme = MyDocument.getCookie(ctx, THEME_COOKIE_KEY);

        MyDocument.initialTheme = match(initialTheme)
            .with('light', () => 'light' as const)
            .with('dark', () => 'dark' as const)
            .otherwise(() => DEFAULT_THEME);

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => App,
                enhanceComponent: (Component) => Component,
            });

        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html
                lang="en"
                className={match(MyDocument.initialTheme)
                    .with('light', () => '')
                    .with('dark', () => 'dark')
                    .otherwise(() => DEFAULT_THEME)}
            >
                <Head />
                <body className={`dark:bg-black dark:text-white`}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
