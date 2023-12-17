import React from 'react';
import type { Meta } from '@storybook/react';
import { Toast } from '@/components/Toast';

const meta = {
    title: 'Components/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;

export const Success = () => (
    <Toast display message="Toast message" type="success" />
);

export const Warning = () => (
    <Toast display message="Toast message" type="warning" />
);

export const Info = () => <Toast display message="Toast message" type="info" />;

export const Error = () => (
    <Toast display message="Toast message" type="error" />
);
