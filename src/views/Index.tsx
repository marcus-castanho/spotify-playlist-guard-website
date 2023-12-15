import React from 'react';
import Link from 'next/link';
import { PageContainer } from '@/components/PageContainer';
import { Header } from '@/components/Header';

export const Index = () => {
    return (
        <PageContainer>
            <Header />
            <Link href="/signin">Sign in</Link>
        </PageContainer>
    );
};
