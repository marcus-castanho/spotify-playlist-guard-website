import React from 'react';
import { Decorator } from '@storybook/react';
import { AppContextProvider } from '@/contexts';
import { useStoryBackgroundUpdate } from './hooks';

export const useWithContexts: Decorator = (Story, context) => {
    const { backgrounds } = context.globals;
    const backgroundTheme = backgrounds?.value === 'black' ? 'dark' : 'light';
    const defaultAuthenticatedUser = {
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
    useStoryBackgroundUpdate(backgroundTheme);

    return (
        <AppContextProvider
            initialTheme={backgroundTheme}
            defaultUser={defaultAuthenticatedUser}
        >
            <Story />
        </AppContextProvider>
    );
};
