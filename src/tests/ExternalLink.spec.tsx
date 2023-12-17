import React from 'react';
import { render } from '@testing-library/react';
import { ExternalLink } from '@/components/ExternalLink';
import { ContextsProvidersMock } from './mocks/ContextsProvidersMock';
import { expectToThrowWithSilentLogs } from './utils/expectToThrowWithSilentLogs';

const DEFAULT_LABEL = 'default-link-label';
const DEFAULT_TEXT = 'default-text';
const DEFAULT_URL = 'http://localhost:3030';
const DEFAULT_LINK_TARGET = '_blank';
const EXTERNAL_LINK_ICON_TITLE = 'external-link-icon';

describe('ExternalLink', () => {
    it('should throw error when ThemeContext is not provided', () => {
        const renderFn = () =>
            render(
                <ExternalLink
                    text={DEFAULT_TEXT}
                    label={DEFAULT_LABEL}
                    href={DEFAULT_URL}
                    target={DEFAULT_LINK_TARGET}
                />,
            );

        expectToThrowWithSilentLogs(renderFn);
    });

    it('should render', () => {
        const { getByRole } = render(
            <ContextsProvidersMock>
                <ExternalLink
                    text={DEFAULT_TEXT}
                    label={DEFAULT_LABEL}
                    href={DEFAULT_URL}
                    target={DEFAULT_LINK_TARGET}
                />
            </ContextsProvidersMock>,
        );

        const link = getByRole('link', { name: DEFAULT_LABEL });

        expect(link).toBeDefined();
    });
    it('should render given text', () => {
        const { getByText } = render(
            <ContextsProvidersMock>
                <ExternalLink
                    text={DEFAULT_TEXT}
                    label={DEFAULT_LABEL}
                    href={DEFAULT_URL}
                    target={DEFAULT_LINK_TARGET}
                />
            </ContextsProvidersMock>,
        );

        const container = getByText(DEFAULT_TEXT);

        expect(container).toBeDefined();
    });

    it('should render with given url', () => {
        const { getByRole } = render(
            <ContextsProvidersMock>
                <ExternalLink
                    text={DEFAULT_TEXT}
                    label={DEFAULT_LABEL}
                    href={DEFAULT_URL}
                    target={DEFAULT_LINK_TARGET}
                />
            </ContextsProvidersMock>,
        );

        const link = getByRole('link', { name: DEFAULT_LABEL });

        expect(link.getAttribute('href')).toBe(DEFAULT_URL);
    });

    it('should render with given target prop', () => {
        const { getByRole } = render(
            <ContextsProvidersMock>
                <ExternalLink
                    text={DEFAULT_TEXT}
                    label={DEFAULT_LABEL}
                    href={DEFAULT_URL}
                    target={DEFAULT_LINK_TARGET}
                />
            </ContextsProvidersMock>,
        );

        const link = getByRole('link', { name: DEFAULT_LABEL });

        expect(link.getAttribute('target')).toBe(DEFAULT_LINK_TARGET);
    });

    it('should render ExternalLinkIcon', () => {
        const { getByTitle } = render(
            <ContextsProvidersMock>
                <ExternalLink
                    text={DEFAULT_TEXT}
                    label={DEFAULT_LABEL}
                    href={DEFAULT_URL}
                    target={DEFAULT_LINK_TARGET}
                />
            </ContextsProvidersMock>,
        );

        const svgIconTitle = getByTitle(EXTERNAL_LINK_ICON_TITLE);

        expect(svgIconTitle).toBeDefined();
    });
});
