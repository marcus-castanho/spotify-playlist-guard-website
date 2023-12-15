import React, { FC, ReactNode } from 'react';

type PageContainerProps = {
    children: ReactNode;
};
export const PageContainer: FC<PageContainerProps> = ({ children }) => {
    return (
        <div aria-label="page-container" className="flex min-h-screen flex-col">
            {children}
        </div>
    );
};
