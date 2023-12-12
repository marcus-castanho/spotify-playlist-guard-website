import React from 'react';
import { render } from '@testing-library/react';
import { Avatar } from '@/components/Avatar';
import { ContextsProvidersMock } from './mocks/ContextsProvidersMock';
import { expectToThrowWithSilentLogs } from './utils/expectToThrowWithSilentLogs';

const DEFAULT_AVATAR_ICON_TITLE = 'default-avatar-icon';

describe('Avatar', () => {
    it('should throw error when ThemeContext is not provided', () => {
        const renderFn = () => render(<Avatar />);

        expectToThrowWithSilentLogs(renderFn);
    });

    it('should render with default avatar icon', () => {
        const { getByTitle } = render(
            <ContextsProvidersMock>
                <Avatar />
            </ContextsProvidersMock>,
        );

        const svgIconTitle = getByTitle(DEFAULT_AVATAR_ICON_TITLE);

        expect(svgIconTitle).toBeDefined();
    });

    it('should render with size 24 by default', () => {
        const { getByTitle } = render(
            <ContextsProvidersMock>
                <Avatar />
            </ContextsProvidersMock>,
        );

        const svgIconTitle = getByTitle(DEFAULT_AVATAR_ICON_TITLE);
        const svg = svgIconTitle.parentElement;

        expect(svg?.getAttribute('height')).toBe(`${24}`);
        expect(svg?.getAttribute('width')).toBe(`${24}`);
    });

    it('should render with given size', () => {
        const SIZE = 52;
        const { getByTitle } = render(
            <ContextsProvidersMock>
                <Avatar size={SIZE} />
            </ContextsProvidersMock>,
        );

        const svgIconTitle = getByTitle(DEFAULT_AVATAR_ICON_TITLE);
        const svg = svgIconTitle.parentElement;

        expect(svg?.getAttribute('height')).toBe(`${SIZE}`);
        expect(svg?.getAttribute('width')).toBe(`${SIZE}`);
    });
});
