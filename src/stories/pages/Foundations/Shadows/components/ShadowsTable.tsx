import { Table } from '@/stories/components/Table';
import { shadows, Shadow } from '@/styles/theme';
import React from 'react';

export const ShadowsTable = () => {
    const headers = {
        shadow: 'Shadow',
        value: 'Value',
    };
    const rows: {
        id: Shadow;
        cells: {
            shadow: string;
            value: (typeof shadows)[Shadow];
        };
    }[] = [
        {
            id: 'none',
            cells: {
                shadow: 'none',
                value: 'none',
            },
        },
        {
            id: 'inner',
            cells: {
                shadow: 'inner',
                value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
            },
        },
        {
            id: 'DEFAULT',
            cells: {
                shadow: 'DEFAULT',
                value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            },
        },
        {
            id: 'sm',
            cells: {
                shadow: 'sm (Small)',
                value: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            },
        },
        {
            id: 'md',
            cells: {
                shadow: 'md (Medium)',
                value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            },
        },
        {
            id: 'lg',
            cells: {
                shadow: 'lg (Large)',
                value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            },
        },
        {
            id: 'xl',
            cells: {
                shadow: 'xl (Extra large)',
                value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            },
        },
        {
            id: '2xl',
            cells: {
                shadow: '2xl (Extra extra large)',
                value: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
            },
        },
    ];

    return <Table<keyof typeof headers> headers={headers} rows={rows} />;
};
