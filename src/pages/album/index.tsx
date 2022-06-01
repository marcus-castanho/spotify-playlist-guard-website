import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Album() {
    return (
        <>
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
                    <Container maxWidth="sm">
                        <Typography variant="h2" align="center">
                            Album layout
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            Something short and leading about the collection
                            below—its contents, the creator, etc. Make it short
                            and sweet, but not too short so folks don&apos;t
                            simply skip over it entirely.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button color="secondary" variant="contained">
                                Main call to action
                            </Button>
                            <Button color="secondary" variant="outlined">
                                Secondary action
                            </Button>
                        </Stack>
                    </Container>
                </Box>
            </main>
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center">
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box>
        </>
    );
}
