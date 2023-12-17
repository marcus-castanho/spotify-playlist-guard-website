import React from 'react';
import type { Meta } from '@storybook/react';
import { ButtonPrimary } from '@/components/ButtonPrimary';

const meta = {
    title: 'Components/ButtomPrimary',
    component: ButtonPrimary,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ButtonPrimary>;

export default meta;

export const Button = () => <ButtonPrimary>Button</ButtonPrimary>;
