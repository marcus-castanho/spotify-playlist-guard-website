import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { handlePageReqErrorResponse } from '../errors/serverErrorHandlers';
import { InternalServerError } from '@/views/InternalServerError';

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

export default function Custom500() {
    return <InternalServerError />;
}
