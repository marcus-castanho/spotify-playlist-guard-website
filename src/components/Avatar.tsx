import React, { FC } from 'react';
import { DefaultAvatarIcon } from './icons/DefaultAvatarIcon';
import { useTheme } from '@/contexts/ThemeContext';
import { CustomImage } from './CustomImage';

type AvatarProps = {
    src?: string;
    size?: number;
    fillColor?: 'black' | 'white';
};
export const Avatar: FC<AvatarProps> = ({ src, size = 24, fillColor }) => {
    const { theme } = useTheme();
    const avatarIconColor = fillColor || theme === 'dark' ? 'white' : 'black';

    return (
        <>
            {src ? (
                <CustomImage
                    alt="Avatar image"
                    src={src}
                    width={size}
                    height={size}
                />
            ) : (
                <DefaultAvatarIcon size={size} fillColor={avatarIconColor} />
            )}
        </>
    );
};
