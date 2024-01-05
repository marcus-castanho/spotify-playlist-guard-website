import React, { FC, useState } from 'react';
import { EyeIcon } from '../icons/EyeIcon';
import { EyeSlashIcon } from '../icons/EyeSlashIcon';
import { useTheme } from '@/contexts/ThemeContext';

type PasswordInputProps = {
    inputId: string;
    placeHolder?: string;
    required?: boolean;
    onChange?: (text: string) => void;
    disabled?: boolean;
    error?: boolean;
};

export const PasswordInput: FC<PasswordInputProps> = ({
    inputId,
    placeHolder = '',
    required = false,
    onChange = () => {},
    disabled = false,
    error = false,
}) => {
    const [visible, setVisible] = useState(false);
    const { theme } = useTheme();

    return (
        <div className="relative">
            <input
                type={visible ? 'text' : 'password'}
                id={inputId}
                onChange={({ target }) => onChange(target.value)}
                className={
                    error
                        ? 'w-full rounded border-[1px] border-secondary-red py-0.5  pl-3.5 pr-11 placeholder-gray-100 dark:border-secondary-red dark:bg-black'
                        : 'w-full rounded border-[1px] py-0.5 pl-3.5 pr-11 placeholder-gray-100 dark:border-gray-50 dark:bg-black'
                }
                required={required}
                placeholder={placeHolder}
                disabled={disabled}
                aria-label="password-input"
            />
            <button
                type="button"
                onClick={() => setVisible((state) => !state)}
                className="absolute right-4 top-1/2 translate-y-[-50%]"
            >
                {!visible ? (
                    <EyeSlashIcon
                        size={24}
                        fillColor={theme === 'dark' ? 'white' : 'black'}
                    />
                ) : (
                    <EyeIcon
                        size={24}
                        fillColor={theme === 'dark' ? 'white' : 'black'}
                    />
                )}
            </button>
        </div>
    );
};
