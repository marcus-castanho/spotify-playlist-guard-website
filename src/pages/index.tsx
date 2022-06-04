import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from '../components/Link';
import SpotifyIcon from '../components/SpotifyIcon';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Spotify Playlist Guard</title>
            </Head>
            <main>
                <Box
                    sx={{
                        pt: '4rem',
                        pb: '4rem',
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        minHeight: '100vh',
                        justifyContent: 'center',
                    }}
                >
                    <Container>
                        <Typography variant="h2" align="center">
                            Spotify Playlist Guard
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            A guard bot for your collaborative playlist on
                            Spotify.
                            <br />
                            Start guarding your playlists now:
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button
                                color="secondary"
                                variant="contained"
                                startIcon={<SpotifyIcon />}
                            >
                                <Link
                                    href="/login"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    Sign in with spotify
                                </Link>
                            </Button>
                        </Stack>
                    </Container>
                </Box>
            </main>
        </>
    );
};

export default Home;
