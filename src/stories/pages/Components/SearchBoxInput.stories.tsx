import React from 'react';
import type { Meta } from '@storybook/react';
import { SearchBoxInput } from '@/components/SearchBoxInput';

const meta = {
    title: 'Components/SearchBoxInput',
    component: SearchBoxInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SearchBoxInput>;

export default meta;

export const Default = () => (
    <SearchBoxInput placeHolder="Search user..." onSubmit={() => {}} />
);
