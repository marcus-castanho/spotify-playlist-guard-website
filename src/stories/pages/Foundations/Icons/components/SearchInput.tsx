import React, { FC, useState } from 'react';

type SearchInputProps = {
    onChange: (searchValue: string) => void;
};

export const SearchInput: FC<SearchInputProps> = ({ onChange }) => {
    const [focus, setFocus] = useState(false);

    return (
        <div
            style={{
                lineHeight: '20px',
                color: 'rgb(36, 41, 47)',
                backgroundColor: 'rgb(255, 255, 255)',
                border: '1px solid rgb(208, 215, 222)',
                borderRadius: '6px',
                outline: focus ? 'black solid 1px' : '',
                display: 'flex',
                padding: '10px 12px 10px 12px',
                fontSize: '20px',
            }}
        >
            <input
                placeholder="Search icons..."
                type="text"
                style={{ width: '100%', outline: '0px' }}
                onChange={({ target }) => onChange(target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
        </div>
    );
};
