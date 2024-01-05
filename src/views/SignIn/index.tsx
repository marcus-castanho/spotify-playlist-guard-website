import React, { FC, useEffect } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Header } from '@/components/Header';
import { SessionEndWrapper } from './components/SessionEndWrapper';
import { useToast } from '@/contexts/ToastContext';
import { SignInOptionsContainer } from './components/SignInOptionsContainer';
import { Main } from '@/components/Main';
import { Footer } from '@/components/Footer';

type SignInProps = {
    authError?: string;
};

export const SignIn: FC<SignInProps> = ({ authError }) => {
    const { toast } = useToast();

    useEffect(() => {
        if (authError) toast('Error while performing this operation', 'error');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SessionEndWrapper>
            <PageContainer>
                <Header />
                <Main>
                    <div className="flex w-full items-center justify-center">
                        <SignInOptionsContainer />
                    </div>
                </Main>
                <Footer />
            </PageContainer>
        </SessionEndWrapper>
    );
};
