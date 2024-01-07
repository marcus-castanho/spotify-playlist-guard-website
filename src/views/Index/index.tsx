import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { Footer } from '@/components/Footer';
import { Hero } from './components/Hero';

export const Index = () => {
    return (
        <PageContainer>
            <Header />
            <Main>
                <div className="w-full p-6">
                    <Hero />
                    <Footer />
                </div>
            </Main>
        </PageContainer>
    );
};
