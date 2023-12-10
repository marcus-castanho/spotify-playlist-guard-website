import React, { FC, useState } from 'react';
import { SearchInput } from './SearchInput';
import { IconsList } from './IconsList';
import { icons } from '../icons';

export const IconsListVisualizer: FC = () => {
    const [filterValue, setFilterValue] = useState('');
    const filteredIcons = icons
        .filter(({ title }) => title.includes(filterValue))
        .sort((a, b) => {
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;
            return 0;
        });

    return (
        <>
            <SearchInput onChange={(value) => setFilterValue(value)} />
            <IconsList icons={filteredIcons} />
        </>
    );
};
