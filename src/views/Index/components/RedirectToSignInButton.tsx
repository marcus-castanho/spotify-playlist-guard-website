import React from 'react';
import { useRouter } from 'next/navigation';
import { ButtonPrimary } from '@/components/ButtonPrimary';

export const RedirectToSignInButton = () => {
    const router = useRouter();

    return (
        <ButtonPrimary onClick={() => router.push('/signin')}>
            <p className="text-white">Start guarding your playlists</p>
        </ButtonPrimary>
    );
};
