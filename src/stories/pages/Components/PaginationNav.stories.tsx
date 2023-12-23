import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PaginationNav } from '@/components/PaginationNav';
import { usePagination } from '@/hooks/usePagination';

const meta = {
    title: 'Components/PaginationNav',
    component: PaginationNav,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PaginationNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    /**Default args for initialization - functional args are passed in the decorator */
    args: { page: 0, changePage: () => {}, pagesIndexes: [] },
    decorators: [
        (Story) => {
            const { page, changePage, getPagesIndexes } = usePagination();
            const { indexesArr: pagesIndexes } = getPagesIndexes(20, 5);
            return <Story args={{ page, changePage, pagesIndexes }} />;
        },
    ],
};
