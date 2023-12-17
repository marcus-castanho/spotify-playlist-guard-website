import React from 'react';
import { render } from '@testing-library/react';
import { FormField } from '@/components/FormField';
import { ContextsProvidersMock } from './mocks/ContextsProvidersMock';

const LABEL_TEXT = 'Form field';
const CUSTOM_ID = 'customId';

describe('FormField', () => {
    it('renders label', () => {
        const { getByText } = render(
            <FormField.Root inputId={CUSTOM_ID} label={LABEL_TEXT}>
                <FormField.TextInput inputId={CUSTOM_ID} />
            </FormField.Root>,
        );

        const label = getByText(LABEL_TEXT);

        expect(label).toBeDefined();
    });

    it('renders label with a custom id in "for" attribute', () => {
        const { getByText } = render(
            <FormField.Root inputId={CUSTOM_ID} label={LABEL_TEXT}>
                <FormField.TextInput inputId={CUSTOM_ID} />
            </FormField.Root>,
        );

        const label = getByText(LABEL_TEXT);

        expect(label.getAttribute('for')).toBe(CUSTOM_ID);
    });

    it('renders label as required', () => {
        const { getByText } = render(
            <FormField.Root inputId={CUSTOM_ID} label={LABEL_TEXT} required>
                <FormField.TextInput inputId={CUSTOM_ID} required />
            </FormField.Root>,
        );

        const label = getByText(LABEL_TEXT);
        const span = getByText('*');

        expect(label.innerHTML).toBe(`${LABEL_TEXT}${span.outerHTML}`);
    });

    it('renders with the input as TextInput', () => {
        const { getByLabelText } = render(
            <FormField.Root inputId={CUSTOM_ID} label={LABEL_TEXT}>
                <FormField.TextInput inputId={CUSTOM_ID} />
            </FormField.Root>,
        );

        const input = getByLabelText(LABEL_TEXT);

        expect(input).toBeDefined();
        expect(input.getAttribute('type')).toBe('text');
    });

    it('renders with the input as PasswordInput', () => {
        const { getByLabelText } = render(
            <ContextsProvidersMock>
                <FormField.Root inputId={CUSTOM_ID} label={LABEL_TEXT}>
                    <FormField.PasswordInput inputId={CUSTOM_ID} />
                </FormField.Root>
            </ContextsProvidersMock>,
        );

        const input = getByLabelText(LABEL_TEXT);

        expect(input).toBeDefined();
        expect(input.getAttribute('type')).toBe('password');
    });
});
