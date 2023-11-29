import React, { FC, ReactNode } from 'react';

type Props = {
    title: string;
    children: ReactNode;
};

export const Story: FC<Props> = ({ children, title }) => {
    return (
        <div style={{}}>
            <h1>{title}</h1>
            <div style={{}}>{children}</div>
        </div>
    );
};
