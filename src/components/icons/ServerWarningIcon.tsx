import React, { FC } from 'react';

type ServerWarningProps = {
    size: number;
    fillColor?: string;
};

export const ServerWarningIcon: FC<ServerWarningProps> = ({
    size,
    fillColor = 'black',
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            width={size}
            height={size}
            fill={fillColor}
        >
            <g>
                <path d="M333.9,408.3c-7.8,0-14.1,6.3-14.1,14.1v6.7c0,7.8,6.3,14.1,14.1,14.1c7.8,0,14.1-6.3,14.1-14.1v-6.7   C348,414.7,341.7,408.3,333.9,408.3z" />
                <path d="M333.9,295.5c-7.8,0-14.1,6.3-14.1,14.1v64.6c0,7.8,6.3,14.1,14.1,14.1c7.8,0,14.1-6.3,14.1-14.1v-64.6   C348,301.8,341.7,295.5,333.9,295.5z" />
                <path d="M502.2,429.9l-94.3-153.8c9.4-9.9,14.8-23,14.8-37.2v-51.4c0-16.2-7.2-30.8-18.6-40.7c11.4-10.3,18.6-25.1,18.6-41.6V58.4   c0-31.1-25.3-56.4-56.4-56.4H58.4C27.3,2,2,27.3,2,58.4v46.7c0,16.5,7.2,31.3,18.5,41.7C9.2,156.7,2,171.3,2,187.4v51.4   c0,15.9,6.9,30,17.8,39.9C8.9,288.7,2,303,2,318.8v51.4c0,29.8,24.3,54.1,54.1,54.1H169l-3.4,5.5c-21.5,35.1,3.7,80.1,44.9,80.1   h246.8C498.4,510,523.7,464.9,502.2,429.9z M30.2,58.4c0-15.6,12.7-28.2,28.2-28.2h307.8c15.6,0,28.2,12.7,28.2,28.2v46.7   c0,15.4-12.5,28-27.9,28.2H58.1c-15.4-0.2-27.9-12.7-27.9-28.2V58.4z M394.4,187.4v51.4c0,4-0.9,7.8-2.6,11.2l-13.1-21.4   c-20.5-33.5-69.2-33.5-89.7,0l-22.1,36H56.1c-14.3,0-25.9-11.6-25.9-25.9v-51.4c0-14.3,11.6-25.9,25.9-25.9h312.5   C382.8,161.6,394.4,173.2,394.4,187.4z M56.1,396.2c-14.3,0-25.9-11.6-25.9-25.9v-51.4c0-14.3,11.6-25.9,25.9-25.9h193.5   l-63.3,103.2H56.1z M457.3,481.8H210.5c-19.1,0-30.7-20.9-20.8-37.1l123.4-201.2c9.5-15.5,32.1-15.5,41.6,0l123.4,201.2   C488.1,460.9,476.4,481.8,457.3,481.8z" />
                <path d="M142,95.9h6.6c7.8,0,14.1-6.3,14.1-14.1s-6.3-14.1-14.1-14.1H142c-7.8,0-14.1,6.3-14.1,14.1S134.2,95.9,142,95.9z" />
                <path d="M69.4,95.9H76c7.8,0,14.1-6.3,14.1-14.1S83.8,67.7,76,67.7h-6.6c-7.8,0-14.1,6.3-14.1,14.1S61.6,95.9,69.4,95.9z" />
                <path d="M214.7,95.9h6.6c7.8,0,14.1-6.3,14.1-14.1s-6.3-14.1-14.1-14.1h-6.6c-7.8,0-14.1,6.3-14.1,14.1S206.9,95.9,214.7,95.9z" />
                <path d="M148.6,199.1H142c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1h6.6c7.8,0,14.1-6.3,14.1-14.1S156.4,199.1,148.6,199.1z" />
                <path d="M76,199.1h-6.6c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1H76c7.8,0,14.1-6.3,14.1-14.1S83.8,199.1,76,199.1z" />
                <path d="M221.3,199.1h-6.6c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1h6.6c7.8,0,14.1-6.3,14.1-14.1S229.1,199.1,221.3,199.1z" />
                <path d="M148.6,330.4H142c-7.8,0-14.1,6.3-14.1,14.1c0,7.8,6.3,14.1,14.1,14.1h6.6c7.8,0,14.1-6.3,14.1-14.1   C162.8,336.8,156.4,330.4,148.6,330.4z" />
                <path d="M76,330.4h-6.6c-7.8,0-14.1,6.3-14.1,14.1c0,7.8,6.3,14.1,14.1,14.1H76c7.8,0,14.1-6.3,14.1-14.1   C90.1,336.8,83.8,330.4,76,330.4z" />
            </g>
        </svg>
    );
};