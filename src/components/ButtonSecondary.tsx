import React, { FC, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonSecondaryProps = {
    children: ReactNode;
    onClick?: () => void;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    scale?: boolean;
    round?: boolean;
};

export const ButtonSecondary: FC<ButtonSecondaryProps> = ({
    children,
    onClick = () => {},
    type = 'button',
    scale = true,
    round = false,
}) => {
    return (
        <button
            aria-label="button-secondary"
            type={type}
            onClick={onClick}
            className={scale ? 'hover:scale-105' : ''}
        >
            <div
                className={
                    round
                        ? 'rounded-[500px] border-[1px] border-gray-100 bg-white p-3 font-bold text-gray-100  hover:text-black dark:bg-black dark:hover:text-white'
                        : 'rounded-[500px] border-[1px] border-gray-100 bg-white px-8 py-3 font-bold text-gray-100 hover:text-black dark:bg-black dark:hover:text-white'
                }
            >
                {children}
            </div>
        </button>
    );
};
