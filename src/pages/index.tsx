import Head from 'next/head';
import React from 'react';
import Link from '../components/Link';

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Spotify Playlist Guard</title>
            </Head>
            <h1>Hello world!</h1>
            <p>A website for the Spotify Playlist Guard application.</p>
            <p>
                Click <Link href="/login">here </Link>
                to login
            </p>
        </>
    );
};

export default Home;
