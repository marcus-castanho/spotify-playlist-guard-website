import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PageContainer } from '@/components/PageContainer';
import { Header } from '@/components/Header';

export const Profile = () => {
    const { user } = useAuth();

    return (
        <PageContainer>
            <Header />
            {user &&
                Object.keys(user).map((key) => {
                    return (
                        <div key={key}>{`${key}: ${
                            user[key as keyof typeof user]
                        }`}</div>
                    );
                })}
        </PageContainer>
    );
};
