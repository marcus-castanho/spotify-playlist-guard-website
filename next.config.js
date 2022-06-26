/** @type {import('next').NextConfig} */
export default nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};
