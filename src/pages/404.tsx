import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { handleServerErrorResponse } from '../errors/handleServerErrorResponse';

export async function getStaticProps({ locale }) {
    try {
        return {
            props: {
                ...(await serverSideTranslations(locale)),
            },
        };
    } catch (error) {
        return handleServerErrorResponse(error);
    }
}

export default function Custom404() {
    return <h1>404 - Page Not Found</h1>;
}
