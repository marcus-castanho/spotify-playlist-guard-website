import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AvatarMenu } from '@/components/AvatarMenu';
import {
    ContextsProvidersMock,
    DEFAULT_USER,
} from './mocks/ContextsProvidersMock';
import { expectToThrowWithSilentLogs } from './utils/expectToThrowWithSilentLogs';

const LABEL = 'avatar-menu';

const DEFAULT_AVATAR_ICON_TITLE = 'default-avatar-icon';

describe('AvatarMenu', () => {
    it('should throw error when ThemeContext is not provided', () => {
        const renderFn = () => render(<AvatarMenu user={DEFAULT_USER} />);

        expectToThrowWithSilentLogs(renderFn);
    });

    it('should render', () => {
        const { getByLabelText } = render(
            <ContextsProvidersMock>
                <AvatarMenu user={DEFAULT_USER} />
            </ContextsProvidersMock>,
        );

        const component = getByLabelText(LABEL);

        expect(component).toBeDefined();
    });

    it('should render with hidden dropdown menu by default', () => {
        const { getByLabelText } = render(
            <ContextsProvidersMock>
                <AvatarMenu user={DEFAULT_USER} />
            </ContextsProvidersMock>,
        );

        const component = getByLabelText(LABEL);
        const children = component.children;
        const numberOfChildElements = children.length;
        const lastChildTagName = children[0].tagName;

        expect(numberOfChildElements).toBe(1);
        expect(lastChildTagName).toBe('BUTTON');
    });

    it('should render with visible dropdown as passed by prop', () => {
        const { getByLabelText } = render(
            <ContextsProvidersMock>
                <AvatarMenu user={DEFAULT_USER} defaultVisibilty />
            </ContextsProvidersMock>,
        );

        const component = getByLabelText(LABEL);
        const children = component.children;
        const numberOfChildElements = children.length;
        const lastChildTagName = children[1].tagName;

        expect(numberOfChildElements).toBe(2);
        expect(lastChildTagName).toBe('DIV');
    });

    it('should render dropdown menu when click avatar', () => {
        const { getByLabelText, getByTitle } = render(
            <ContextsProvidersMock>
                <AvatarMenu user={DEFAULT_USER} />
            </ContextsProvidersMock>,
        );

        const component = getByLabelText(LABEL);
        const childrenBefore = component.children;
        const numberOfChildElementsBefore = childrenBefore.length;
        const lastChildTagNameBefore =
            childrenBefore[numberOfChildElementsBefore - 1].tagName;

        const svgIconTitle = getByTitle(DEFAULT_AVATAR_ICON_TITLE);
        const avatarOuterElement = svgIconTitle.parentElement;
        const avatarButton = avatarOuterElement?.parentElement || null;
        if (avatarButton) fireEvent.click(avatarButton);

        const children = component.children;
        const numberOfChildElementsAfter = children.length;
        const lastChildTagNameAfter =
            children[numberOfChildElementsAfter - 1].tagName;

        expect(numberOfChildElementsBefore).toBe(1);
        expect(lastChildTagNameBefore).toBe('BUTTON');
        expect(numberOfChildElementsAfter).toBe(2);
        expect(lastChildTagNameAfter).toBe('DIV');
    });

    it('should hide dropdown menu when click outside component', () => {
        const { getByLabelText } = render(
            <ContextsProvidersMock>
                <AvatarMenu user={DEFAULT_USER} defaultVisibilty />
            </ContextsProvidersMock>,
        );

        const component = getByLabelText(LABEL);
        const childrenBefore = component.children;
        const numberOfChildElementsBefore = childrenBefore.length;
        const lastChildTagNameBefore =
            childrenBefore[numberOfChildElementsBefore - 1].tagName;

        fireEvent.click(document);

        const children = component.children;
        const numberOfChildElementsAfter = children.length;
        const lastChildTagNameAfter =
            children[numberOfChildElementsAfter - 1].tagName;

        expect(numberOfChildElementsBefore).toBe(2);
        expect(lastChildTagNameBefore).toBe('DIV');
        expect(numberOfChildElementsAfter).toBe(1);
        expect(lastChildTagNameAfter).toBe('BUTTON');
    });
});
