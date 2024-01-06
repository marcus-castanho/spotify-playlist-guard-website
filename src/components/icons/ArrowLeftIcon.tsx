import React, { FC } from 'react';

type ArrowLeftIconProps = {
    size?: number;
    fillColor?: string;
};

export const ArrowLeftIcon: FC<ArrowLeftIconProps> = ({
    size,
    fillColor = 'black',
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 32 32"
        >
            <title>arrow-left-icon</title>
            <path
                d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
                data-name="4-Arrow Left"
                fill={fillColor}
            />
        </svg>
    );
};
