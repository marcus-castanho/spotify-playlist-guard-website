import React from 'react';
import type { Meta } from '@storybook/react';
import { DefaultAlbumCover } from '@/components/DefaultAlbumCover';

const meta = {
    title: 'Components/DefaultAlbumCover',
    component: DefaultAlbumCover,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DefaultAlbumCover>;

export default meta;

export const AlbumCover = () => <DefaultAlbumCover />;
