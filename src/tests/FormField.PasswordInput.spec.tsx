import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FormField } from '@/components/FormField';
import { ContextsProvidersMock } from './mocks/ContextsProvidersMock';
import { expectToThrowWithSilentLogs } from './utils/expectToThrowWithSilentLogs';

const CUSTOM_ID = 'customId';

describe('FormField.PasswordInput', () => {
    it('should throw error when ThemeContext is not provided', () => {
        const renderFn = () =>
            render(<FormField.PasswordInput inputId={CUSTOM_ID} />);

        expectToThrowWithSilentLogs(renderFn);
    });

    it('should render', () => {
        const { container } = render(
            <ContextsProvidersMock>
                <FormField.PasswordInput inputId={CUSTOM_ID} />
            </ContextsProvidersMock>,
        );

        const input = container.querySelector(`#${CUSTOM_ID}`);

        expect(input).not.toBeNull();
    });

    it('should render with placeholder', () => {
        const PLACEHOLDER = 'placeholder';
        const { getByPlaceholderText } = render(
            <ContextsProvidersMock>
                <FormField.PasswordInput
                    inputId={CUSTOM_ID}
                    placeHolder={PLACEHOLDER}
                />
            </ContextsProvidersMock>,
        );

        const input = getByPlaceholderText(PLACEHOLDER);

        expect(input).toBeDefined();
    });

    it('should render as required', () => {
        const { container } = render(
            <ContextsProvidersMock>
                <FormField.PasswordInput inputId={CUSTOM_ID} required />
            </ContextsProvidersMock>,
        );

        const input = container.querySelector(`#${CUSTOM_ID}`);
        const requiredAttribute = input?.getAttribute('required');

        expect(requiredAttribute).not.toBeUndefined();
        expect(requiredAttribute).not.toBeNull();
    });

    it('should render as disabled', () => {
        const { container } = render(
            <ContextsProvidersMock>
                <FormField.PasswordInput inputId={CUSTOM_ID} disabled />
            </ContextsProvidersMock>,
        );

        const input = container.querySelector(`#${CUSTOM_ID}`);
        const disabledAttribute = input?.getAttribute('disabled');

        expect(disabledAttribute).not.toBeUndefined();
        expect(disabledAttribute).not.toBeNull();
    });

    it('should call onChange prop with input value', async () => {
        const INPUT_VALUE = 'inputValue';
        const onChange = jest.fn();
        const { container } = render(
            <ContextsProvidersMock>
                <FormField.PasswordInput
                    inputId={CUSTOM_ID}
                    onChange={onChange}
                />
            </ContextsProvidersMock>,
        );

        const input = container.querySelector(`#${CUSTOM_ID}`);
        if (input) fireEvent.change(input, { target: { value: INPUT_VALUE } });
        const inputValue = input ? input['value'] : undefined;

        expect(onChange).toHaveBeenCalled();
        expect(inputValue).toBe(INPUT_VALUE);
    });

    it('should render with type "password"', () => {
        const { container } = render(
            <ContextsProvidersMock>
                <FormField.PasswordInput inputId={CUSTOM_ID} />
            </ContextsProvidersMock>,
        );

        const input = container.querySelector(`#${CUSTOM_ID}`);

        expect(input?.getAttribute('type')).toBe('password');
    });

    it('should show input when click button', () => {
        const { container, getByRole } = render(
            <ContextsProvidersMock>
                <FormField.PasswordInput inputId={CUSTOM_ID} />
            </ContextsProvidersMock>,
        );

        const input = container.querySelector(`#${CUSTOM_ID}`);
        const button = getByRole('button');
        const inputTypeBefore = input?.getAttribute('type');
        if (input) fireEvent.click(button);
        const inputTypeAfter = input?.getAttribute('type');

        expect(inputTypeBefore).toBe('password');
        expect(inputTypeAfter).toBe('text');
    });

    it('should show and hide input when button is clicked', () => {
        const { container, getByRole } = render(
            <ContextsProvidersMock>
                <FormField.PasswordInput inputId={CUSTOM_ID} />
            </ContextsProvidersMock>,
        );

        const input = container.querySelector(`#${CUSTOM_ID}`);
        const button = getByRole('button');
        const inputTypeStard = input?.getAttribute('type');
        if (input) fireEvent.click(button);
        const inputTypeMiddle = input?.getAttribute('type');
        if (input) fireEvent.click(button);
        const inputTypeEnd = input?.getAttribute('type');

        expect(inputTypeStard).toBe('password');
        expect(inputTypeMiddle).toBe('text');
        expect(inputTypeEnd).toBe('password');
    });

    it('should show eye-icon and eye-slash-icon when click button', () => {
        const eyeIconTittle = 'eye-icon';
        const eyeSlashIconTitle = 'eye-slash-icon';
        const { container, getByRole, getByTitle } = render(
            <ContextsProvidersMock>
                <FormField.PasswordInput inputId={CUSTOM_ID} />
            </ContextsProvidersMock>,
        );

        const input = container.querySelector(`#${CUSTOM_ID}`);
        const button = getByRole('button');
        const svgIconTitleStart = getByTitle(eyeSlashIconTitle);
        if (input) fireEvent.click(button);
        const svgIconTitleMiddle = getByTitle(eyeIconTittle);
        if (input) fireEvent.click(button);
        const svgIconTitleEnd = getByTitle(eyeSlashIconTitle);

        expect(svgIconTitleStart).toBeDefined();
        expect(svgIconTitleMiddle).toBeDefined();
        expect(svgIconTitleEnd).toBeDefined();
    });
});
