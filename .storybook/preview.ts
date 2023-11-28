import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';
import '../src/stories/styles/globals.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            default: 'light',
            values: [
                {
                    name: 'light',
                    value: 'white',
                },
                {
                    name: 'dark',
                    value: 'black',
                },
            ],
        },
        nextjs: {
            appDirectory: true,
        },
    },
};

export default preview;
