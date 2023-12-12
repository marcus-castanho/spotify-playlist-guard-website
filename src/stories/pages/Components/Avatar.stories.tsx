import React from 'react';
import type { Meta } from '@storybook/react';
import { Avatar } from '@/components/Avatar';

const meta = {
    title: 'Components/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;

export const Default = () => <Avatar size={52} />;

export const Example = () => (
    <Avatar size={52} src="/images/guardBot-1db954-circle.png" />
);
