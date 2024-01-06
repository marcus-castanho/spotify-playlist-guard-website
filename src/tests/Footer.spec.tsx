import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from '@/components/Footer';
import { ContextsProvidersMock } from './mocks/ContextsProvidersMock';
import { expectToThrowWithSilentLogs } from './utils/expectToThrowWithSilentLogs';

describe('Footer', () => {
    it('should throw error when ThemeContext is not provided', () => {
        const renderFn = () => render(<Footer />);

        expectToThrowWithSilentLogs(renderFn);
    });

    it('should render', () => {
        const { getByText } = render(
            <ContextsProvidersMock>
                <Footer />
            </ContextsProvidersMock>,
        );

        const text = getByText('Developed by');

        expect(text).toBeDefined();
    });

    it('should render a link to github repository', () => {
        const REPOSITORY_LINK_LABEL = 'github-repository-link';
        const REPOSITORY_URL =
            'https://github.com/marcus-castanho/spotify-playlist-guard-website';
        const { getByRole } = render(
            <ContextsProvidersMock>
                <Footer />
            </ContextsProvidersMock>,
        );

        const link = getByRole('link', { name: REPOSITORY_LINK_LABEL });

        expect(link.getAttribute('href')).toBe(REPOSITORY_URL);
    });

    it('should render a link to github profile', () => {
        const PROFILE_LINK_LABEL = 'github-profile-link';
        const PROFILE_URL = 'https://github.com/marcus-castanho';
        const { getByRole } = render(
            <ContextsProvidersMock>
                <Footer />
            </ContextsProvidersMock>,
        );

        const link = getByRole('link', { name: PROFILE_LINK_LABEL });

        expect(link.getAttribute('href')).toBe(PROFILE_URL);
    });
});
