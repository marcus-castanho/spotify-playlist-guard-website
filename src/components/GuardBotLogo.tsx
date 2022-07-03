import React, { FC } from 'react';
import GuardBotLogoIcon from '../assets/guard-bot_logo_white.svg';
import SvgIcon from '@mui/material/SvgIcon';

type Props = {
    height?: string;
    width?: string;
};

const GuardBotLogo: FC<Props> = ({ height, width }) => {
    return (
        <SvgIcon
            component={GuardBotLogoIcon}
            sx={{ height, width }}
            inheritViewBox
        ></SvgIcon>
    );
};

export default GuardBotLogo;
