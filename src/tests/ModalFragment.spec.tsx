import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ModalFragment } from '@/components/ModalFragment';
import { expectToThrowWithSilentLogs } from './utils/expectToThrowWithSilentLogs';
import { ContextsProvidersMock } from './mocks/ContextsProvidersMock';
import { ComponentMock, TEST_COMPONENT_ID } from './mocks/ComponentMock';

const MODAL_LABEL = 'modal-dialog';

describe('ModalFragment', () => {
    it('should throw error when ThemeContext is not provided', () => {
        const renderFn = () =>
            render(
                <ModalFragment
                    display={true}
                    closeModal={() => {}}
                    content={<></>}
                />,
            );

        expectToThrowWithSilentLogs(renderFn);
    });

    it('should render', () => {
        const { getByLabelText } = render(
            <ContextsProvidersMock>
                <ModalFragment
                    display={true}
                    closeModal={() => {}}
                    content={<></>}
                />
            </ContextsProvidersMock>,
        );

        const dialog = getByLabelText(MODAL_LABEL);

        expect(dialog).toBeDefined();
    });

    it('should not render when pass display prop as false', () => {
        const { queryByLabelText } = render(
            <ContextsProvidersMock>
                <ModalFragment
                    display={false}
                    closeModal={() => {}}
                    content={<></>}
                />
            </ContextsProvidersMock>,
        );

        const dialog = queryByLabelText(MODAL_LABEL);

        expect(dialog).toBeNull();
    });

    it('should render content as passed in props', () => {
        const { getByTestId } = render(
            <ContextsProvidersMock>
                <ModalFragment
                    display={true}
                    closeModal={() => {}}
                    content={<ComponentMock />}
                />
            </ContextsProvidersMock>,
        );

        const component = getByTestId(TEST_COMPONENT_ID);

        expect(component).toBeDefined();
    });

    it('should call closeModal function passed as props', () => {
        const MODAL_BUTTON_LABEL = 'close-modal-button';
        const closeModal = jest.fn();
        const { getByRole } = render(
            <ContextsProvidersMock>
                <ModalFragment
                    display={true}
                    closeModal={closeModal}
                    content={<></>}
                />
            </ContextsProvidersMock>,
        );

        const button = getByRole('button', { name: MODAL_BUTTON_LABEL });
        fireEvent.click(button);

        expect(closeModal).toHaveBeenCalled();
    });
});
