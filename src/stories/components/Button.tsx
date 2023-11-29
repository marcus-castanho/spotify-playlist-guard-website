import React, { FC, ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button
            {...props}
            style={{
                borderRadius: '6px',
                border: '1px solid rgba(27, 31, 36, 0.15)',
                fontWeight: 600,
                lineHeight: '20px',
                verticalAlign: 'middle',
                appearance: 'none',
                textDecoration: 'none',
                textAlign: 'center',
                display: 'grid',
                gridTemplateAreas: 'leadingIcon text trailingIcon',
                padding: '5px 16px',
                fontSize: '14px',
                color: 'rgb(36, 41, 47)',
                backgroundColor: 'rgb(246, 248, 250)',
            }}
        >
            {children}
        </button>
    );
};
