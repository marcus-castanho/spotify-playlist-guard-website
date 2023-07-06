import React, { useEffect } from 'react';
import {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from 'next';
import { useRouter } from 'next/router';

export type GetServerSidePropsReturn = {
    apiUrl: string;
};

export const getServerSideProps: GetServerSideProps<
    GetServerSidePropsReturn
> = async (context) => {
    const apiUrl = process.env.API_URL || '';
    const { code } = context.query;

    if (!code) return { props: { apiUrl } };

    const response = await fetch(`${apiUrl}/auth/redirect?code=${code}`);

    if (response.status !== 201) return { props: { apiUrl } };

    const userInfo = await response.json().catch(() => ({}));
    const token = response.headers.get('authorization')?.split(' ')[1];

    if (!token) return { props: { apiUrl } };

    return {
        redirect: {
            destination: '/home',
            permanent: false,
        },
    };
};

export type SignInProps = InferGetServerSidePropsType<
    typeof getServerSideProps
>;

const SignIn: NextPage<SignInProps> = ({ apiUrl }) => {
    const router = useRouter();
    const { code } = router.query;

    useEffect(() => {
        if (router.isReady && code) {
            router.replace(router.route);
        }
    }, [router, code]);

    return (
        <div>
            <button onClick={() => router.push(`${apiUrl}/auth/login`)}>
                Sign in with Spotify
            </button>
        </div>
    );
};

export default SignIn;
