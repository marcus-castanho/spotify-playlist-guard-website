import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/components/Header';
import { useStoryBackgroundUpdate } from '@/stories/utils/hooks';
import { AppContextProvider } from '@/contexts';

const meta = {
    title: 'Components/Header',
    component: Header,
    tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    /**For this specific story, use AppContextProvider without a defaultUser value so that the app is not in an authenticated session*/
    decorators: [
        (Story, context) => {
            const { backgrounds } = context.globals;
            const backgroundTheme =
                backgrounds?.value === 'black' ? 'dark' : 'light';
            useStoryBackgroundUpdate(backgroundTheme);

            return (
                <AppContextProvider initialTheme={backgroundTheme}>
                    <Story />
                </AppContextProvider>
            );
        },
    ],
};

export const Authenticated = () => <Header />;
