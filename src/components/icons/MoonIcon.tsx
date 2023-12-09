import React, { FC } from 'react';

type MoonIconProps = {
    size: number;
    fillColor?: 'black' | 'white';
};

export const MoonIcon: FC<MoonIconProps> = ({ size, fillColor = 'black' }) => {
    return (
        <svg
            fill={fillColor}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            data-name="Flat Color"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>moon-icon</title>
            <path
                id="primary"
                d="M18.4,19.37A8,8,0,0,1,13.72,12,8,8,0,0,1,18.4,4.63a1,1,0,0,0,.6-.92,1,1,0,0,0-.59-.91A9.21,9.21,0,0,0,14.64,2,9.84,9.84,0,0,0,5,12a9.84,9.84,0,0,0,9.64,10,9.21,9.21,0,0,0,3.77-.8,1,1,0,0,0,.59-.91A1,1,0,0,0,18.4,19.37Z"
            ></path>
        </svg>
    );
};
