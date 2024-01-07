import React from 'react';
import Link from 'next/link';
import { PageContainer } from '@/components/PageContainer';
import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { Footer } from '@/components/Footer';

export const Index = () => {
    return (
        <PageContainer>
            <Header />
            <Main>
                <div className="flex w-full items-center justify-center">
                    <Link href="/signin">Sign in</Link>
                </div>
            </Main>
            <Footer />
        </PageContainer>
    );
};
