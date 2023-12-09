import React from 'react';
import type { Meta } from '@storybook/react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const meta = {
    title: 'Components/ThemeSwitcher',
    component: ThemeSwitcher,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;

export const Switcher = () => <ThemeSwitcher />;
