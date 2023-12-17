import React from 'react';
import type { Meta } from '@storybook/react';
import { FormField } from '@/components/FormField';

const meta = {
    title: 'Components/FormField/Input/PasswordInput',
    component: FormField.PasswordInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof FormField.PasswordInput>;

export default meta;

export const Default = () => (
    <FormField.PasswordInput
        inputId="example"
        required
        placeHolder="Type the password"
    />
);
