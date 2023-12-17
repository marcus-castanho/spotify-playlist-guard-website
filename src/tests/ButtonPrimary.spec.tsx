import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ButtonPrimary } from '@/components/ButtonPrimary';

const DEFAULT_CONTENT = 'CONFIRM';

const ARIAL_LABEL = 'button-primary';

describe('ButtonPrimary', () => {
    it('should render', () => {
        const { getByText } = render(
            <ButtonPrimary>{DEFAULT_CONTENT}</ButtonPrimary>,
        );

        const button = getByText(DEFAULT_CONTENT);

        expect(button).toBeDefined();
    });

    it('should render with type "button" as default', () => {
        const { getByLabelText } = render(
            <ButtonPrimary>{DEFAULT_CONTENT}</ButtonPrimary>,
        );

        const button = getByLabelText(ARIAL_LABEL);

        expect(button.getAttribute('type')).toBe('button');
    });

    it('should render with type "submit"', () => {
        const { getByLabelText } = render(
            <ButtonPrimary type="submit">{DEFAULT_CONTENT}</ButtonPrimary>,
        );

        const button = getByLabelText(ARIAL_LABEL);

        expect(button.getAttribute('type')).toBe('submit');
    });

    it('should render with attribute disabled as null by default', () => {
        const { getByLabelText } = render(
            <ButtonPrimary>{DEFAULT_CONTENT}</ButtonPrimary>,
        );

        const button = getByLabelText(ARIAL_LABEL);

        expect(button.getAttribute('disabled')).toBeNull();
    });

    it('should render as disabled', () => {
        const { getByLabelText } = render(
            <ButtonPrimary disabled>{DEFAULT_CONTENT}</ButtonPrimary>,
        );

        const button = getByLabelText(ARIAL_LABEL);

        expect(button.getAttribute('disabled')).not.toBeNull();
    });

    it('should call onClick passed as prop', async () => {
        const onClick = jest.fn();
        const { getByText } = render(
            <ButtonPrimary onClick={onClick}>{DEFAULT_CONTENT}</ButtonPrimary>,
        );

        const button = getByText(DEFAULT_CONTENT);
        fireEvent.click(button);

        expect(onClick).toHaveBeenCalled();
    });
});
