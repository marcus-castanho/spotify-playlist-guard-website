import React, { FC } from 'react';

type SunIconProps = {
    size?: number;
    fillColor?: 'black' | 'white';
};

export const SunIcon: FC<SunIconProps> = ({ size, fillColor = 'black' }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>sun-icon</title>
            <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                    <rect width="48" height="48" fill="none" />
                </g>
                <g id="Q3_icons" data-name="Q3 icons">
                    <g>
                        <path
                            d="M24,10a2,2,0,0,0,2-2V4a2,2,0,0,0-4,0V8A2,2,0,0,0,24,10Z"
                            fill={fillColor}
                        />
                        <path
                            d="M24,38a2,2,0,0,0-2,2v4a2,2,0,0,0,4,0V40A2,2,0,0,0,24,38Z"
                            fill={fillColor}
                        />
                        <path
                            d="M36.7,14.1l2.9-2.8a2.3,2.3,0,0,0,0-2.9,2.3,2.3,0,0,0-2.9,0l-2.8,2.9a2,2,0,1,0,2.8,2.8Z"
                            fill={fillColor}
                        />
                        <path
                            d="M11.3,33.9,8.4,36.7a2.3,2.3,0,0,0,0,2.9,2.3,2.3,0,0,0,2.9,0l2.8-2.9a2,2,0,1,0-2.8-2.8Z"
                            fill={fillColor}
                        />
                        <path
                            d="M44,22H40a2,2,0,0,0,0,4h4a2,2,0,0,0,0-4Z"
                            fill={fillColor}
                        />
                        <path
                            d="M10,24a2,2,0,0,0-2-2H4a2,2,0,0,0,0,4H8A2,2,0,0,0,10,24Z"
                            fill={fillColor}
                        />
                        <path
                            d="M36.7,33.9a2,2,0,1,0-2.8,2.8l2.8,2.9a2.1,2.1,0,1,0,2.9-2.9Z"
                            fill={fillColor}
                        />
                        <path
                            d="M11.3,14.1a2,2,0,0,0,2.8-2.8L11.3,8.4a2.3,2.3,0,0,0-2.9,0,2.3,2.3,0,0,0,0,2.9Z"
                            fill={fillColor}
                        />
                        <path
                            d="M24,14A10,10,0,1,0,34,24,10,10,0,0,0,24,14Z"
                            fill={fillColor}
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};
