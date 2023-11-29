import { THEME_COOKIE_KEY } from '@/contexts/ThemeContext';
import { getCookie } from '@/storage/cookies/client';
import { Html, Head, Main, NextScript } from 'next/document';
import { match } from 'ts-pattern';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className={`dark:bg-black dark:text-white`}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
