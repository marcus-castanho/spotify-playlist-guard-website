import React from 'react';
import { render } from '@testing-library/react';
import { GuardBotLogo } from '@/components/GuardBotLogo';

const LABEL = 'guard-bot-logo';

const LOGO_ICON_TITLE = 'guard-icon';

describe('GuardBotLogo', () => {
    it('should render', () => {
        const DEFAULT_SIZE = 40;
        const { getByLabelText, getByTitle } = render(<GuardBotLogo />);

        const container = getByLabelText(LABEL);
        const svgIconTitle = getByTitle(LOGO_ICON_TITLE);
        const svg = svgIconTitle.parentElement;

        expect(container).toBeDefined();
        expect(svg?.getAttribute('width')).toBe(`${DEFAULT_SIZE}`);
        expect(svg?.getAttribute('height')).toBe(`${DEFAULT_SIZE}`);
    });

    it('should render with given size', () => {
        const SIZE = 60;
        const { getByTitle } = render(<GuardBotLogo size={SIZE} />);

        const svgIconTitle = getByTitle(LOGO_ICON_TITLE);
        const svg = svgIconTitle.parentElement;

        expect(svg?.getAttribute('width')).toBe(`${SIZE}`);
        expect(svg?.getAttribute('height')).toBe(`${SIZE}`);
    });
});
