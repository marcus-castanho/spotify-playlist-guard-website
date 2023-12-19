import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Main } from '@/components/Main';
import { ServerWarningIcon } from '@/components/icons/ServerWarningIcon';
import { Anchor } from '@/components/Anchor';
import { useTheme } from '@/contexts/ThemeContext';

export const InternalServerError = () => {
    const { theme } = useTheme();

    return (
        <PageContainer>
            <Main>
                <div className="flex w-full items-center justify-center">
                    <div className="flex flex-col items-center">
                        <ServerWarningIcon
                            size={60}
                            fillColor={theme === 'dark' ? 'white' : 'black'}
                        />
                        <h1 className="flex justify-center px-6 pb-4 pt-10 text-center text-5xl font-bold sm:text-left">
                            500 - Internal server error
                        </h1>
                        <p className="px-6 pb-10 text-gray-100">
                            Sorry, something went wrong
                        </p>
                        <Anchor
                            text="Go Home"
                            href="/"
                            target="_self"
                            label="home-link"
                        />
                    </div>
                </div>
            </Main>
        </PageContainer>
    );
};
