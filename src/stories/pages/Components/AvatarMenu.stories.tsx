import React from 'react';
import type { Meta } from '@storybook/react';
import { AvatarMenu } from '@/components/AvatarMenu';

const meta = {
    title: 'Components/AvatarMenu',
    component: AvatarMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AvatarMenu>;

export default meta;

export const Closed = () => (
    <AvatarMenu
        user={{
            id: '00000000-0000-0000-0000-000000000000',
            spotify_id: '0000000000000000000000000000',
            country: 'BR',
            display_name: 'Test user',
            email: 'test@test.com',
            external_url: 'external_url',
            followers: 1,
            href: 'href',
            images: ['image1'],
            product: 'product',
            type: 'type',
            uri: 'url',
            createdAt: '2023-08-13T02:31:45.610Z',
            updatedAt: '2023-10-11T01:18:06.082Z',
        }}
    />
);

export const Open = () => (
    <AvatarMenu
        user={{
            id: '00000000-0000-0000-0000-000000000000',
            spotify_id: '0000000000000000000000000000',
            country: 'BR',
            display_name: 'Test user',
            email: 'test@test.com',
            external_url: 'external_url',
            followers: 1,
            href: 'href',
            images: ['image1'],
            product: 'product',
            type: 'type',
            uri: 'url',
            createdAt: '2023-08-13T02:31:45.610Z',
            updatedAt: '2023-10-11T01:18:06.082Z',
        }}
        defaultVisibilty
    />
);
