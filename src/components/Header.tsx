import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import GuardBotLogo from './GuardBotLogo';
import Link from './Link';

const Header: FC = () => {
    const menuTabs = ['About', 'The app', 'Other projects'];
    return (
        <Box
            display="flex"
            alignItems="center"
            padding="1rem 1rem"
            sx={{ backgroundColor: '#000000' }}
        >
            <Box display="flex-columns">
                <Link href="/" sx={{ textDecoration: 'none' }} display="flex">
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
    );
};

export default Header;
