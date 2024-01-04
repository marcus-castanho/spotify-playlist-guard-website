import React, { FC, InputHTMLAttributes } from 'react';

type TextInputProps = {
    inputId: string;
    defaultValue?: string;
    placeHolder?: string;
    required?: boolean;
    onChange?: (text: string) => void;
    type?: Extract<
        InputHTMLAttributes<HTMLButtonElement>['type'],
        'email' | 'tel' | 'text' | 'url'
    >;
    disabled?: boolean;
    error?: boolean;
};

export const TextInput: FC<TextInputProps> = ({
    inputId,
    defaultValue = '',
    placeHolder = '',
    required = false,
    onChange = () => {},
    type = 'text',
    disabled = false,
    error = false,
}) => {
    return (
        <input
            type={type}
            id={inputId}
            onChange={({ target }) => onChange(target.value)}
            className={
                error
                    ? 'w-full rounded border-[1px] border-secondary-red px-3.5 py-0.5 dark:border-secondary-red dark:bg-black'
                    : 'w-full rounded border-[1px] px-3.5 py-0.5 dark:border-gray-50 dark:bg-black'
            }
            required={required}
            defaultValue={defaultValue}
            placeholder={placeHolder}
            disabled={disabled}
            aria-label="text-input"
        />
    );
};
