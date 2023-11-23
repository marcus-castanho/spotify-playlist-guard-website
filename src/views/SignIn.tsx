import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type SignInProps = {
    authError?: string;
};

export const SignIn: FC<SignInProps> = ({ authError }) => {
    const router = useRouter();
    const { code, sessionEnd } = router.query;

    useEffect(() => {
        if (router.isReady && (code || sessionEnd)) {
            router.replace(router.route);
        }
    }, [router, code, sessionEnd]);

    return (
        <>
            <Link href="/">Index</Link>
            <button
                onClick={() =>
                    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`)
                }
            >
                Sign in with Spotify
            </button>
            {authError && <p>{authError}</p>}
            {sessionEnd && (
                <p>Youre session was expired. Please sign in to continue</p>
            )}
        </>
    );
};
