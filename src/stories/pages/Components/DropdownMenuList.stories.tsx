import React from 'react';
import type { Meta } from '@storybook/react';
import { DropdownMenuList } from '@/components/DropdownMenuList';
import { Avatar } from '@/components/Avatar';

const meta = {
    title: 'Components/DropdownMenuList',
    component: DropdownMenuList,
    tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenuList>;

export default meta;

export const Default = () => (
    <DropdownMenuList
        itemsGroups={[
            ['Group1 - Item1', 'Group1 - Item2'],
            ['Group2 - Item1', 'Group2 - Item2', 'Group2 - Item3'],
            ['Group3 - Item1'],
        ]}
        onClose={() => {}}
    />
);

export const WithHeader = () => (
    <DropdownMenuList
        header={
            <div className="flex items-center gap-2">
                <Avatar size={30} />
                {'Test user'}
            </div>
        }
        itemsGroups={[['Profile', 'Configuration'], ['Sign out']]}
        onClose={() => {}}
    />
);
