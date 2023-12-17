import React from 'react';
import type { Meta } from '@storybook/react';
import { Footer } from '@/components/Footer';

const meta = {
    title: 'Components/Footer',
    component: Footer,
    tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;

export const Default = () => <Footer />;
