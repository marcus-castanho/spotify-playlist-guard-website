import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Main } from '@/components/Main';
import { ServerWarningIcon } from '@/components/icons/ServerWarningIcon';
import { getCookie } from '@/storage/cookies/client';
import { THEME_COOKIE_KEY } from '@/contexts/ThemeContext';
import { ButtonSecondary } from './ButtonSecondary';
import { usePathname, useRouter } from 'next/navigation';

export const ErrorFallback = () => {
    const pathname = usePathname();
    const router = useRouter();
    const themeCookie = getCookie(THEME_COOKIE_KEY);
    const theme = themeCookie === 'dark' ? 'dark' : 'light';

    return (
        <PageContainer>
            <Main>
                <div className="flex w-full items-center justify-center">
                    <div className="flex flex-col items-center">
                        <ServerWarningIcon
                            size={60}
                            fillColor={theme === 'dark' ? 'white' : 'black'}
                        />
                        <h1 className="flex justify-center px-6 py-10 text-center text-3xl font-bold sm:text-left">
                            Sorry, something went wrong
                        </h1>
                        <div className="pb-10">
                            <ButtonSecondary
                                scale={false}
                                onClick={() => {
                                    if (pathname === '/') router.refresh();
                                    router.replace('/');
                                }}
                            >
                                Go home
                            </ButtonSecondary>
                        </div>
                    </div>
                </div>
            </Main>
        </PageContainer>
    );
};
