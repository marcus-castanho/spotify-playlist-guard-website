import React from 'react';
import type { Meta } from '@storybook/react';
import { FormField } from '@/components/FormField';

const meta = {
    title: 'Components/FormField',
    component: FormField.Root,
    parameters: {
        layout: 'centered',
        docs: { source: { type: 'code' } },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof FormField.Root>;

export default meta;

export const TextInputField = () => (
    <FormField.Root inputId="example" label="Example" required>
        <FormField.TextInput
            inputId="example"
            defaultValue="Default text"
            placeHolder="Type some text"
            required
        />
    </FormField.Root>
);

export const PasswordInputField = () => (
    <FormField.Root inputId="password" label="Password" required>
        <FormField.PasswordInput
            inputId="example"
            placeHolder="Type the password"
            required
        />
    </FormField.Root>
);
