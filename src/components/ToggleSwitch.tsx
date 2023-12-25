import React, { FC } from 'react';
import { match } from 'ts-pattern';

type ToggleSwitchProps = {
    onChange: (checked: boolean) => void;
    defaultChecked: boolean;
    disabled?: boolean;
    onClick?: () => void;
    size?: 'small' | 'medium' | 'large';
};

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
    onChange,
    onClick = () => {},
    defaultChecked,
    disabled = false,
    size = 'medium',
}) => {
    return (
        <label
            className={match(size)
                .with('small', () => 'scale-50')
                .with('medium', () => 'scale-75')
                .with('large', () => 'scale-100')
                .otherwise(() => 'scale-75')}
        >
            <div
                className="relative inline-block h-[34px] w-[60px] min-w-[60px]"
                onClick={onClick}
            >
                <input
                    type="checkbox"
                    onChange={({ target: { checked } }) => onChange(checked)}
                    defaultChecked={defaultChecked}
                    disabled={disabled}
                    className="peer h-0 w-0 opacity-0"
                    aria-label="toggle-checkbox-input"
                />
                <span className="group absolute bottom-0 left-0 right-0 top-0 ">
                    <div className="absolute bottom-[4px] left-[4px] h-[26px] w-[26px] rounded-[50%] bg-white duration-300 peer-checked:group-[]:translate-x-[26px]" />
                    <div className="h-full w-full cursor-pointer rounded-[34px] bg-gray-100 duration-300 peer-checked:group-[]:bg-primary-verdant" />
                </span>
            </div>
        </label>
    );
};
