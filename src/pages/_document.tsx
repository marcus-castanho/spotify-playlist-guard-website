import { THEME_COOKIE_KEY } from '@/contexts/ThemeContext';
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
    static initialTheme = 'light';

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
        const initialTheme =
            MyDocument.getCookie(ctx, THEME_COOKIE_KEY) || 'light';
        MyDocument.initialTheme = initialTheme;

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
                    .otherwise(() => MyDocument.initialTheme)}
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
