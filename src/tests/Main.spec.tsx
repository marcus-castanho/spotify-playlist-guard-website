import React from 'react';
import { render } from '@testing-library/react';
import { Main } from '@/components/Main';

describe('Main', () => {
    it('should render', () => {
        const { getByRole } = render(
            <Main>
                <></>
            </Main>,
        );

        const main = getByRole('main');

        expect(main).toBeDefined();
    });
});
