import React from 'react';
import { render } from '@testing-library/react';
import { DefaultAlbumCover } from '@/components/DefaultAlbumCover';

const LABEL = 'default-album-cover';
const LOGO_ICON_TITLE = 'musical-note-icon';

describe('DefaultAlbumCover', () => {
    it('should render', () => {
        const { getByLabelText, getByTitle } = render(<DefaultAlbumCover />);

        const container = getByLabelText(LABEL);
        const svgIconTitle = getByTitle(LOGO_ICON_TITLE);
        const svg = svgIconTitle.parentElement;

        expect(container).toBeDefined();
        expect(svg).toBeDefined();
    });
});
