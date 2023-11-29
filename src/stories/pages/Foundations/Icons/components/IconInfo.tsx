import React, { FC, ReactNode } from 'react';

export type IconInfoProps = {
    children?: ReactNode;
};
export const IconInfo: FC<IconInfoProps> = ({ children }) => {
    return (
        <>
            <h2>Usage</h2>
            <p>
                This icon can be used as HTML code, downloadable asset or as a
                React component:
            </p>
            {children}
            Props:
            <ul>
                <li>size - The size of the icon in pixels</li>
                <li>
                    {`fillColor (optional) - The color to fill the icon - "black" or "white". Default value is "black"`}
                </li>
            </ul>
        </>
    );
};
