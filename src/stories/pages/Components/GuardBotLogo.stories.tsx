import React from 'react';
import type { Meta } from '@storybook/react';
import { GuardBotLogo } from '@/components/GuardBotLogo';

const meta = {
    title: 'Components/GuardBotLogo',
    component: GuardBotLogo,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof GuardBotLogo>;

export default meta;

export const Logo = () => <GuardBotLogo />;
