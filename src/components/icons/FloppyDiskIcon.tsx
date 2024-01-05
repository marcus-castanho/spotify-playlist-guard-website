import React, { FC } from 'react';

type FloppyDiskIconProps = {
    size: number;
    fillColor?: string;
};

export const FloppyDiskIcon: FC<FloppyDiskIconProps> = ({
    size,
    fillColor = 'black',
}) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <title>floppy-disk-icon</title>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C4 4.44772 4.44772 4 5 4H7V7C7 7.55228 7.44772 8 8 8H15C15.5523 8 16 7.55228 16 7V4H16.1716C16.4368 4 16.6911 4.10536 16.8787 4.29289L19.7071 7.12132C19.8946 7.30886 20 7.56321 20 7.82843V19C20 19.5523 19.5523 20 19 20H18V13C18 12.4477 17.5523 12 17 12H7C6.44772 12 6 12.4477 6 13V20H5C4.44772 20 4 19.5523 4 19V5ZM8 20H16V14H8V20ZM14 4H9V6H14V4ZM5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V7.82843C22 7.03278 21.6839 6.26972 21.1213 5.70711L18.2929 2.87868C17.7303 2.31607 16.9672 2 16.1716 2H5Z"
                fill={fillColor}
            />
        </svg>
    );
};
