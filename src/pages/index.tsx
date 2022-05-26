import Head from 'next/head';
import React from 'react';
import { Container } from '../styles/pages/Home';

const Home: React.FC = () => {
    return (
        <Container>
            <Head>
                <title>Spotify Playlist Guard</title>
            </Head>

            <h1>Hello world!</h1>
            <p>A website for the Spotify Playlist Guard application.</p>
        </Container>
    );
};

export default Home;
