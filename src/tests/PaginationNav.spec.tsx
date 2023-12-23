import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PaginationNav } from '@/components/PaginationNav';
import { ContextsProvidersMock } from './mocks/ContextsProvidersMock';
import { expectToThrowWithSilentLogs } from './utils/expectToThrowWithSilentLogs';

const PAGINATION_NAV_LABEL = 'pagination-nav';

const PREV_PAGE_NAV_BUTTON_LABEL = 'prev-page-nav-button';

const NEXT_PAGE_NAV_BUTTON_LABEL = 'next-page-nav-button';

describe('Avatar', () => {
    it('should throw error when ThemeContext is not provided', () => {
        const renderFn = () =>
            render(
                <PaginationNav
                    page={1}
                    pagesIndexes={[]}
                    changePage={() => {}}
                />,
            );

        expectToThrowWithSilentLogs(renderFn);
    });

    it('should render', () => {
        const { getByLabelText } = render(
            <ContextsProvidersMock>
                <PaginationNav
                    page={1}
                    pagesIndexes={[]}
                    changePage={() => {}}
                />
            </ContextsProvidersMock>,
        );

        const container = getByLabelText(PAGINATION_NAV_LABEL);

        expect(container).toBeDefined();
    });

    it('should set previous page nav button to disabled when it is first page', () => {
        const { getByRole } = render(
            <ContextsProvidersMock>
                <PaginationNav
                    page={1}
                    pagesIndexes={[1]}
                    changePage={() => {}}
                />
            </ContextsProvidersMock>,
        );

        const button = getByRole('button', {
            name: PREV_PAGE_NAV_BUTTON_LABEL,
        });

        expect(button.getAttribute('disabled')).not.toBeUndefined();
        expect(button.getAttribute('disabled')).not.toBeNull();
    });

    it('should set next page nav button to disabled when it is last page', () => {
        const { getByRole } = render(
            <ContextsProvidersMock>
                <PaginationNav
                    page={2}
                    pagesIndexes={[1, 2]}
                    changePage={() => {}}
                />
            </ContextsProvidersMock>,
        );

        const button = getByRole('button', {
            name: NEXT_PAGE_NAV_BUTTON_LABEL,
        });

        expect(button.getAttribute('disabled')).not.toBeUndefined();
        expect(button.getAttribute('disabled')).not.toBeNull();
    });

    it('should call changePage function passed as prop', () => {
        const changePage = jest.fn();
        const { getByRole, getAllByRole } = render(
            <ContextsProvidersMock>
                <PaginationNav
                    page={2}
                    pagesIndexes={[1, 2, 3]}
                    changePage={changePage}
                />
            </ContextsProvidersMock>,
        );

        const prevPageNavButton = getByRole('button', {
            name: PREV_PAGE_NAV_BUTTON_LABEL,
        });
        const nextPageNavButton = getByRole('button', {
            name: NEXT_PAGE_NAV_BUTTON_LABEL,
        });
        const changePageNavButton = getAllByRole('button').find(
            (element) =>
                element.ariaLabel !== PREV_PAGE_NAV_BUTTON_LABEL &&
                element.ariaLabel !== NEXT_PAGE_NAV_BUTTON_LABEL,
        );
        fireEvent.click(prevPageNavButton);
        fireEvent.click(nextPageNavButton);
        if (changePageNavButton) fireEvent.click(changePageNavButton);

        expect(changePage).toHaveBeenCalledTimes(3);
    });
});
