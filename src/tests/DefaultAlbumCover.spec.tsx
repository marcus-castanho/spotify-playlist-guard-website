import React from 'react';
import { render } from '@testing-library/react';
import { DefaultAlbumCover } from '@/components/DefaultAlbumCover';

const LABEL = 'default-album-cover';

const LOGO_ICON_TITLE = 'musical-note-icon';

describe('DefaultAlbumCover', () => {
    it('should render', () => {
        const DEFAULT_SIZE = 140;
        const { getByLabelText, getByTitle } = render(<DefaultAlbumCover />);

        const container = getByLabelText(LABEL);
        const svgIconTitle = getByTitle(LOGO_ICON_TITLE);
        const svg = svgIconTitle.parentElement;

        expect(container).toBeDefined();
        expect(svg?.getAttribute('width')).toBe(`${DEFAULT_SIZE}`);
        expect(svg?.getAttribute('height')).toBe(`${DEFAULT_SIZE}`);
    });

    it('should render with given size', () => {
        const SIZE = 60;
        const { getByTitle } = render(<DefaultAlbumCover size={SIZE} />);

        const svgIconTitle = getByTitle(LOGO_ICON_TITLE);
        const svg = svgIconTitle.parentElement;

        expect(svg?.getAttribute('width')).toBe(`${SIZE}`);
        expect(svg?.getAttribute('height')).toBe(`${SIZE}`);
    });
});
