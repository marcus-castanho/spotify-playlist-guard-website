import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SearchBoxInput } from '@/components/SearchBoxInput';

const CUSTOM_ID = 'customId';

describe('SearchBoxInput', () => {
    it('should render', () => {
        const { container } = render(
            <SearchBoxInput inputId={CUSTOM_ID} onSubmit={() => {}} />,
        );

        const input = container.querySelector(`#${CUSTOM_ID}`);

        expect(input).not.toBeNull();
    });

    it('should render with defaultValue', () => {
        const DEFAULT_VALUE = 'defaultValue';
        const { getByDisplayValue } = render(
            <SearchBoxInput
                inputId={CUSTOM_ID}
                defaultValue={DEFAULT_VALUE}
                onSubmit={() => {}}
            />,
        );

        const input = getByDisplayValue(DEFAULT_VALUE);

        expect(input).toBeDefined();
    });

    it('should render with placeholder', () => {
        const PLACEHOLDER = 'placeholder';
        const { getByPlaceholderText } = render(
            <SearchBoxInput
                inputId={CUSTOM_ID}
                placeHolder={PLACEHOLDER}
                onSubmit={() => {}}
            />,
        );

        const input = getByPlaceholderText(PLACEHOLDER);

        expect(input).toBeDefined();
    });

    it('should render as disabled', () => {
        const { getByRole } = render(
            <SearchBoxInput inputId={CUSTOM_ID} disabled onSubmit={() => {}} />,
        );

        const input = getByRole('textbox');

        expect(input.getAttribute('disabled')).not.toBeNull();
    });

    it('should call onChange prop with input value', async () => {
        const INPUT_VALUE = 'inputValue';
        const onChange = jest.fn();
        const { getByRole } = render(
            <SearchBoxInput
                inputId={CUSTOM_ID}
                onChange={onChange}
                onSubmit={() => {}}
            />,
        );

        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: INPUT_VALUE } });
        const inputValue = input['value'];

        expect(onChange).toHaveBeenCalled();
        expect(inputValue).toBe(INPUT_VALUE);
    });

    it('should call onSubmit prop', async () => {
        const onSubmit = jest.fn();
        const { getByRole } = render(
            <SearchBoxInput inputId={CUSTOM_ID} onSubmit={onSubmit} />,
        );

        const button = getByRole('button');
        fireEvent.click(button);

        expect(onSubmit).toHaveBeenCalled();
    });
});
