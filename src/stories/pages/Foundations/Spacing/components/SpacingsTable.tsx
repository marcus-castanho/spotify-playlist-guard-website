import { Table } from '@/stories/components/Table';
import { spacings, Spacing } from '@/styles/theme';
import React, { ReactNode } from 'react';

export const SpacingsTable = () => {
    const spacingsKeys = Object.keys(spacings)
        .map((spacing) => parseFloat(spacing))
        .sort((a, b) => {
            const compareResult = a > b;
            return compareResult ? 1 : -1;
        })
        .map((spacing) => `${spacing}`);
    const headers = {
        spacing: 'Spacing',
        remValue: 'Value (rem)',
        pxValue: 'Value (px)',
        representation: 'Representation',
    };
    const rows: {
        id: Spacing;
        cells: {
            spacing: string;
            remValue: (typeof spacings)[Spacing];
            pxValue: string;
            representation: ReactNode;
        };
    }[] = spacingsKeys.map((spacingKey) => {
        const id = spacingKey as Spacing;
        const remValue = parseFloat(spacings[id].replace('rem', ''));
        /**Convertion ratio is equivalent to 1rem = 16px */
        const pxValue = remValue * 16;

        return {
            id,
            cells: {
                spacing: id,
                remValue: spacings[id],
                pxValue: `${pxValue}px`,
                representation: (
                    <div
                        style={{
                            height: spacings[id],
                            width: spacings[id],
                            backgroundColor: 'gray',
                        }}
                    />
                ),
            },
        };
    });

    return <Table<keyof typeof headers> headers={headers} rows={rows} />;
};
