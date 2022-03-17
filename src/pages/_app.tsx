import { AppProps } from 'next/app';
import '../styles/globals.css';
import React from 'react';

import GlobalStyle from '../styles/global';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <Component {...pageProps} />
            <GlobalStyle />
        </>
    );
};

export default MyApp;
