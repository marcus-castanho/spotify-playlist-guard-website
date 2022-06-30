import React, { FC } from 'react';
import GuardBotLogoIcon from '../assets/guard-bot_logo_black.svg';
import SvgIcon from '@mui/material/SvgIcon';

const GuardBotLogo: FC = () => {
    return (
        <SvgIcon component={GuardBotLogoIcon} viewBox={'0 0 70 70'}></SvgIcon>
    );
};

export default GuardBotLogo;
