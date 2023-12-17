import React from 'react';
import { render } from '@testing-library/react';
import { Anchor } from '@/components/Anchor';

const DEFAULT_LABEL = 'default-link-label';
const DEFAULT_TEXT = 'default-text';
const DEFAULT_URL = 'http://localhost:3030';
const DEFAULT_LINK_TARGET = '_blank';

describe('Anchor', () => {
    it('should render', () => {
        const { getByRole } = render(
            <Anchor
                text={DEFAULT_TEXT}
                label={DEFAULT_LABEL}
                href={DEFAULT_URL}
                target={DEFAULT_LINK_TARGET}
            />,
        );

        const link = getByRole('link', { name: DEFAULT_LABEL });

        expect(link).toBeDefined();
    });

    it('should render given text', () => {
        const { getByText } = render(
            <Anchor
                text={DEFAULT_TEXT}
                label={DEFAULT_LABEL}
                href={DEFAULT_URL}
                target={DEFAULT_LINK_TARGET}
            />,
        );

        const container = getByText(DEFAULT_TEXT);

        expect(container).toBeDefined();
    });

    it('should render with given url', () => {
        const { getByRole } = render(
            <Anchor
                text={DEFAULT_TEXT}
                label={DEFAULT_LABEL}
                href={DEFAULT_URL}
                target={DEFAULT_LINK_TARGET}
            />,
        );

        const link = getByRole('link', { name: DEFAULT_LABEL });

        expect(link.getAttribute('href')).toBe(DEFAULT_URL);
    });

    it('should render with given target prop', () => {
        const { getByRole } = render(
            <Anchor
                text={DEFAULT_TEXT}
                label={DEFAULT_LABEL}
                href={DEFAULT_URL}
                target={DEFAULT_LINK_TARGET}
            />,
        );

        const link = getByRole('link', { name: DEFAULT_LABEL });

        expect(link.getAttribute('target')).toBe(DEFAULT_LINK_TARGET);
    });

    it('should render children', () => {
        const CHILDREN_LABEL = 'test-children';
        const { getByLabelText } = render(
            <Anchor
                text={DEFAULT_TEXT}
                label={DEFAULT_LABEL}
                href={DEFAULT_URL}
                target={DEFAULT_LINK_TARGET}
            >
                <div aria-label={CHILDREN_LABEL} />
            </Anchor>,
        );

        const children = getByLabelText(CHILDREN_LABEL);

        expect(children).toBeDefined();
    });
});
