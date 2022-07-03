import React, { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from './Link';

const Footer: FC = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding="1rem 1rem"
            sx={{ backgroundColor: '#000000' }}
        >
            <IconButton
                component="a"
                href="https://github.com/marcus-castanho/spotify-playlist-guard-website"
            >
                <GitHubIcon />
            </IconButton>
            <Typography align="center">
                MIT Licensed | Copyright © 2022{' '}
                <Link color="inherit" href="https://github.com/marcus-castanho">
                    Marcus
                </Link>
            </Typography>
        </Box>
    );
};

export default Footer;
