import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { handlePageReqErrorResponse } from '../errors/serverErrorHandlers';

export async function getStaticProps({ locale }) {
    try {
        return {
            props: {
                ...(await serverSideTranslations(locale)),
            },
        };
    } catch (error) {
        return handlePageReqErrorResponse(error);
    }
}

const Index: NextPage = () => {
    return (
        <>
            <Link href="/signin">Sign in</Link>
        </>
    );
};

export default Index;
