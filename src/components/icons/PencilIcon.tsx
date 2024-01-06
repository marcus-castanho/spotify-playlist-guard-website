import React, { FC } from 'react';

type PencilIconProps = {
    size?: number;
    fillColor?: 'black' | 'white';
};

export const PencilIcon: FC<PencilIconProps> = ({
    size,
    fillColor = 'black',
}) => {
    return (
        <svg
            fill={fillColor}
            width={size}
            height={size}
            version="1.1"
            id="Icons"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
        >
            <title>pencil-icon</title>
            <g>
                <path d="M31,7.8c-0.7-3.4-3.3-6.1-6.8-6.8c-0.3-0.1-0.7,0-0.9,0.3l-2.5,2.5c3.4,1.4,6,4.1,7.4,7.4l2.5-2.5C30.9,8.5,31,8.1,31,7.8z" />
                <path
                    d="M19.2,5.4L4.3,20.3c-0.1,0.1-0.2,0.3-0.3,0.5l-2,8c-0.1,0.3,0,0.7,0.3,0.9C2.5,29.9,2.7,30,3,30c0.1,0,0.2,0,0.2,0l8-2
		c0.2,0,0.3-0.1,0.5-0.3l14.9-14.9C25.5,9.3,22.7,6.5,19.2,5.4z M21.7,11.7l-12,12C9.5,23.9,9.3,24,9,24s-0.5-0.1-0.7-0.3
		c-0.4-0.4-0.4-1,0-1.4l12-12c0.4-0.4,1-0.4,1.4,0S22.1,11.3,21.7,11.7z"
                />
            </g>
        </svg>
    );
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={size}
            height={size}
            viewBox="0 0 50 50"
            fill={fillColor}
        >
            <path d="M25,2C12.318,2,2,12.318,2,25c0,12.683,10.318,23,23,23c12.683,0,23-10.317,23-23C48,12.318,37.683,2,25,2z M35.827,16.562	L24.316,33.525l-8.997-8.349c-0.405-0.375-0.429-1.008-0.053-1.413c0.375-0.406,1.009-0.428,1.413-0.053l7.29,6.764l10.203-15.036	c0.311-0.457,0.933-0.575,1.389-0.266C36.019,15.482,36.138,16.104,35.827,16.562z"></path>
        </svg>
    );
};
