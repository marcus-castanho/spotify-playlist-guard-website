import React from 'react';
import type { Meta } from '@storybook/react';
import { ImageLoader } from '@/components/ImageLoader';
import Image from 'next/image';

const meta = {
    title: 'Components/ImageLoader',
    component: ImageLoader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ImageLoader>;

export default meta;

export const Loading = () => (
    <ImageLoader
        loaded={false}
        bgImageSrc="/images/guardBot-191414-circle-resized_10x10.png"
    >
        <Image
            alt="playlist-spotify-display"
            src="/images/guardBot-191414-circle.png"
            height={100}
            width={100}
        />
    </ImageLoader>
);

export const Loaded = () => (
    <ImageLoader
        loaded={true}
        bgImageSrc="/images/guardBot-191414-circle-resized_10x10.png"
    >
        <Image
            alt="playlist-spotify-display"
            src="/images/guardBot-191414-circle.png"
            height={100}
            width={100}
        />
    </ImageLoader>
);
