import React, { FC } from 'react';
import { ToastType } from '@/contexts/ToastContext';
import { match } from 'ts-pattern';

export type ToastProps = {
    display: boolean;
    message: string;
    type: ToastType;
};

export const Toast: FC<ToastProps> = ({ display, message, type }) => {
    const borderColor = match(type)
        .with('success', () => 'green')
        .with('warning', () => 'yellow')
        .with('info', () => 'blue')
        .with('error', () => 'red')
        .otherwise(() => 'blue');

    if (!display) return <></>;
    return (
        <div
            style={{
                border: `solid 1px ${borderColor}`,
            }}
        >
            {message !== '' ? message : 'TOAST MESSAGE'}
        </div>
    );
};
