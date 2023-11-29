import { Table } from '@/stories/components/Table';
import { screens, Screen } from '@/styles/theme';
import React from 'react';

export const BreakpointsTable = () => {
    const headers = {
        breakpoint: 'Breakpoint',
        size: 'Size',
    };
    const rows: {
        id: Screen;
        cells: {
            breakpoint: string;
            size: (typeof screens)[Screen];
        };
    }[] = [
        {
            id: 'sm',
            cells: {
                breakpoint: 'sm (Small)',
                size: '640px',
            },
        },
        {
            id: 'md',
            cells: {
                breakpoint: 'md (Medium)',
                size: '768px',
            },
        },
        {
            id: 'lg',
            cells: {
                breakpoint: 'lg (Large)',
                size: '1024px',
            },
        },
        {
            id: 'xl',
            cells: {
                breakpoint: 'xl (Extra large)',
                size: '1280px',
            },
        },
        {
            id: '2xl',
            cells: {
                breakpoint: '2xl (Extra extra large)',
                size: '1536px',
            },
        },
    ];

    return <Table<keyof typeof headers> headers={headers} rows={rows} />;
};
