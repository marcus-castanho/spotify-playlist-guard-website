import React, { FC, ReactNode } from 'react';

type RootProps = {
    children: ReactNode;
    inputId: string;
    label: string;
    required?: boolean;
};

export const Root: FC<RootProps> = ({
    children,
    inputId,
    label,
    required = false,
}) => {
    return (
        <div className="flex flex-col justify-end rounded-lg bg-gray-50 p-4 dark:bg-black">
            <label htmlFor={inputId} className="block pb-2 font-bold">
                {label}
                {required && <span className="pl-1 text-secondary-red">*</span>}
            </label>
            {children}
        </div>
    );
};
