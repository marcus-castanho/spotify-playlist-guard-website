import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const SignOutButton = () => {
    const { signOut } = useAuth();

    return (
        <button
            aria-label="sign-out-button"
            onClick={() => signOut()}
            className="flex w-full items-start"
        >
            Sign Out
        </button>
    );
};
