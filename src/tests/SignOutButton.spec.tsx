import React from 'react';
import { render } from '@testing-library/react';
import { SignOutButton } from '@/components/SignOutButton';
import { ContextsProvidersMock } from './mocks/ContextsProvidersMock';
import { expectToThrowWithSilentLogs } from './utils/expectToThrowWithSilentLogs';

describe('SignOutButton', () => {
    it('should throw error when AuthContext is not provided', () => {
        const renderFn = () => render(<SignOutButton />);

        expectToThrowWithSilentLogs(renderFn);
    });

    it('should render', () => {
        const { getByRole } = render(
            <ContextsProvidersMock>
                <SignOutButton />
            </ContextsProvidersMock>,
        );

        const button = getByRole('button', { name: 'sign-out-button' });

        expect(button).toBeDefined();
    });
});
