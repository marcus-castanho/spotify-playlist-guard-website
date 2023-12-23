import React, { FC } from 'react';

type CrossMarkIconProps = {
    size: number;
    fillColor?: string;
};

export const CrossMarkIcon: FC<CrossMarkIconProps> = ({
    size,
    fillColor = 'black',
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>cross-mark-icon</title>
            <path
                d="M62 10.571L53.429 2L32 23.429L10.571 2L2 10.571L23.429 32L2 53.429L10.571 62L32 40.571L53.429 62L62 53.429L40.571 32z"
                fill={fillColor}
            ></path>
        </svg>
    );
};
