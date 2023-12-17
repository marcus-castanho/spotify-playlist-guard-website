import React from 'react';
import type { Meta } from '@storybook/react';
import { ExternalLink } from '@/components/ExternalLink';

const meta = {
    title: 'Components/ExternalLink',
    component: ExternalLink,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ExternalLink>;

export default meta;

export const Default = () => (
    <ExternalLink
        href={window.origin}
        label="self-origin-link"
        target="_blank"
        text="External link"
    />
);
