import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Sign In</title>
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
                            Page unavailable
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            The Sign In page to connect the guard bot to your
                            spotify account is in development.
                        </Typography>
                    </Container>
                </Box>
            </main>
        </>
    );
};

export default Login;
