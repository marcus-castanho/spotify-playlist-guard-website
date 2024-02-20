import React from 'react';
import { render } from '@testing-library/react';
import { ImageLoader } from '@/components/ImageLoader';
import { NextImageMock } from './mocks/ImageMock';

const DEFAULT_IMG_ALT_TEXT = 'test-img-alt-text';
const DEFAULT_LOADER_BG_IMG_SRC = 'test_bg_img_src';

describe('ImageLoader', () => {
    it('should render img children', () => {
        const { getAllByAltText } = render(
            <ImageLoader loaded={true} bgImageSrc={DEFAULT_LOADER_BG_IMG_SRC}>
                <NextImageMock altText={DEFAULT_IMG_ALT_TEXT} />
            </ImageLoader>,
        );

        const img = getAllByAltText(DEFAULT_IMG_ALT_TEXT);

        expect(img).toBeDefined();
    });

    it('should render background image passed as prop', () => {
        const { getAllByAltText } = render(
            <ImageLoader loaded={true} bgImageSrc={DEFAULT_LOADER_BG_IMG_SRC}>
                <NextImageMock altText={DEFAULT_IMG_ALT_TEXT} />
            </ImageLoader>,
        );

        const img = getAllByAltText(DEFAULT_IMG_ALT_TEXT)[0];
        const imgContainer = img.parentElement;
        const componentContainer = imgContainer?.parentElement;

        expect(componentContainer).toHaveStyle(
            `background-image: url(${DEFAULT_LOADER_BG_IMG_SRC})`,
        );
    });

    it('should render blured image when loaded is false', () => {
        const BLUR_CLASSE = 'blur-lg';

        const { getAllByAltText } = render(
            <ImageLoader loaded={false} bgImageSrc={DEFAULT_LOADER_BG_IMG_SRC}>
                <NextImageMock altText={DEFAULT_IMG_ALT_TEXT} />
            </ImageLoader>,
        );

        const img = getAllByAltText(DEFAULT_IMG_ALT_TEXT)[0];
        const imgContainer = img.parentElement;
        const componentContainer = imgContainer?.parentElement;

        expect(componentContainer).toHaveClass(BLUR_CLASSE);
    });

    it('should not render blured image when loaded is true', () => {
        const BLUR_CLASSE = 'blur-lg';

        const { getAllByAltText } = render(
            <ImageLoader loaded={true} bgImageSrc={DEFAULT_LOADER_BG_IMG_SRC}>
                <NextImageMock altText={DEFAULT_IMG_ALT_TEXT} />
            </ImageLoader>,
        );

        const img = getAllByAltText(DEFAULT_IMG_ALT_TEXT)[0];
        const imgContainer = img.parentElement;
        const componentContainer = imgContainer?.parentElement;

        expect(componentContainer).not.toHaveClass(BLUR_CLASSE);
    });
});
