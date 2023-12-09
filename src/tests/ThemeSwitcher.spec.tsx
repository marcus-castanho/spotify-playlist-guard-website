import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ContextsProvidersMock } from './mocks/ContextsProvidersMock';
import { expectToThrowWithSilentLogs } from './utils/expectToThrowWithSilentLogs';

const THEME_SWITCHER_LABEL = 'theme-switcher-button';

describe('ThemeSwitcher', () => {
    it('should throw error when ThemeContext is not provided', () => {
        const renderFn = () => render(<ThemeSwitcher />);

        expectToThrowWithSilentLogs(renderFn);
    });

    it('should render', () => {
        const { getByRole } = render(
            <ContextsProvidersMock>
                <ThemeSwitcher />
            </ContextsProvidersMock>,
        );

        const button = getByRole('button', { name: THEME_SWITCHER_LABEL });

        expect(button).toBeDefined();
    });

    it('should switch icons when click button', () => {
        const INITIAL_THEME = 'light';
        const MOON_ICON_TITLE = 'moon-icon';
        const SUN_ICON_TITLE = 'sun-icon';
        const { getByRole, getByTitle } = render(
            <ContextsProvidersMock initialTheme={INITIAL_THEME}>
                <ThemeSwitcher />
            </ContextsProvidersMock>,
        );

        const button = getByRole('button', { name: THEME_SWITCHER_LABEL });
        const svgBefore = getByTitle(MOON_ICON_TITLE);
        fireEvent.click(button);
        const svgAfter = getByTitle(SUN_ICON_TITLE);

        expect(svgBefore).toBeDefined();
        expect(svgAfter).toBeDefined();
    });
});
