import React from 'react';
import type { Meta } from '@storybook/react';
import { ButtonSecondary } from '@/components/ButtonSecondary';

const meta = {
    title: 'Components/ButtonSecondary',
    component: ButtonSecondary,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ButtonSecondary>;

export default meta;

export const Button = () => <ButtonSecondary>Button</ButtonSecondary>;
