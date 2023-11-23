import React from 'react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { handlePageReqErrorResponse } from '../errors/serverErrorHandlers';
import { Index as IndexPage } from '@/views/Index';

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
    return <IndexPage />;
};

export default Index;
