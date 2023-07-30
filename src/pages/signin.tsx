import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { authenticate } from '../useCases/auth';

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
    } catch (error) {
        console.log(error);
        return { props: {} };
    }
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
