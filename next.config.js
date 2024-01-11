const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
module.exports = {
    env: {
        customKey: 'my-value',
    },
    reactStrictMode: true,
    i18n,
    async redirects() {
        return [
            /**
             * Use redirection to access storybook documentation via /docs route
             */
            {
                source: '/docs',
                destination: '/docs/index.html',
                permanent: true,
            },
        ];
    },
    async rewrites() {
        return [
            /**
             * Spotify Playlist Guard API is hosted on another domain so it can't set cookies for browser app via Set-Cookie header. For now, proxy all of the Spotify Playlist Guard API routes to this app's BFF /api/exteral routes
             */
            {
                source: '/api/external/:path*',
                destination: `${process.env.customKey}/:path*`,
            },
        ];
    },
    images: {
        remotePatterns: [
            /**Spotify's CDN host */
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                port: '',
                pathname: '/**',
            },
        ],
    },
};
