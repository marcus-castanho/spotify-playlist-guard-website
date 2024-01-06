import React, { FC } from 'react';

type AvatarFilledIconProps = {
    size?: number;
    fillColor?: string;
};

export const AvatarFilledIcon: FC<AvatarFilledIconProps> = ({
    size = undefined,
    fillColor = 'black',
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width={size}
            height={size}
            viewBox="10 10 80 80"
        >
            <title>avatar-filled-icon</title>
            <g>
                <path
                    d="M50,49.7c9.9,0,18-8.1,18-18s-8.1-18-18-18s-18,8.1-18,18S40.1,49.7,50,49.7z"
                    fill={fillColor}
                />
                <path
                    d="M50,51.3c-15.4,0-27.9,12.3-29,28.7c-0.1,1.6,0.5,3.3,1.6,4.5c1.1,1.2,2.6,1.8,4.2,1.8h46.3c1.6,0,3.1-0.7,4.2-1.8   c1.1-1.2,1.7-2.8,1.6-4.5C77.9,63.7,65.4,51.3,50,51.3z"
                    fill={fillColor}
                />
            </g>
        </svg>
    );
};
