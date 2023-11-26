import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { log } from '../logger';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SignIn as SignInPage } from '@/views/SignIn';
import { getAuth } from '@/services/spotifyPlaylistGuardApi';
import { InternalServerError } from '@/errors';
import { setPageResCookies } from '@/storage/cookies/server';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';

async function authenticate(code: string, context: GetServerSidePropsContext) {
    const token = await getAuth(code).then(({ success, data }) => {
        if (!success) throw new InternalServerError({});
        return data;
    });

    setPageResCookies(context, TOKEN_COOKIE_KEY, token, {
        maxAge: 60 * 60 * 1,
    });
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const locale = context.locale || '';
    try {
        const { code } = context.query;

        if (typeof code !== 'string')
            return { props: { ...(await serverSideTranslations(locale)) } };

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
        return {
            props: {
                authError: 'Something went wrong.',
                ...(await serverSideTranslations(locale)),
            },
        };
    }
};

type SignInProps = {
    authError?: string;
};

const SignIn: NextPage<SignInProps> = ({ authError }) => {
    return <SignInPage authError={authError} />;
};

export default SignIn;
