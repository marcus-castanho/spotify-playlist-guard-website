import React, { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { match } from 'ts-pattern';

type ButtonPrimaryProps = {
    children: ReactNode;
    onClick?: () => void;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    disabled?: boolean;
    scale?: boolean;
    round?: boolean;
};

export const ButtonPrimary: FC<ButtonPrimaryProps> = ({
    children,
    onClick = () => {},
    type = 'button',
    disabled = false,
    scale = true,
    round = false,
}) => {
    return (
        <button
            aria-label="button-primary"
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={match({ disabled, scale })
                .with({ disabled: true }, () => 'opacity-50')
                .with({ scale: false }, () => '')
                .otherwise(() => 'hover:scale-105')}
        >
            <div
                className={
                    round
                        ? 'rounded-[500px] bg-primary-verdant p-3 font-bold text-white dark:text-black'
                        : 'rounded-[500px] bg-primary-verdant px-8 py-3 font-bold text-white dark:text-black'
                }
            >
                {children}
            </div>
        </button>
    );
};
