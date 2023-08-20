import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { handleMiddlewareErrorResponse } from '../errors/handleServerErrors';

export async function getStaticProps({ locale }) {
    try {
        return {
            props: {
                ...(await serverSideTranslations(locale)),
            },
        };
    } catch (error) {
        return handleMiddlewareErrorResponse(error);
    }
}

export default function Custom500() {
    return <h1>500 - Server-side error occurred</h1>;
}
