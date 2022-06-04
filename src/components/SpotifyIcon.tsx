import React, { FC } from 'react';
import SpotifyLogo from '../assets/Spotify_Icon_RGB_Black.svg';
import SvgIcon from '@mui/material/SvgIcon';

const SpotifyIcon: FC = () => {
    return <SvgIcon component={SpotifyLogo} inheritViewBox></SvgIcon>;
};

export default SpotifyIcon;
