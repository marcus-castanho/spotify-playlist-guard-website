import React, { ReactNode } from 'react';
import { Table } from '@/stories/components/Table';
import { fontSize, FontSize } from '@/styles/theme';

export const FontSizesTable = () => {
    const fontSizeKeys = Object.keys(fontSize) as FontSize[];
    const headers = {
        size: 'Size',
        value: 'Value',
        lineHeight: 'Line height',
        example: 'Example',
    };
    const rows: {
        id: FontSize;
        cells: {
            size: string;
            value: (typeof fontSize)[FontSize][0];
            lineHeight: string;
            example: ReactNode;
        };
    }[] = fontSizeKeys.map((fontSizekey) => {
        const [size, lineHeight] = fontSize[fontSizekey];
        return {
            id: fontSizekey,
            cells: {
                size: fontSizekey,
                value: size,
                lineHeight,
                example: (
                    <p
                        style={{
                            fontSize: size,
                            lineHeight,
                        }}
                    >
                        Text
                    </p>
                ),
            },
        };
    });

    return <Table<keyof typeof headers> headers={headers} rows={rows} />;
};
