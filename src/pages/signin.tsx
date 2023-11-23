import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { authenticate } from '../useCases/authenticate';
import { log } from '../logger';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SignIn as SignInPage } from '@/views/SignIn';

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
