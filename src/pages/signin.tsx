import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { authenticate } from '../useCases/auth';
import Link from 'next/link';
import { log } from '../logger';

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const { code } = context.query;

        if (typeof code !== 'string') return { props: {} };

        await authenticate(code, context);

        return {
            redirect: {
                destination: '/home',
                permanent: false,
            },
        };
    } catch (error: any) {
        log({
            message: 'Uncaught error',
            payload: error?.message,
        });
        return { props: { authError: 'Something went wrong.' } };
    }
};

export type SignInProps = {
    authError?: string;
};

const SignIn: NextPage<SignInProps> = ({ authError }) => {
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

export default SignIn;
