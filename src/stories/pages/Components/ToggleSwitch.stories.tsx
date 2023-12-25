import React from 'react';
import type { Meta } from '@storybook/react';
import { ToggleSwitch } from '@/components/ToggleSwitch';

const meta = {
    title: 'Components/ToggleSwitch',
    component: ToggleSwitch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ToggleSwitch>;

export default meta;

export const Small = () => (
    <ToggleSwitch defaultChecked={false} onChange={() => {}} size={'small'} />
);

export const Medium = () => (
    <ToggleSwitch defaultChecked={false} onChange={() => {}} size={'medium'} />
);

export const Large = () => (
    <ToggleSwitch defaultChecked={false} onChange={() => {}} size={'large'} />
);
