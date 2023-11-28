import React, { FC } from 'react';
import { linkTo } from '@storybook/addon-links';

export const FoundationsIndex = () => {
    return (
        <>
            <h2>Foundations</h2>
            <ul>
                <ListItem value="Colors" />
                <ListItem value="Icons" />
                <ListItem value="Screens" />
                <ListItem value="Shadows" />
                <ListItem value="Spacing" />
                <ListItem value="Typography" />
            </ul>
        </>
    );
};

type ListItemProps = { value: string };
export const ListItem: FC<ListItemProps> = ({ value }) => {
    return (
        <li
            className="hover:cursor-pointer hover:underline"
            onClick={linkTo(`Foundations/${value}`)}
        >
            {value}
        </li>
    );
};
