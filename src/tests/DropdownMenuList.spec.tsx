import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DropdownMenuList } from '@/components/DropdownMenuList';
import { ContextsProvidersMock } from './mocks/ContextsProvidersMock';
import { expectToThrowWithSilentLogs } from './utils/expectToThrowWithSilentLogs';

const LIST_ITEMS_GROUPS = [['Item1'], ['Item2']];

const ARIA_LABEL = 'dropdown-menu-list';

const BUTTON_ARIA_LABEL = 'dropdown-menu-list-button';

describe('DropdownMenuList', () => {
    it('should throw error when ThemeContext is not provided', () => {
        const renderFn = () =>
            render(
                <DropdownMenuList
                    itemsGroups={LIST_ITEMS_GROUPS}
                    onClose={() => {}}
                />,
            );

        expectToThrowWithSilentLogs(renderFn);
    });

    it('should render', () => {
        const { getByRole } = render(
            <ContextsProvidersMock>
                <DropdownMenuList
                    itemsGroups={LIST_ITEMS_GROUPS}
                    onClose={() => {}}
                />
            </ContextsProvidersMock>,
        );

        const list = getByRole('list', { name: ARIA_LABEL });

        expect(list).toBeDefined();
    });

    it('should render list items provided as props', () => {
        const { getAllByRole, getByText } = render(
            <ContextsProvidersMock>
                <DropdownMenuList
                    itemsGroups={LIST_ITEMS_GROUPS}
                    onClose={() => {}}
                />
            </ContextsProvidersMock>,
        );

        const listItems = getAllByRole('listitem');
        const listItemsTexts = LIST_ITEMS_GROUPS.flat().map(
            (item) => getByText(item).innerHTML,
        );

        expect(listItems.length).toBe(LIST_ITEMS_GROUPS.flat().length);
        expect(listItemsTexts[0]).toBe(LIST_ITEMS_GROUPS.flat()[0]);
        expect(listItemsTexts[1]).toBe(LIST_ITEMS_GROUPS.flat()[1]);
    });

    it('should render header provided as prop', () => {
        const HEADER = 'Header';
        const { getByText } = render(
            <ContextsProvidersMock>
                <DropdownMenuList
                    itemsGroups={LIST_ITEMS_GROUPS}
                    onClose={() => {}}
                    header={HEADER}
                />
            </ContextsProvidersMock>,
        );

        const component = getByText(HEADER);

        expect(component).toBeDefined();
    });

    it('should call onClose passed as prop', async () => {
        const onClose = jest.fn();
        const { getByRole } = render(
            <ContextsProvidersMock>
                <DropdownMenuList
                    itemsGroups={LIST_ITEMS_GROUPS}
                    onClose={() => onClose()}
                />
            </ContextsProvidersMock>,
        );

        const button = getByRole('button', { name: BUTTON_ARIA_LABEL });
        fireEvent.click(button);

        expect(onClose).toHaveBeenCalled();
    });
});
