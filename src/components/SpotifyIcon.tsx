import React, { FC } from 'react';
import SpotifyLogo from '../assets/spotify_icon_RGB_black.svg';
import SvgIcon from '@mui/material/SvgIcon';

const SpotifyIcon: FC = () => {
    return <SvgIcon component={SpotifyLogo} inheritViewBox></SvgIcon>;
};

export default SpotifyIcon;
