import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export const Profile = () => {
    const { signOut, user } = useAuth();

    return (
        <>
            <div>
                <Link href="/home">Home</Link>
                <button onClick={() => signOut()}>Log Out</button>
            </div>
            {user &&
                Object.keys(user).map((key) => {
                    return (
                        <div key={key}>{`${key}: ${
                            user[key as keyof typeof user]
                        }`}</div>
                    );
                })}
        </>
    );
};
