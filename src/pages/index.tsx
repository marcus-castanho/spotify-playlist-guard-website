import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from '../components/Link';
import SpotifyIcon from '../components/SpotifyIcon';
import GuardBotLogo from '../components/GuardBotLogo';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const Home: NextPage = () => {
    const menuTabs = ['About', 'The app', 'Other projects'];

    return (
        <Box sx={{ backgroundColor: 'background.paper' }}>
            <Head>
                <title>Spotify Playlist Guard</title>
            </Head>
            <Box
                display={'flex'}
                alignItems="center"
                padding="1rem 1rem"
                sx={{ backgroundColor: '#000000' }}
            >
                <Box>
                    <Link href="/" sx={{ textDecoration: 'none' }}>
                        <GuardBotLogo />
                    </Link>
                </Box>
                <Box
                    display={'flex'}
                    position="relative"
                    left="50%"
                    sx={{ transform: 'translateX(-50%)' }}
                >
                    {menuTabs.map((menuTab, index) => {
                        return (
                            <Link
                                key={index}
                                href="/"
                                sx={{ textDecoration: 'none' }}
                                margin="0 2rem"
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
            <Box padding="6vh 0">
                <Box display="flex" justifyContent="center" margin={'3rem 0'}>
                    <Image
                        src="/guardBot-1db954-circle.png"
                        alt="logo"
                        width="250"
                        height="250"
                    />
                </Box>
                <Typography
                    variant="body2"
                    align="center"
                    color={'text.primary'}
                    margin={'3rem 0'}
                >
                    A guard bot for your collaborative playlist on Spotify.
                    <br />
                    Start guarding your playlists now:
                </Typography>
                <Box display="flex" justifyContent="center">
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
                </Box>
                <Box display="flex" justifyContent="center" margin={' 3rem 0 '}>
                    <Button color="inherit" variant="text">
                        <KeyboardArrowDownOutlinedIcon />
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
