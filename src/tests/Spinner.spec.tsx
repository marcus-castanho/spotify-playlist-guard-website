import React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from '@/components/Spinner';

describe('Spinner', () => {
    it('should render', () => {
        const { getByLabelText } = render(<Spinner size="small" />);

        const span = getByLabelText('spinner');

        expect(span).toBeDefined();
    });

    it('should render with small size', () => {
        const SMALL_SIZE_CLASSES = 'h-6 w-6';
        const { getByLabelText } = render(<Spinner size="small" />);

        const span = getByLabelText('spinner');

        expect(span).toHaveClass(SMALL_SIZE_CLASSES);
    });

    it('should render with medium size', () => {
        const MEDIUM_SIZE_CLASSES = 'h-9 w-9';
        const { getByLabelText } = render(<Spinner size="medium" />);

        const span = getByLabelText('spinner');

        expect(span).toHaveClass(MEDIUM_SIZE_CLASSES);
    });

    it('should render with large size', () => {
        const LARGE_SIZE_CLASSES = 'h-12 w-12';
        const { getByLabelText } = render(<Spinner size="large" />);

        const span = getByLabelText('spinner');

        expect(span).toHaveClass(LARGE_SIZE_CLASSES);
    });
});
