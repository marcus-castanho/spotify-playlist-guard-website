import React from 'react';
import type { Meta } from '@storybook/react';
import { FormField } from '@/components/FormField';

const meta = {
    title: 'Components/FormField/Input/TextInput',
    component: FormField.TextInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof FormField.TextInput>;

export default meta;

export const Default = () => (
    <FormField.TextInput
        inputId="example"
        defaultValue="Example"
        required
        placeHolder="Type some text"
    />
);
