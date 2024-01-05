import React, { FC, useState } from 'react';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';

type SearchBoxInputProps = {
    inputId?: string;
    placeHolder?: string;
    onChange?: (text: string) => void;
    disabled?: boolean;
    onSubmit: (text: string) => void;
    defaultValue?: string;
};

export const SearchBoxInput: FC<SearchBoxInputProps> = ({
    inputId = undefined,
    placeHolder = '',
    onChange = () => {},
    disabled = false,
    onSubmit,
    defaultValue = '',
}) => {
    const [value, setValue] = useState('');

    return (
        <div className="flex items-center">
            <input
                type="text"
                id={inputId}
                onChange={({ target }) => {
                    setValue(target.value);
                    onChange(target.value);
                }}
                className="w-full rounded-l-2xl border-[1px] border-r-0 bg-white py-0.5 pl-3.5 pr-11 text-black dark:border-gray-50"
                placeholder={placeHolder}
                disabled={disabled}
                aria-label="password-input"
                defaultValue={defaultValue}
            />
            <div className="hidden w-[1px] dark:block dark:bg-black" />
            <button
                type="button"
                onClick={() => onSubmit(value)}
                className="dark:border-whit flex w-12 items-center justify-center rounded-r-2xl border-[1px] p-1 dark:border-white dark:bg-white"
            >
                <MagnifyingGlassIcon size={20} fillColor="black" />
            </button>
        </div>
    );
};
