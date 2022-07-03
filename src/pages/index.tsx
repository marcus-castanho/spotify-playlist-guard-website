import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from '../components/Link';
import SpotifyIcon from '../components/SpotifyIcon';
import GuardBotLogo from '../components/GuardBotLogo';
import Footer from '../components/Footer';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const Home: NextPage = () => {
    const menuTabs = ['About', 'The app', 'Other projects'];

    return (
        <Box sx={{ backgroundColor: 'background.paper' }}>
            <Head>
                <title>Spotify Playlist Guard</title>
            </Head>
            <Box
                display="flex"
                alignItems="center"
                padding="1rem 1rem"
                sx={{ backgroundColor: '#000000' }}
            >
                <Box display="flex-columns">
                    <Link
                        href="/"
                        sx={{ textDecoration: 'none' }}
                        display="flex"
                    >
                        <GuardBotLogo height="30px" width="30px" />
                    </Link>
                </Box>
                <Box
                    display="flex"
                    position="relative"
                    left="50%"
                    sx={{ transform: 'translateX(-50%)' }}
                >
                    {menuTabs.map((menuTab) => {
                        return (
                            <Link
                                key={menuTab}
                                href="/"
                                sx={{ textDecoration: 'none' }}
                                margin="0 2rem"
                                underline="hover"
                                color="text.primary"
                            >
                                <Typography
                                    variant="body2"
                                    align="center"
                                    color={'text.primary'}
                                >
                                    {menuTab}
                                </Typography>
                            </Link>
                        );
                    })}
                </Box>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding="3rem 0"
                minHeight="95vh"
            >
                <Image
                    src="/guardBot-1db954-circle.png"
                    alt="logo"
                    width="250"
                    height="250"
                />
                <Typography
                    variant="body1"
                    align="center"
                    color="text.primary"
                    margin="3rem 0 1rem"
                    justifyContent="space-between"
                >
                    A guard bot for your collaborative playlists on Spotify.
                    <br />
                    Start guarding your playlists now:
                </Typography>
                <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<SpotifyIcon />}
                >
                    <Link href="/login" sx={{ textDecoration: 'none' }}>
                        <Typography align="center">
                            Sign in with spotify
                        </Typography>
                    </Link>
                </Button>
                <Box display="flex" justifyContent="center" margin=" 5rem 0 0">
                    <Button color="inherit" variant="text">
                        <KeyboardArrowDownOutlinedIcon />
                    </Button>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default Home;
