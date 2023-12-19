import { match } from 'ts-pattern';
import React, { FC } from 'react';

type SpinnerProps = {
    size: 'small' | 'medium' | 'large';
};
export const Spinner: FC<SpinnerProps> = ({ size }) => {
    return (
        <span
            aria-label="spinner"
            className={match(size)
                .with(
                    'small',
                    () =>
                        'inline-block h-6 w-6 animate-spin rounded-[50%] border-4 border-primary-verdant border-b-transparent',
                )
                .with(
                    'medium',
                    () =>
                        'inline-block h-9 w-9 animate-spin rounded-[50%] border-4 border-primary-verdant border-b-transparent',
                )
                .with(
                    'large',
                    () =>
                        'inline-block h-12 w-12 animate-spin rounded-[50%] border-4 border-primary-verdant border-b-transparent',
                )
                .otherwise(() => '')}
        />
    );
};
