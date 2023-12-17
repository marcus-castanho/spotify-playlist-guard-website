import React, { FC, ReactNode } from 'react';
import { match } from 'ts-pattern';

type FormRowProps = {
    columns: number;
    children?: ReactNode;
};

export const FormRow: FC<FormRowProps> = ({ columns, children }) => {
    return (
        <div
            aria-label="form-row"
            className={match(columns)
                .with(1, () => 'grid grid-cols-1 gap-3.5 pb-3.5')
                .with(2, () => 'grid grid-cols-2 gap-3.5 pb-3.5')
                .with(3, () => 'grid grid-cols-3 gap-3.5 pb-3.5')
                .with(4, () => 'grid grid-cols-4 gap-3.5 pb-3.5')
                .otherwise(() => 'grid grid-cols-1 gap-3.5 pb-3.5')}
        >
            {children}
        </div>
    );
};
