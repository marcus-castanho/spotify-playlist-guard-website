import React from 'react';
import type { Meta } from '@storybook/react';
import { Spinner } from '@/components/Spinner';

const meta = {
    title: 'Components/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;

export const Small = () => <Spinner size="small" />;

export const Medium = () => <Spinner size="medium" />;

export const Large = () => <Spinner size="large" />;
