import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/PageContainer';
import { Header } from '@/components/Header';
import { SessionEndWrapper } from './components/SessionEndWrapper';

type SignInProps = {
    authError?: string;
};

export const SignIn: FC<SignInProps> = ({ authError }) => {
    const router = useRouter();

    return (
        <SessionEndWrapper>
            <PageContainer>
                <Header />
                <button
                    onClick={() =>
                        router.push(
                            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                        )
                    }
                >
                    Sign in with Spotify
                </button>
                {authError && <p>{authError}</p>}
            </PageContainer>
        </SessionEndWrapper>
    );
};
