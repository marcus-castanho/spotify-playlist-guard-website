import React, { FC } from 'react';
import { DefaultAvatarIcon } from './icons/DefaultAvatarIcon';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

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
                <Image
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
