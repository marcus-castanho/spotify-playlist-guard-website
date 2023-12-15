import React from 'react';
import { render } from '@testing-library/react';
import { PageContainer } from '@/components/PageContainer';
import { ComponentMock, TEST_COMPONENT_ID } from './mocks/ComponentMock';

const PAGE_CONTAINER_LABEL = 'page-container';

describe('PageContainer', () => {
    it('should render', () => {
        const { getByLabelText } = render(
            <PageContainer>
                <></>
            </PageContainer>,
        );

        const container = getByLabelText(PAGE_CONTAINER_LABEL);

        expect(container).toBeDefined();
    });

    it('should render children', () => {
        const { getByTestId } = render(
            <PageContainer>
                <ComponentMock />
            </PageContainer>,
        );

        const component = getByTestId(TEST_COMPONENT_ID);

        expect(component).toBeDefined();
    });
});
