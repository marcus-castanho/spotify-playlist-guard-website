import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { CookieKey } from '../@types';
import { getAuth } from '../services/api';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { code } = context.query;
    const tokenCookieKey: CookieKey = 's-p-guard:token';

    if (!code || Array.isArray(code)) return { props: {} };

    const { token } = await getAuth(code).catch(() => ({
        token: null,
    }));

    if (!token) return { props: {} };

    setCookie(context, tokenCookieKey, token, {
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
