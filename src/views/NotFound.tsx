import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Main } from '@/components/Main';
import { Anchor } from '@/components/Anchor';
import { GuardBotLogo } from '@/components/GuardBotLogo';

export const NotFound = () => {
    return (
        <PageContainer>
            <Main>
                <div className="flex w-full items-center justify-center">
                    <div className="flex flex-col items-center">
                        <GuardBotLogo size={60} />
                        <h1 className="px-6 pb-4 pt-10 text-center text-5xl font-bold sm:text-left">
                            Page not found
                        </h1>
                        <p className="px-6 pb-10 text-center text-gray-100 sm:text-left">
                            The resource you are looking for could not be found
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
