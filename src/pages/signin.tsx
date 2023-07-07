import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { CookieKey } from '../@types';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const { code } = context.query;

    if (!code) return { props: {} };

    const response = await fetch(`${apiUrl}/auth/redirect?code=${code}`);

    if (response.status !== 201) return { props: {} };

    const token = response.headers.get('authorization')?.split(' ')[1];

    if (!token) return { props: {} };

    const cookieKey: CookieKey = 's-p-guard:token';

    setCookie(context, cookieKey, token, {
        maxAge: 60 * 60 * 1,
    });

    return {
        redirect: {
            destination: '/home',
            permanent: false,
        },
    };
};

const SignIn: NextPage = () => {
    const router = useRouter();
    const { code } = router.query;

    useEffect(() => {
        if (router.isReady && code) {
            router.replace(router.route);
        }
    }, [router, code]);

    return (
        <div>
            <button
                onClick={() =>
                    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`)
                }
            >
                Sign in with Spotify
            </button>
        </div>
    );
};

export default SignIn;
