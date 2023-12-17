import { FormField } from '@/components/FormField';
import React from 'react';

export const FormFieldMock = () => {
    const LABEL = 'label';
    const ID = 'inputId';

    return (
        <FormField.Root inputId={ID} label={LABEL}>
            <FormField.TextInput inputId={ID} />
        </FormField.Root>
    );
};
