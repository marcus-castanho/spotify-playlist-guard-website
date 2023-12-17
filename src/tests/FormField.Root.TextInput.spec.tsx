import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FormField } from '@/components/FormField';

const CUSTOM_ID = 'customId';

describe('FormField.TextInput', () => {
    it('should render', () => {
        const { container } = render(
            <FormField.TextInput inputId={CUSTOM_ID} />,
        );

        const input = container.querySelector(`#${CUSTOM_ID}`);

        expect(input).not.toBeNull();
    });

    it('should render with defaultValue', () => {
        const DEFAULT_VALUE = 'defaultValue';
        const { getByDisplayValue } = render(
            <FormField.TextInput
                inputId={CUSTOM_ID}
                defaultValue={DEFAULT_VALUE}
            />,
        );

        const input = getByDisplayValue(DEFAULT_VALUE);

        expect(input).toBeDefined();
    });

    it('should render with placeholder', () => {
        const PLACEHOLDER = 'placeholder';
        const { getByPlaceholderText } = render(
            <FormField.TextInput
                inputId={CUSTOM_ID}
                placeHolder={PLACEHOLDER}
            />,
        );

        const input = getByPlaceholderText(PLACEHOLDER);

        expect(input).toBeDefined();
    });

    it('should render as required', () => {
        const { getByRole } = render(
            <FormField.TextInput inputId={CUSTOM_ID} required />,
        );

        const input = getByRole('textbox');

        expect(input.getAttribute('required')).not.toBeNull();
    });

    it('should render with type "text" as default', () => {
        const { getByRole } = render(
            <FormField.TextInput inputId={CUSTOM_ID} />,
        );

        const input = getByRole('textbox');

        expect(input.getAttribute('type')).toBe('text');
    });

    it('should render with type "email"', () => {
        const { getByRole } = render(
            <FormField.TextInput inputId={CUSTOM_ID} type="email" />,
        );

        const input = getByRole('textbox');

        expect(input.getAttribute('type')).toBe('email');
    });

    it('should render with type "tel"', () => {
        const { getByRole } = render(
            <FormField.TextInput inputId={CUSTOM_ID} type="tel" />,
        );

        const input = getByRole('textbox');

        expect(input.getAttribute('type')).toBe('tel');
    });

    it('should render with type "url"', () => {
        const { getByRole } = render(
            <FormField.TextInput inputId={CUSTOM_ID} type="url" />,
        );

        const input = getByRole('textbox');

        expect(input.getAttribute('type')).toBe('url');
    });

    it('should render as disabled', () => {
        const { getByRole } = render(
            <FormField.TextInput inputId={CUSTOM_ID} disabled />,
        );

        const input = getByRole('textbox');

        expect(input.getAttribute('disabled')).not.toBeNull();
    });

    it('should call onChange prop with input value', async () => {
        const INPUT_VALUE = 'inputValue';
        const onChange = jest.fn();
        const { getByRole } = render(
            <FormField.TextInput inputId={CUSTOM_ID} onChange={onChange} />,
        );

        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: INPUT_VALUE } });
        const inputValue = input['value'];

        expect(onChange).toHaveBeenCalled();
        expect(inputValue).toBe(INPUT_VALUE);
    });
});
