import React from 'react';
import { UserProfile } from './components/UserProfile';
import { Header } from '@/components/Header';
import { PageContainer } from '@/components/PageContainer';
import { Footer } from '@/components/Footer';
import { Main } from '@/components/Main';

export const Profile = () => {
    return (
        <PageContainer>
            <Header />
            <Main>
                <div className="flex w-full items-center justify-center">
                    <UserProfile />
                </div>
            </Main>
            <Footer />
        </PageContainer>
    );
};
