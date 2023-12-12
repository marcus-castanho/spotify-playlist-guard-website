import React from 'react';
import { render } from '@testing-library/react';
import { Header } from '@/components/Header';
import { ContextsProvidersMock } from './mocks/ContextsProvidersMock';
import { expectToThrowWithSilentLogs } from './utils/expectToThrowWithSilentLogs';

const HOME_LINK_LABEL = 'home-link';

const AVATAR_MENU_LABEL = 'avatar-menu';

describe('Header', () => {
    it('should throw error when AuthContext is not provided', () => {
        const renderFn = () => render(<Header />);

        expectToThrowWithSilentLogs(renderFn);
    });

    it('should render', () => {
        const { getByRole } = render(
            <ContextsProvidersMock>
                <Header />
            </ContextsProvidersMock>,
        );

        const header = getByRole('banner');

        expect(header).toBeDefined();
    });

    it('should render link with href set to /home when user is authenticated', () => {
        const HOME_URL = '/home';
        const { getByRole } = render(
            <ContextsProvidersMock>
                <Header />
            </ContextsProvidersMock>,
        );

        const link = getByRole('link', { name: HOME_LINK_LABEL });

        expect(link.getAttribute('href')).toBe(HOME_URL);
    });

    it('should render link with hred set to / when user is not authenticated', () => {
        const ROOT_URL = '/';
        const { getByRole } = render(
            <ContextsProvidersMock defaultUser={null}>
                <Header />
            </ContextsProvidersMock>,
        );

        const link = getByRole('link', { name: HOME_LINK_LABEL });

        expect(link.getAttribute('href')).toBe(ROOT_URL);
    });

    it('should render AvatarMenu when user is authenticated', () => {
        const { getByLabelText } = render(
            <ContextsProvidersMock>
                <Header />
            </ContextsProvidersMock>,
        );

        const container = getByLabelText(AVATAR_MENU_LABEL);

        expect(container).toBeDefined();
    });

    it('should not render AvatarMenu when user is not authenticated', () => {
        const { queryByLabelText } = render(
            <ContextsProvidersMock defaultUser={null}>
                <Header />
            </ContextsProvidersMock>,
        );

        const container = queryByLabelText(AVATAR_MENU_LABEL);

        expect(container).toBeNull();
    });
});
