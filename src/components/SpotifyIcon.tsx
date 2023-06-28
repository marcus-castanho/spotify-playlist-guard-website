import React, { FC } from 'react';
import SpotifyLogo from '../../public/assets/spotify_icon_RGB_black.svg';
import SvgIcon from '@mui/material/SvgIcon';

const SpotifyIcon: FC = () => {
    return <SvgIcon component={SpotifyLogo} inheritViewBox />;
};

export default SpotifyIcon;
