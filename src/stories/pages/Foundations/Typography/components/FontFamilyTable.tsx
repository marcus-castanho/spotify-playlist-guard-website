import React, { ReactNode } from 'react';
import { Table } from '@/stories/components/Table';
import { fontFamily, FontFamily } from '@/styles/theme';
import { Unstyled } from '@storybook/blocks';

export const FontFamilyTable = () => {
    const fontFamilyKeys = Object.keys(fontFamily) as FontFamily[];
    const headers = {
        token: 'Token',
        value: 'Value',
        example: 'Example',
    };
    const rows: {
        id: FontFamily;
        cells: {
            token: string;
            value: string;
            example: ReactNode;
        };
    }[] = fontFamilyKeys.map((fontFamilyKey) => {
        return {
            id: fontFamilyKey,
            cells: {
                token: fontFamilyKey,
                value: fontFamily[fontFamilyKey].join(','),
                example: (
                    <Unstyled>
                        <p
                            style={{
                                fontFamily: fontFamily[fontFamilyKey].join(','),
                            }}
                        >
                            Text
                        </p>
                    </Unstyled>
                ),
            },
        };
    });

    return <Table<keyof typeof headers> headers={headers} rows={rows} />;
};
