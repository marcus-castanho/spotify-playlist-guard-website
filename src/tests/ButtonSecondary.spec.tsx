import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ButtonSecondary } from '@/components/ButtonSecondary';

const DEFAULT_CONTENT = 'CONFIRM';

const ARIAL_LABEL = 'button-secondary';

describe('ButtonSecondary', () => {
    it('should render', () => {
        const { getByText } = render(
            <ButtonSecondary>{DEFAULT_CONTENT}</ButtonSecondary>,
        );

        const button = getByText(DEFAULT_CONTENT);

        expect(button).toBeDefined();
    });

    it('should render with type "button" as default', () => {
        const { getByLabelText } = render(
            <ButtonSecondary>{DEFAULT_CONTENT}</ButtonSecondary>,
        );

        const button = getByLabelText(ARIAL_LABEL);

        expect(button.getAttribute('type')).toBe('button');
    });

    it('should render with type "submit"', () => {
        const { getByLabelText } = render(
            <ButtonSecondary type="submit">{DEFAULT_CONTENT}</ButtonSecondary>,
        );

        const button = getByLabelText(ARIAL_LABEL);

        expect(button.getAttribute('type')).toBe('submit');
    });

    it('should call onClick passed as prop', async () => {
        const onClick = jest.fn();
        const { getByText } = render(
            <ButtonSecondary onClick={onClick}>
                {DEFAULT_CONTENT}
            </ButtonSecondary>,
        );

        const button = getByText(DEFAULT_CONTENT);
        fireEvent.click(button);

        expect(onClick).toHaveBeenCalled();
    });
});
