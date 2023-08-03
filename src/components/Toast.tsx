import React, { FC } from 'react';
import { ToastType } from '../contexts/ToastContext';

export type ToastProps = {
    display: boolean;
    message: string;
    type: ToastType;
};

export const Toast: FC<ToastProps> = ({ display, message, type }) => {
    if (!display) return <></>;
    return (
        <div
            style={{
                borderColor:
                    type === 'success'
                        ? 'green'
                        : type === 'warning'
                        ? 'yellow'
                        : type === 'info'
                        ? 'blue'
                        : 'red',
                border: 'solid',
            }}
        >
            {message !== '' ? message : 'TOAST MESSAGE'}
        </div>
    );
};
