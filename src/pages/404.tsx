import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { handlePageReqErrorResponse } from '../errors/serverErrorHandlers';
import { NotFound } from '@/views/NotFound';

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

export default function Custom404() {
    return <NotFound />;
}
