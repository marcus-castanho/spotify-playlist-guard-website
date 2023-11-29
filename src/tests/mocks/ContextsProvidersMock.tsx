import React, { ComponentProps, ReactNode } from 'react';
import { AppContextProvider } from '@/contexts';
import './windowMock';

export const INITIAL_THEME: ComponentProps<
    typeof AppContextProvider
>['initialTheme'] = 'light';

export const DEFAULT_USER: NonNullable<
    ComponentProps<typeof AppContextProvider>['defaultUser']
> = {
    id: '00000000-0000-0000-0000-000000000000',
    spotify_id: '0000000000000000000000000000',
    country: 'BR',
    display_name: 'Test user',
    email: 'test@test.com',
    external_url: 'external_url',
    followers: 1,
    href: 'href',
    images: ['image1'],
    product: 'product',
    type: 'type',
    uri: 'url',
    createdAt: '2023-08-13T02:31:45.610Z',
    updatedAt: '2023-10-11T01:18:06.082Z',
};

type ContextsProvidersMockProps = {
    children: ReactNode;
    initialTheme?: ComponentProps<typeof AppContextProvider>['initialTheme'];
    defaultUser?: ComponentProps<typeof AppContextProvider>['defaultUser'];
};
export function ContextsProvidersMock({
    children,
    initialTheme = INITIAL_THEME,
    defaultUser = DEFAULT_USER,
}: ContextsProvidersMockProps) {
    return (
        <AppContextProvider
            initialTheme={initialTheme}
            defaultUser={defaultUser}
        >
            {children}
        </AppContextProvider>
    );
}
